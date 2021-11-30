import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyCLTEjQESDS1K2qE82YXasA6cdhIbaf_I4",
  authDomain: "clothing-db-9ff40.firebaseapp.com",
  projectId: "clothing-db-9ff40",
  storageBucket: "clothing-db-9ff40.appspot.com",
  messagingSenderId: "374746267377",
  appId: "1:374746267377:web:04b4e6fe6dcae5527f3350",
  measurementId: "G-7Y7B63YD4D"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try{
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err){
      console.log("Error Creating User", err.message)
    } 
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase