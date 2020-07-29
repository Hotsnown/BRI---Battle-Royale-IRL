import { Player } from "../../client/features/types";

export function updatePlayer(firebaseApp, playerData: Player) {
  const data: Player = {
    username: playerData.username,
    uid: playerData.uid,
    isReady: playerData.isReady,
    isDead: playerData.isDead,
    position: playerData.position,
    deathHour: playerData.deathHour
  };

  return firebaseApp
          .database()
          .ref()
          .child(`players/${data.uid}`)
          .update(data);
}

export function startGame(firebaseApp) {
    const mDatabase = firebaseApp.database().ref()
    mDatabase.child("position/pierre").update({
        isDead:false,
        inGame:true
    });
}

export function endGame(firebaseApp) {
    const mDatabase = firebaseApp.database().ref()
    mDatabase.child("position/pierre").update({
        inGame:false
    });
} 