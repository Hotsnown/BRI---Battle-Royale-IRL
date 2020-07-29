import firebaseApp from '../../config/firebase/Firebase';

export default (nextState, replace) => {
	var user = firebaseApp.auth().currentUser;
  if (!user) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
