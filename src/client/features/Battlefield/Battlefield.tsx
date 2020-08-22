import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import firebaseApp from "../../../config/firebase/Firebase";

import { getMapOptions } from "../../../config/googleMaps/mapOptions";
import { deathMapOptions } from "../../../config/googleMaps/deathMapOptions"

import { Player as PlayerType } from "../types";
import { getCenter } from "geolib";
import { getCircle, animate } from "../../../entities/Zone";
import { retrieveAllPlayers } from "../../../infra/persistence/read";
import { isPlayerOutside2 } from "../../../controllers/isPlayerOutside";
import ThemeContext from "../../themeContext";
import { Position } from '../types'
import { hashHistory } from 'react-router'
import { Timer } from '../../../services/timer'

declare var google: any;

interface BattlefieldProps {
  coords: Position;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
}

interface BattlefieldState {
  centerPosition: Position
  selfPosition: {
    latitude: number,
    longitude: number,
  }
  isOutside: boolean,
  gameData: {
    currentRadius: number,
    currentTime: number
  }
  currentTimeOutsideOfZone: number
  alive: boolean
}

class Battlefield extends Component<BattlefieldProps, BattlefieldState> {
  static contextType = ThemeContext

  constructor(props, context) {
    super(props, context);

    this.state = {
      //centerPosition: { latitude: 45.5139807, longitude: 0.3240039 }, //{ latitude: 45.51324901, longitude: 0.32382846 }, //hardcoded initial position
      //centre de la forêt: 
      centerPosition: { latitude: 45.5125502, longitude: 0.3241445 },
      selfPosition: { latitude: 0, longitude: 0 },
      isOutside: false,
      gameData: {
        currentRadius: 300,
        currentTime: 0
      },
      currentTimeOutsideOfZone : 0,
      alive: true
    };

    this.handleCenterPosition = this.handleCenterPosition.bind(this);
    this.handleIsPlayerIsOutside = this.handleIsPlayerIsOutside.bind(this);
    this.narrowZone = this.narrowZone.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.handlePlayerisOutside = this.handlePlayerisOutside.bind(this)
    this.killPlayerOutsideForTooLong = this.killPlayerOutsideForTooLong.bind(this)
  }

  async handleCenterPosition() {
    const players = await retrieveAllPlayers(firebaseApp);
    if (players.length <= 0) throw new Error()

    const latlng = Object.values(players).map(player => player.position);
    const centerPosition = getCenter(latlng);

    if (centerPosition === false) {
      console.error("Center position is false")
    } else {
      this.setState({ centerPosition: centerPosition });
    }
  }

  handleIsPlayerIsOutside(): void {
    if (isPlayerOutside2({ latitude: 45.5125502, longitude: 0.3241445 }, this.state.selfPosition, Timer.getInstance().read())) {
      this.setState({isOutside: true})
    } else {
      this.setState({isOutside: false})
    }
  }

