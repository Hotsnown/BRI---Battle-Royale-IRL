import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import firebaseApp from "../../../config/firebase/Firebase";

import { getMapOptions } from "../../../config/googleMaps/mapOptions";
import { deathMapOptions } from "../../../config/googleMaps/deathMapOptions"

import { Player } from "./Player";
import { Player as PlayerType } from "../types";
import { getCenter } from "geolib";
import { getCircle, animate } from "../../../entities/Zone";
import {retrieveAllPlayers } from "../../../infra/persistence/read";
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
}

class Battlefield extends Component<BattlefieldProps, BattlefieldState> {
  static contextType = ThemeContext

  constructor(props, context) {
    super(props, context);
    

    this.state = {
      centerPosition: { latitude: 46.5666048, longitude: 0.48824319999999993 }, //hardcoded initial position
    };

    this.handleCenterPosition = this.handleCenterPosition.bind(this);
    this.handlePlayerIsOutside = this.handlePlayerIsOutside.bind(this);
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.narrowZone = this.narrowZone.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.handlePlayerIsOutside = this.handlePlayerIsOutside.bind(this)
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

  handlePlayerIsOutside(): void {
    if (isPlayerOutside2(this.state.centerPosition, this.props.coords, Timer.getInstance().read())) {
      //this.handlePlaySound()
      console.log("Run!!");
    } else {
      return;
    }
  }

  handlePlaySound() {
    var audio = new Audio("/radiation.mp3");
    audio.play();
  }


  private startZone(map: any) {
    var rad = 200//this.state.radius;
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
      position: {
        lat: 45.51324901, 
        lng: 0.32382846
      },
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
      animate(map, { lat: 45.51324901, lng: 0.32382846 }, Timer.getInstance().read(), 0.6, 1, 1);
      let elapsed = +new Date() - startTime;
      elapsed /= 1000;
      var seconds = Math.round(elapsed);
      this.gameLoop(seconds);
    }, i * 5000);
    return { rad, fillop, sw, sop };
  }

  private gameLoop(seconds: number) {
    this.handleCenterPosition();
    console.log("current radius : ", Timer.getInstance().read(), " seconds : ", seconds);
    this.handlePlayerIsOutside();
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
          firebaseApp.database().ref('game').update({isLive: false})
        }
    });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <>
            {!this.props.isGeolocationAvailable ? (
              <div>
                Erreur: Le navigateur ne supporte pas la géolocalisation!
              </div>
            ) : !this.props.isGeolocationEnabled ? (
              <div>Erreur: La géolocalisation doit être autorisée!</div>
            ) : this.props.coords ? (
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  options={value.self.isDead ? deathMapOptions : getMapOptions}
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
                  }}
                  center={{
                    lat: 45.51324901,
                    lng: 0.32382846,
                  }}
                  defaultZoom={17}
                  onGoogleApiLoaded={({ map, maps }) => {
                    this.startZone(map);
                  }}
                >
                  {value.self.isDead
                    ? Object.values(firebaseApp.database().ref("players").once("value")).map((player: PlayerType) => (
                      <Player
                        lat={player.position.latitude}
                        lng={player.position.longitude}
                      />
                    ))
                    :
                        <Player
                          lat={this.props.coords.latitude}
                          lng={this.props.coords.longitude}
                        />
                      }
                </GoogleMapReact>
                {
                  !value.self.isDead && setTimeout(() => {
                    value.onHandleSubmitPlayerPosition({
                      latitude: this.props.coords.latitude,
                      longitude: this.props.coords.longitude
                    })
                  }, 5000)
                  }
              </div>
            ) : (
                    <div>En attente des données de géolocalisation</div>
                  )}
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Battlefield;