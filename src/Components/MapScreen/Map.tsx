import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import firebaseApp from '../../firebase/Firebase';

import { getMapOptions } from './mapOptions'

import { Player } from './Player'

import Button from 'react-bootstrap/Button'
import { getCenter, getDistance } from 'geolib';
import { getCircle, animate } from '../../Services/Zone'

declare var google: any

class Map extends Component<any, any> {

  constructor(props) {
    super(props)
    var user = firebaseApp.auth().currentUser;
    this.state = { user: user, text: "", selfPosition: {}, centerPosition: {}, radius: {}, players: {}, currentRadius: this.handleRadius() }
    this.handlePlayerPositionSubmit = this.handlePlayerPositionSubmit.bind(this)
    this.handleCenterPosition = this.handleCenterPosition.bind(this)
    this.handlePlayerIsOutside = this.handlePlayerIsOutside.bind(this)
    this.handleRadius = this.handleRadius.bind(this)
    this.handlePlaySound = this.handlePlaySound.bind(this)
  }

  componentWillMount() {
    this.handleCenterPosition()
    var _this = this;
    var selfPosition = firebaseApp.database().ref('position/pierre');
    selfPosition.on('value', function (snapshot) {
      var obj = snapshot!.val();
      _this.setState({ selfPosition: obj });
    });

    var positions = firebaseApp.database().ref('position');
    positions.on('value', function (snapshot) {
      var obj = snapshot!.val();
      _this.setState({ players: obj });
      console.log(_this.state.players)
    });
  }

  handleRadius() {
    fetch('https://cors-anywhere.herokuapp.com/https://us-central1-pubg-irl-261413.cloudfunctions.net/Starttimer')
        .then(res => res.json())
        .then(res => this.setState({ currentRadius: res["data"] }))
        .catch(err => { this.setState({ currentRadius: 0 }); console.error(err) }) 
  }

  async handleCenterPosition() {
    function retrieveAllPositions() {
      const mDatabase = firebaseApp.database().ref()
      return mDatabase.child("position")
        .once('value')
        .then((snapshot) => {
          const snapshotValue = snapshot.val();
          return snapshotValue; // note that db will return null if no value found or node does not exist
        })
    }
    const positions: any = await retrieveAllPositions()
    const latlng: any = Object.values(positions)
    this.setState({ centerPosition: getCenter(latlng) })
  }

  handlePlayerPositionSubmit(e) {
    var _this = this;
    e.preventDefault();

    const mDatabase = firebaseApp.database().ref()
    mDatabase.child("position/pierre").set({
      latitude: _this.props.coords.latitude,
      longitude: _this.props.coords.longitude
    });
  }

  handlePlayerIsOutside() {
    const distanceFromCenterToPlayer = getDistance(
      { lat: this.props.coords.latitude, lng: this.props.coords.longitude },
      { lat: this.state.centerPosition.latitude, lng: this.state.centerPosition.longitude }
    )
    if (distanceFromCenterToPlayer > this.state.radius) {
      console.log(`Courez!! vous êtes à ${distanceFromCenterToPlayer} mètres du centre`)
      var audio = new Audio('./audio_file.mp3');
      audio.play();
    }
  }

  handlePlaySound() {
    var audio = new Audio("/radiation.mp3");
    audio.play();
  }

  render() {
    return (
      <div>
        {//<Button onClick={this.handlePlayerIsOutside}> Le joueur est il à l'extérieur ?</Button>
        }
        {//<Button onClick={this.handlePlayerPositionSubmit}>Envoyer position à Base de donnée</Button>
        }
        {
          <Button onClick={this.handlePlaySound}>Play sound</Button>
        }
        {!this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              options={getMapOptions}
              bootstrapURLKeys={{ key: 'AIzaSyCNdDKBGMx8DYGx2EBbKj23YMCgEbhj_5c' }}
              center={{ lat: this.state.centerPosition.latitude, lng: this.state.centerPosition.longitude }}
              defaultZoom={17}
              onGoogleApiLoaded={({ map, maps }) => {
                //On pourrait définir le rayon initiale à partir de la distance du joueur le plus éloigné
                var rad = this.state.currentRadius;
                var sop = 1;
                var sw = 1;
                var fillop = 0.6;
                var marker = this.createZone(map);

                let startTime = +new Date();

                for (var i = 0; i < 1000; i++) {
                  ({ rad, fillop, sw, sop } = this.narrowZone(map, rad, fillop, sw, sop, startTime, i));
                }
              }}
            >

              {Object.values(this.state.players).map(
                (player: any) => <Player lat={player.latitude} lng={player.longitude} />
              )}

            </GoogleMapReact>
          </div>
        ) : (
                <div>Getting the location data</div>
              )
        }

      </div>
    )
  }

  private createZone(map: any) {
    return new google.maps.Marker({
      map: map,
      position: { lat: this.state.centerPosition.latitude, lng: this.state.centerPosition.longitude },
      icon: getCircle(),
      draggable: false
    });
  }

  private narrowZone(map: any, rad: any, fillop: number, sw: number, sop: number, startTime: number, i: number) {
    setTimeout(() => {
      animate(map, { lat: this.state.centerPosition.latitude, lng: this.state.centerPosition.longitude }, rad, fillop, sw, sop);
      rad -= 2.0833;
      //compute time elapsed
      let elapsed = +new Date() - startTime;
      elapsed /= 1000;
      var seconds = Math.round(elapsed);
      console.log("current radius : ", rad, " seconds : ", seconds);
      //set current radius
      this.setState({ radius: rad });
      //check if player is outside
      this.handlePlayerIsOutside();
      sop = 1;
      fillop = 0.6;
      sw = 1;
      //sop -= 0.1;
      //fillop -= 0.1;
      //sw -= 0.1;
    }, i * 5000);
    return { rad, fillop, sw, sop };
  }
}

export default Map