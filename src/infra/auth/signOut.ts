export function signOut(firebaseApp, hashHistory) {
    firebaseApp.auth().signOut().then(function() {
    console.log("sign out succesful");
    hashHistory.push('/login');
  }, function(error) {
    console.log("an error happened");
  });}