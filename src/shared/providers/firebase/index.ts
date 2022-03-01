import firebase from 'firebase-admin';

import firebaseServiceAccount from './serviceAccountKey.json';

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseServiceAccount as any),
});
