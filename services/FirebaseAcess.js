import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig.js";
import { getAuth } from "firebase/auth"

const app = initializeApp(firebaseConfig);
const dbFirestore = getFirestore(app);
const authentication = getAuth(app)

const userCollection = collection(dbFirestore, 'User');
const taskCollection = collection(dbFirestore, 'Task');
const subTaskCollection = collection(dbFirestore, 'Subtask');

export { userCollection, taskCollection, subTaskCollection, dbFirestore, authentication };
