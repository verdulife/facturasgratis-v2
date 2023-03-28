import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, addDoc } from "firebase/firestore/lite";
import { Firebase, User, Documents } from "$lib/stores";
import { clearLocalData } from "$lib/utils";
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

async function syncUser() {
  if (!auth.currentUser) return;

  const { uid } = auth.currentUser;
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, uid);
  const user = await getDoc(userRef);

  if (user.exists()) User.set(user.data());
  else User.subscribe(async value => await setDoc(userRef, value));
}

async function syncCollection({ collection, store }) {
  const collectionRef = getCollectionRef(collection);
  const docs = await getDocs(collectionRef);

  if (docs.empty) {
    const storeData = get(store);
    storeData.forEach(async doc => await addDoc(collectionRef, doc));
  } else {
    let docsData = [];
    docs.forEach(doc => docsData = [...docsData, doc.data()]);
    store.set(docsData);
  }
}

export async function updateCollection({ collection, data }) {
  const collectionRef = getCollectionRef(collection);
  await addDoc(collectionRef, data);
}

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const { uid } = user;
  Firebase.set({ user: true, uid });

  //TODO: si firebase y localstorage ambos tienen datos, preguntar si se quiere descargar una copia local antes.

  await syncUser();

  for (let key in Documents) {
    const collection = key.toLowerCase();
    const store = Documents[key];

    syncCollection({ collection, store });
  }
});