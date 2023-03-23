import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, addDoc } from "firebase/firestore/lite";
import { Firebase, User, Bills, Budgets } from "$lib/stores";
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
    documentsSnap.forEach(doc => {
      const documentData = doc.data();
      documentsStore.update(value => {
        console.log("snap: " + documentData, "local: " + value);
        /* value = [documentData, ...value]; */
      })
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
  await syncDocumentsData({ uid, documents: "bills", documentsStore: Bills })
  await syncDocumentsData({ uid, documents: "budgets", documentsStore: Budgets })

  /* if (userSnap.exists()) {
    const userData = userSnap.data();
    User.update(value => value = userData);

    const billsRef = collection(db, `users/${user.uid}/bills`)
    const billsSnap = await getDocs(billsRef);

    if (billsSnap.empty) {
      console.log("no docs");
      Bills.subscribe(value => {
        console.log(value);

        value.forEach(async bill => {
          await addDoc(billsRef, bill);
        })
      })
    } else {
      billsSnap.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
      })
    }

  }
  else {
    User.subscribe(async value => {
      await setDoc(userRef, value);
    });
  } */
});