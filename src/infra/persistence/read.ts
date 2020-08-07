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