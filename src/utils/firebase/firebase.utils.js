import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDN5ZbliMFFbEbkJFkjhnfm0pY_MLKevL8",
    authDomain: "crown-clothing-db-5e6d6.firebaseapp.com",
    projectId: "crown-clothing-db-5e6d6",
    storageBucket: "crown-clothing-db-5e6d6.appspot.com",
    messagingSenderId: "292487970101",  
    appId: "1:292487970101:web:5758c9705a299f3d6f607c"  
};  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName:'Shelu'}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log("userDocRef", userDocRef);
    console.log("userSnapshot", userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);            
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}