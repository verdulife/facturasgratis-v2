import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore/lite";
import { User } from "$lib/stores";
import { get } from 'svelte/store';


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

function getCollectionRef(collectionName) {
  if (!auth.currentUser) return;

  const { uid } = auth.currentUser;
  return collection(db, `users/${uid}/${collectionName}`)
}

export async function syncUser(uid) {
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, uid);
  const user = await getDoc(userRef);

  if (user.exists()) User.set(user.data());
  else {
    const localUser = get(User);
    await setDoc(userRef, localUser);
  }
}

export async function updateUser(data) {
  if (!auth.currentUser) return;

  const { uid } = auth.currentUser;
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, uid);
  await setDoc(userRef, data)
}

export async function addDoc({ collection, data }) {
  const collectionRef = getCollectionRef(collection);
  const docRef = doc(collectionRef);
  const { id } = docRef;

  await setDoc(docRef, { id, ...data });
}

export async function updateDoc({ collection, data }) {
  /* const collectionRef = getCollectionRef(collection);
  const docRef = doc(collectionRef);
  const { id } = docRef;

  await setDoc(docRef, { id, ...data }); */
}

export async function syncCollection({ collection, store }) {
  const collectionRef = getCollectionRef(collection);
  const docs = await getDocs(collectionRef);

  if (docs.empty) {
    const storeData = get(store);
    storeData.forEach(async data => await addDoc({ collection, data }));
  } else {
    let docsData = [];
    docs.forEach(doc => docsData = [...docsData, doc.data()]);
    store.set(docsData);
  }
}