  handlePlayerisOutside() {
    function beep() {
      var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
      snd.play();
    }

    if (this.state.isOutside && this.state.alive) {
      window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);

      // 0 > currentTimeOutsideOfZone > 60
      if (this.state.currentTimeOutsideOfZone > 0 && this.state.currentTimeOutsideOfZone <= 3) {
        beep();
      }

      if (this.state.currentTimeOutsideOfZone > 3 && this.state.currentTimeOutsideOfZone <= 7) {        
        beep()
        setTimeout(() => {
          beep()
        }, 1000);
        setTimeout(() => {
          beep()
        }, 2000);
        setTimeout(() => {
          beep()
        }, 3000);
        setTimeout(() => {
          beep()
        }, 4000);
      }

      if (this.state.currentTimeOutsideOfZone > 7) {
        beep()
        setTimeout(() => {
          beep()
        }, 500);
        setTimeout(() => {
          beep()
        }, 1000);
        setTimeout(() => {
          beep()
        }, 1500);
        setTimeout(() => {
          beep()
        }, 2000);
        setTimeout(() => {
          beep()
        }, 2500);
        setTimeout(() => {
          beep()
        }, 3000);
        setTimeout(() => {
          beep()
        }, 3500);
        setTimeout(() => {
          beep()
        }, 4000);
        setTimeout(() => {
          beep()
        }, 4500);
      }
      this.setState({currentTimeOutsideOfZone: this.state.currentTimeOutsideOfZone + 1})
    } else {
      this.setState({currentTimeOutsideOfZone: 0})
    }
  }

  private killPlayerOutsideForTooLong() {
    if (this.state.alive) {
      if (this.state.currentTimeOutsideOfZone > 12) { //multiply 5 seconds
        
        const deathSound = new Audio('/death.mp3')
        deathSound.play()
        
        this.context.onHandleDeath()
        this.setState({alive: false})
        console.log(this.state.alive)
      }
    }
  }

  private startZone(map: any) {
    var rad = 300//this.state.radius;
    var sop = 1;
    var sw = 1;
    var fillop = 0.6;
    var marker = this.createZone(map);
    let startTime = +new Date();
    for (var i = 0; i < 1000; i++) {
      ({ rad, fillop, sw, sop } = this.narrowZone(
        map,
        rad,
        fillop,
        sw,
        sop,
        startTime,
        i
      ));
    }
  }

  private createZone(map: any) {
    return new google.maps.Marker({
      map: map,
      position: //{ lat: 45.5139807, lng: 0.3240039},
      { lat: 45.5125502, lng: 0.3241445 },
      icon: getCircle(),
      draggable: false,
    });
  }

  private narrowZone(
    map: any,
    rad: any,
    fillop: number,
    sw: number,
    sop: number,
    startTime: number,
    i: number
  ) {
    setTimeout(() => {
      animate(map, { lat: 45.5125502, lng: 0.3241445 }, Timer.getInstance().read(), 0.6, 1, 1);
      //animate(map, { lat: 45.5139807, lng: 0.3240039 }, Timer.getInstance().read(), 0.6, 1, 1);
      let elapsed = +new Date() - startTime;
      elapsed /= 1000;
      var seconds = Math.round(elapsed);
      this.gameLoop(seconds);
    }, i * 5000);
    return { rad, fillop, sw, sop };
  }

  private gameLoop(seconds: number) {
    this.handleCenterPosition();
    this.setState({gameData: { currentRadius: Timer.getInstance().read(), currentTime: seconds}});
    if (this.state.alive) {
      this.handleIsPlayerIsOutside();
      this.handlePlayerisOutside();
      this.killPlayerOutsideForTooLong();
    }
  }

  componentDidMount() {
    firebaseApp.database().ref('game/isLive')
      .on('value', function (snapshot) {
        const isLive = snapshot?.val()
        if (!isLive) {
          hashHistory.push('/finalScore')
        }
      });

    firebaseApp.database().ref('players')
      .on('value', function (snapshot) {
        //@ts-ignore
        const playerLength = Object.values(snapshot?.val()).filter((player: PlayerType) => !player.isDead).length
        if (playerLength === 1) {
          firebaseApp.database().ref('game').update({ isLive: false })
        }
      });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <>
            {/* <p style={{"color": "white"}}>En dehors: {this.state.isOutside ? "Oui" : "Non"}</p>
            <p style={{"color": "white"}}>Rayon: {this.state.gameData.currentRadius}, Temps dehors: {this.state.currentTimeOutsideOfZone * 5} </p>
            <p style={{ "color": "white" }}>Secondes: {this.state.gameData.currentTime}</p>
            <p style={{ "color": "white" }}>{this.state.selfPosition.latitude}</p>
            <p style={{ "color": "white" }}>{this.state.selfPosition.longitude}</p> */}
            {!this.props.isGeolocationAvailable ? (
              <div style={{ color: "white" }}>Erreur: Le navigateur ne supporte pas la géolocalisation!</div>
            ) : !this.props.isGeolocationEnabled ? (
              <div style={{ color: "white" }}>Erreur: La géolocalisation doit être autorisée!</div>
            ) : this.props.coords ? (
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  options={value.self.isDead ? deathMapOptions : getMapOptions}
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
                  }}
                  center={
                    //{ lat: 45.5139807, lng: 0.3240039

                    { lat: 45.5125502, lng: 0.3241445
                  }}
                  defaultZoom={17}
                  onGoogleApiLoaded={({ map, maps }) => {
                    this.startZone(map);

                    var watchID;
                    var geoLoc;

                    const showLocation = (position) => {
                      if (!position) return
                      var latitude = position.coords.latitude;
                      var longitude = position.coords.longitude;
                      
                      var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        draggable: false,
                      });

                      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))

                      setTimeout(() => {
                        marker.setMap(null);
                      }, 10000);

                      this.setState({
                        selfPosition: {
                          latitude: latitude,
                          longitude: longitude
                        }
                      })
                    }

                    function errorHandler(err) {
                      if (err.code == 1) {
                        alert("Error: Access is denied!");
                      } else if (err.code == 2) {
                        alert("Error: Position is unavailable!");
                      }
                    }

                    function getLocationUpdate() {

                      if (navigator.geolocation) {

                        // timeout at 60000 milliseconds (60 seconds)
                        var options = { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 };
                        geoLoc = navigator.geolocation;
                        //watchID = geoLoc.getCurrentPosition(showLocation, errorHandler, options);
                        //@ts-ignore
                        navigator.geolocation.getAccurateCurrentPosition(showLocation, errorHandler, () => {}, {desiredAccuracy:5, maxWait:15000})
                      } else {
                        alert("Sorry, browser does not support geolocation!");
                      }
                    }

                    setInterval(getLocationUpdate, 5000)
                  }}
                >

                </GoogleMapReact>

                {!value.self.isDead && setTimeout(() => {
                  value.onHandleSubmitPlayerPosition(this.state.selfPosition)
                }, 5000)}

              </div>
            ) : (<div style={{ color: "white" }}>En attente des données de géolocalisation</div>)
            }
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Battlefield;

//@ts-ignore
navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
  var lastCheckedPosition,
      locationEventCount = 0,
      watchID,
      timerID;

  options = options || {};

  var checkLocation = function (position) {
      lastCheckedPosition = position;
      locationEventCount = locationEventCount + 1;
      // We ignore the first event unless it's the only one received because some devices seem to send a cached
      // location even when maxaimumAge is set to zero
      if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
          clearTimeout(timerID);
          navigator.geolocation.clearWatch(watchID);
          foundPosition(position);
      } else {
          geoprogress(position);
      }
  };

  var stopTrying = function () {
      navigator.geolocation.clearWatch(watchID);
      foundPosition(lastCheckedPosition);
  };

  var onError = function (error) {
      clearTimeout(timerID);
      navigator.geolocation.clearWatch(watchID);
      geolocationError(error);
  };

  var foundPosition = function (position) {
      geolocationSuccess(position);
  };

  if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
  if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
  if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

  options.maximumAge = 0; // Force current locations only
  options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

  watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
  timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
};