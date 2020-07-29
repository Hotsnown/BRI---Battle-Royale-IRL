import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import firebaseApp from "../../../config/firebase/Firebase";

import { getMapOptions } from "../../../config/googleMaps/mapOptions";

import { Player } from "./Player";
import { Player as PlayerType } from "../types";
import { getCenter } from "geolib";
import { getCircle, animate } from "../../../entities/Zone";
import {
  getSelfPosition,
  realTimeRetrieveAllPlayers,
} from "../../../infra/persistence/read";
import { updatePlayer } from "../../../infra/persistence/update";
import { isPlayerOutside2 } from "../../../controllers/isPlayerOutside";
import ThemeContext from "../../themeContext";

declare var google: any;

interface BattlefieldProps {
  coords: Position;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
}

type Radius = number;
type Position = { latitude: number; longitude: number };

interface BattlefieldState {
  text: string;
  radius: any;
  currentRadius: Radius | void;
  centerPosition: Position
}

class Battlefield extends Component<BattlefieldProps, BattlefieldState> {
  constructor(props) {
    super(props);
    var user = firebaseApp.auth().currentUser;

    this.state = {
      text: "",
      centerPosition: { latitude: 0, longitude: 0 },
      radius: {},
      currentRadius: this.handleRadius(),
    };

    this.handlePlayerPositionSubmit = this.handlePlayerPositionSubmit.bind(
      this
    );
    this.handleCenterPosition = this.handleCenterPosition.bind(this);
    this.handlePlayerIsOutside = this.handlePlayerIsOutside.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handlePlaySound = this.handlePlaySound.bind(this);
  }

  componentDidMount() {
    this.handleCenterPosition();
  }

  handleRadius() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://us-central1-pubg-irl-261413.cloudfunctions.net/Starttimer"
    )
      .then((res) => res.json())
      .then((res) => this.setState({ currentRadius: res["data"] }))
      .catch((err) => {
        this.setState({ currentRadius: 0 });
        console.error(err);
      });
  }

  async handleCenterPosition() {
    const positions = await realTimeRetrieveAllPlayers(firebaseApp);
    const latlng = Object.values(positions);
    const centerPosition = getCenter(latlng as any);
    this.setState({ centerPosition: centerPosition as Position });
  }

  handlePlayerPositionSubmit(e, playerData) {
    e.preventDefault();
    updatePlayer(
      firebaseApp,
      playerData
    );
  }

  handlePlayerIsOutside(): void {
    const centerPosition = {
      latitude: this.state.centerPosition.latitude,
      longitude: this.state.centerPosition.longitude,
    };
    const playerPosition = {
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
    };
    if (isPlayerOutside2(centerPosition, playerPosition)) {
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
              // Important! Always set the container height explicitly
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  options={getMapOptions}
                  bootstrapURLKeys={{
                    key: "AIzaSyCNdDKBGMx8DYGx2EBbKj23YMCgEbhj_5c",
                  }}
                  center={{
                    lat: 59.95,
                    lng: 30.33,
                  }}
                  //center={{ lat: this.state.centerPosition.latitude, lng: this.state.centerPosition.longitude }}
                  defaultZoom={17}
                  onGoogleApiLoaded={({ map, maps }) => {
                    this.startZone(map);
                  }}
                >
                  {value.self.isDead
                    ? Object.values(value.players).map((player: PlayerType) => (
                      <Player
                        lat={player.position.latitude}
                        lng={player.position.longitude}
                      />
                    ))
                    : Object.values(value.players)
                      .filter((player: PlayerType) => player.uid === this.context.self.uid)
                      .map((player) => (
                        <Player
                          lat={player.position.latitude}
                          lng={player.position.longitude}
                        />
                      ))}
                </GoogleMapReact>
              </div>
            ) : (
                    <div>En attente des données de géolocalisation</div>
                  )}
          </>
        )}
      </ThemeContext.Consumer>
    );
  }

  private startZone(map: any) {
    var rad = this.state.currentRadius;
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
        lat: this.state.centerPosition.latitude,
        lng: this.state.centerPosition.longitude,
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
      animate(
        map,
        {
          lat: this.state.centerPosition.latitude,
          lng: this.state.centerPosition.longitude,
        },
        rad,
        fillop,
        sw,
        sop
      );
      rad -= 2.0833;
      let elapsed = +new Date() - startTime;
      elapsed /= 1000;
      var seconds = Math.round(elapsed);
      console.log("current radius : ", rad, " seconds : ", seconds);
      this.setState({ radius: rad > 10 ? rad : 10 }); //radius should not be less than 10 meters
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

export default Battlefield;
