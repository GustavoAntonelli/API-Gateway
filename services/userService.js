import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, userCollection } from "./FirebaseAcess.js";
import jwtService from './jwtService.js'
import { addDoc, doc, query, setDoc, getDoc, getDocs, deleteDoc, where, updateDoc } from "firebase/firestore";
const userService = {
  registerUser: async (input) =>{
    console.log('START Register')
    console.log('START Register :: input :: ', input)
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, input.email, input.password)
      console.log('User authentication created :: userId :: ', userCredential.user.uid)
      const user = userCredential.user
      delete input.password

      await setDoc(doc(userCollection, user.uid), {
        email: user.email,
        uid: user.uid,
        ...input
      });
      console.log('User data create')
      console.log('DONE Register')
      return { success: true, newUser: input }
    } catch (error) {
      console.log('ERROR Register :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  loginUser: async (input) =>{
    console.log('START Login')
    console.log('START Login :: input :: ', input)
    try {
      const authenticationUser = await signInWithEmailAndPassword(authentication, input.email, input.password)
      if (!authenticationUser.user) {
        return { success: false, message: "User not found" }
      }
      const token = jwtService.generateJWT(authenticationUser.user.uid, authenticationUser.user.email)
      console.log('User logged in')
      console.log('DONE Login')
      return { success: true, token: token }
    } catch (error) {
      console.log('ERROR Login :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  getUserByEmail: async (email) =>{
    console.log('START Get user by email')
    console.log('START Register :: input :: ', email)
    try {
      const ref = query(userCollection, where("email", "==", email));
      const querySnapshot = await getDocs(ref);
      const user = querySnapshot.docs[0];
      console.log('User found :: user :: ', user.data())
      return { success: true, user: user.data() }
    } catch (error) {
      console.log('ERROR Get user by email :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  getUserById: async (id) =>{
    console.log('START Get user by id')
    console.log('START Get user by id :: input :: ', id)
    try {
      const ref = doc(userCollection, id);
      const user = await getDoc(ref);
      console.log('User found :: user :: ', user)
      return { success: true, user: user.data() }
    } catch (error) {
      console.log('ERROR Get user by id :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  deleteUserByEmail: async (input) =>{
    console.log('START Delete user by email')
    console.log('START Delete user by email :: input :: ', input)
    try {
      const ref = query(userCollection, where("email", "==", input.email));
      const querySnapshot = await getDocs(ref);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0];
        await deleteDoc(doc(userCollection, user.id));
        console.log('DONE Delete user')
        return { success: true }
      }
      console.log('DONE without delete user')
      return { success: true, message: 'User not found' }
    } catch (error) {
      console.log('ERROR Delete user by email :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  deleteUserById: async (input) =>{
    console.log('START Delete user by id')
    console.log('START Delete user by id :: input :: ', input)
    try {
      if (input.userId) {
        await deleteDoc(doc(userCollection, input.userId));
        console.log('DONE Delete user')
        return { success: true, message: 'Deleted user' }
      }
      console.log('DONE without delete user')
      return { success: true, message: 'User id not provided' }
    } catch (error) {
      console.log('ERROR Delete user by id :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  updateUserByEmail: async (userEmail, updateData) =>{
    console.log('START Update user by email')
    console.log('START Update user by email :: input :: ', { userEmail, updateData })
    try {
      const ref = query(userCollection, where("email", "==", userEmail));
      const querySnapshot = await getDocs(ref);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0];
        console.log('User found :: user :: ', user)
        await updateDoc(doc(userCollection, user.id), updateData);
        console.log('DONE Update user')
        return { success: true }
      }
      console.log('DONE without update user')
      return { success: true, message: 'User not found' }
    } catch (error) {
      console.log('ERROR Update user by email :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  updateUserById: async (userId, updateData) =>{
    console.log('START Update user by id')
    console.log('START Update user by id :: input :: ', { userId, updateData })
    try {
      if (userId) {
        await updateDoc(doc(userCollection, userId), updateData);
        console.log('DONE Update user by id')
        return { success: true }
      }
      return { success: true, message: 'Required userId'}
    } catch (error) {
      console.log('ERROR Update user by id :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },
}

export default userService;