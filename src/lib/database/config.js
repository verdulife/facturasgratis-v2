import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore/lite";
import { Firebase, User } from "$lib/stores";


const firebaseConfig = {
  apiKey: "AIzaSyBLfDlTK2nTfGKNQtPovcp-sKDiym8ToiE",
  authDomain: "facturasgratis-app.firebaseapp.com",
  projectId: "facturasgratis-app",
  storageBucket: "facturasgratis-app.appspot.com",
  messagingSenderId: "302008098851",
  appId: "1:302008098851:web:3844c90a140aa34fbcd196",
  measurementId: "G-N9HRFSV8M0"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp)
export const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    Firebase.update(value => value = { user: false, uid: "" });
    return;
  };

  const { uid } = user;
  Firebase.update(value => value = { user: true, uid });

  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log(userSnap.data());
    /* const billsRef = collection(db, "users");
    const billsSnap = await getDocs(billsRef);
    console.log(billsSnap); */
  }
  else {
    User.subscribe(async value => {
      await setDoc(userRef, value);
    });
  }
});