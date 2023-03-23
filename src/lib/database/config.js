import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, addDoc } from "firebase/firestore/lite";
import { Firebase, User, Documents } from "$lib/stores";
import { clearLocalData } from "$lib/utils";


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

async function syncUserData(uid) {
  if (!uid) return;

  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    User.update(value => value = userData)
  }
  else {
    User.subscribe(async value => {
      await setDoc(userRef, value);
    });
  }
}

async function syncDocumentsData({ uid, documents, documentsStore }) {
  if (!uid) return;

  const documentsRef = collection(db, `users/${uid}/${documents}`)
  const documentsSnap = await getDocs(documentsRef);

  if (documentsSnap.empty) {
    documentsStore.subscribe(value => {
      value.forEach(async document => {
        await addDoc(documentsRef, document);
      })
    })
  } else {
    documentsStore.set([]);

    documentsSnap.forEach(doc => {
      const documentData = doc.data();
      documentsStore.update(value => value = [documentData, ...value]);
    })
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    clearLocalData();
    return;
  };

  const { uid } = user;
  Firebase.update(value => value = { user: true, uid });

  await syncUserData(uid);

  for (let key in Documents) {
    const documents = key.toLowerCase();
    const documentsStore = Documents[key];
    await syncDocumentsData({ uid, documents, documentsStore })
  }
});