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

const firebaseConfig = {
  apiKey: 'AIzaSyDIoIRzEVLYUAacFuhtdxkAGV2NgLE6g88',
  authDomain: 'filmoteka-by-10x.firebaseapp.com',
  projectId: 'filmoteka-by-10x',
  storageBucket: 'filmoteka-by-10x.appspot.com',
  messagingSenderId: '584362052438',
  appId: '1:584362052438:web:cf4a6cf976e80465e364f7',
  databaseURL:
    'https://filmoteka-by-10x-default-rtdb.europe-west1.firebasedatabase.app/',
};

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log('Sign in success callback');
      console.log(authResult);
      return false;
    },
    uiShown: function () {
      console.log('UI widget is rendered callback');
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

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const authUi = new firebaseui.auth.AuthUI(auth);

monitorAuthState();

btnLogout.addEventListener('click', logout);
startAuthUi();

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  update,
  child,
  remove,
} from 'firebase/database';

// Database
const db = getDatabase(firebaseApp);

runExample();

return;

async function runExample() {
  const dataRef = ref(db, '/data/subdir');

  const dataToSet = {
    width: 50,
    height: 60,
  };

  await set(dataRef, dataToSet);
  // .then(console.log.bind(null, 'set-then'))
  // .catch(console.log.bind(null, 'set-catch'));
  console.log((await get(dataRef)).val());
  await update(dataRef, { newData: '...' });
  console.log((await get(dataRef)).val());
  await remove(dataRef);
  console.log((await get(dataRef)).val());
}

// Monitor auth state
async function monitorAuthState() {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('Login event');
      console.log(user);
      showApp();
      showLoginState(user);
    } else {
      console.log('No user event');
      showLoginForm();
      lblAuthState.innerHTML = `You're not logged in.`;
    }
  });
}

// Log out
async function logout() {
  await signOut(auth);
  startAuthUi();
}

function startAuthUi() {
  authUi.start('#firebaseui-auth-container', uiConfig);
}
