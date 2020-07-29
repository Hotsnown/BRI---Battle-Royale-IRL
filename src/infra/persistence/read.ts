import { Player } from '../../client/features/types'

export function retrieveAllPlayers(firebaseApp): Player[] {
  const mDatabase = firebaseApp.database().ref()
  return mDatabase.child("players")
    .once('value')
    .then((snapshot) => {
      const snapshotValue = snapshot.val();
      return snapshotValue;
    })
}

export function getSelfPosition(firebaseApp) {
  const selfPosition = firebaseApp.database().ref('position/pierre');
  return selfPosition.on('value', function (snapshot) {
    return snapshot!.val();
  });
}

export function realTimeRetrieveAllPlayers(firebaseApp) {
  var positions = firebaseApp.database().ref('position');
  return positions.on('value', function (snapshot) {
    return snapshot!.val();
  });
}