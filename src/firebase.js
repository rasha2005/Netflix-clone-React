import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDFCT5h3N3r_wCNRff88HtG_IgORI-FwFw",
  authDomain: "netflix-clone-7e25b.firebaseapp.com",
  projectId: "netflix-clone-7e25b",
  storageBucket: "netflix-clone-7e25b.appspot.com",
  messagingSenderId: "376034137388",
  appId: "1:376034137388:web:5990ca28bc4389480dc889"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name , email ,password) => {
    try {
     const res = await createUserWithEmailAndPassword(auth , email ,password);
     const user = res.user;
     await addDoc(collection(db , "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    });
}catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async(email , password) => {
    try {
       await signInWithEmailAndPassword(auth,email , password); 
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    console.log("Logged out from firebase file")
    signOut(auth);
}

export {
    auth ,
    db,
    login,
    signup,
    logout
}