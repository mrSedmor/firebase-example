import './styles.css';
import { showLoginState, showLoginForm, showApp, btnLogout } from './ui';

import { initializeApp } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  EmailAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDIoIRzEVLYUAacFuhtdxkAGV2NgLE6g88',
  authDomain: 'filmoteka-by-10x.firebaseapp.com',
  projectId: 'filmoteka-by-10x',
  storageBucket: 'filmoteka-by-10x.appspot.com',
  messagingSenderId: '584362052438',
  appId: '1:584362052438:web:cf4a6cf976e80465e364f7',
  databaseURL:
    'https://filmoteka-by-10x-default-rtdb.europe-west1.firebasedatabase.app/',
});

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);

      // hideLoginError();
      // hideLinkError();
    } else {
      console.log('no user');
      showLoginForm();
      lblAuthState.innerHTML = `You're not logged in.`;
    }
  });
};

// Log out
const logout = async () => {
  await signOut(auth);
};

btnLogout.addEventListener('click', logout);

export const auth = getAuth(firebaseApp);

monitorAuthState();

const githubProvider = new GithubAuthProvider();

const authUi = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log(authResult);
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>',
};

authUi.start('#firebaseui-auth-container', uiConfig);

// import './db';
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  update,
  child,
} from 'firebase/database';
const db = getDatabase(firebaseApp);

return;

setTimeout(() => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  console.log('userId:', userId);
  const usersRef = ref(db, '/users');
  // get(usersRef)
  //   .then(snapshot => {
  //     console.log(snapshot.val());
  //   })
  //   .catch(console.log);

  // const userRef = ref(db, `/users/${userId}`);

  // const movieId = Math.trunc(Math.random() * 100);
  // update(ref(db, `/users/${userId}/watched`), {
  //   [movieId]: movieId,
  // });

  // get(userRef).then(snapshot => {
  //   if (!snapshot.exists()) {
  //     console.log('No such user. Creating...');
  //     const newUser = {
  //       [userId]: {
  //         watched: null,
  //         queued: { b: 2 },
  //       },
  //     };
  //     console.log(newUser);
  //     update(ref(db, '/users'), newUser);
  //     // set(ref(db, '/users'), newUser);
  //     return;
  //   }
  //   console.log('user exists');
  //   const movieId = Math.trunc(Math.random() * 100);
  //   update(ref(db, `/users/${userId}/watched`), {
  //     [movieId]: movieId,
  //   });
  // });

  // getValue(data).then(data => {
  //   console.log(data);
  // });
}, 2000);

function getValue(ref) {
  return new Promise(resolve =>
    onValue(ref, snapshot => resolve(snapshot.val()))
  );
}
