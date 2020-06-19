import { init } from '../Services/Main'
import firebaseApp from '../firebase/Firebase';

it("should return player positions", () => {

    const mDatabase = firebaseApp.database().ref()
    const val = mDatabase.child("position")
      .once('value')
        .then((snapshot) => {
            const snapshotValue = snapshot.val();
                return snapshotValue; // note that db will return null if no value found or node does not exist
        })
        const test = val.then(value => console.log("ici", value))
        expect(test).toBeCalled()
})