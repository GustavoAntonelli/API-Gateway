import { taskCollection } from "./FirebaseAcess.js";
import { addDoc, doc, query, where, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
const taskService = {
  createTask: async (task) => {
    console.log("START Create task")
    console.log("START Create task :: input :: ", task)
    try {
      await addDoc(taskCollection, task);
      return { success: true, task }
    } catch (error) {
      console.log('ERROR Create task :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  getTasks: async (userId) => {
    console.log("START Get tasks")
    console.log("START Get tasks :: userId :: ", userId)
    try {
      const taskQuery = query(taskCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(taskQuery);
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      return { success: true, tasks };
    } catch (error) {
      console.log('ERROR Create task :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  getTaskById: async (id) => {
    console.log("START Get task by id")
    console.log("START Get task by id :: input :: ", id)
    try {
      const reference = doc(taskCollection, id);
      const task = await getDoc(reference);
      return { success: true, task: task.data() }
    } catch (error) {
      console.log('ERROR Create task :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  deleteTaskById: async (input) => {
    console.log("START Delete task by id")
    console.log("START Delete task by id :: input :: ", input)
    try {
      await deleteDoc(doc(taskCollection, input.taskId));
      return { success: true }
    } catch (error) {
      console.log('ERROR Create task :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  },

  updateTaskById: async (taskId, updateData) => {
    console.log("START Update task by id")
    console.log("START Update task by id :: input :: ", { taskId, updateData })
    try {
      await updateDoc(doc(taskCollection, taskId), updateData);
      return { success: true }
    } catch (error) {
      console.log('ERROR Create task :: error :: ', error.message)
      return { success: false, error: error.message }
    }
  }
}

export default taskService;