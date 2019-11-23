import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebaseConfig';

class firebaseService {
  init() {
    if (firebase.apps.length) return;
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }
  getUserData = userId => {
    if (!firebase.apps.length) return;
    return new Promise((resolve, reject) => {
      this.db
        .collection('users')
        .doc(userId)
        .get()
        .then(doc => resolve(doc.data()));
    });
  };

  updateUserData = user => {
    if (!firebase.apps.length) return;
    return this.db
      .collection('users')
      .doc(user.uid)
      .set(user);
  };

  getRetroInfo = retID => {
    if (!firebase.apps.length) return;
    return new Promise((resolve, reject) => {
      this.db
        .collection('retrospectives')
        .doc(retID)
        .get()
        .then(doc => resolve(doc.data()));
    });
  }

  updateRetField = retID =>{
    if (!firebase.apps.length) return;
    return this.db.collection('retrospectives').doc(retID)
  }

  updateRetData = ret => {
    if (!firebase.apps.length) return;
    return this.db.collection('retrospectives').doc(ret.id).set(ret)
  }

  createRet = ret => {
    if (!firebase.apps.length) return;
    
    let newRet = this.db.collection('retrospectives').doc()
    ret = {...ret, id: newRet.id}
    newRet.set(ret)

    return newRet.id;
  }

  deleteRet = (retID) =>{
    if (!firebase.apps.length) return;
    return new Promise((resolve, reject) => {
      this.db
        .collection('retrospectives')
        .doc(retID)
        .delete()
        .then(doc => resolve());
    });
  }

  onAuthStateChanged = callback => {
    if (!this.auth) return;
    this.auth.onAuthStateChanged(callback);
  };
  signOut = () => {
    if (!this.auth) return;
    this.auth.signOut();
  };
}
const instance = new firebaseService();

export default instance;
