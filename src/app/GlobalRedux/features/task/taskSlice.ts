
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState} from '../../store'
import { v4 as uuidv4 } from 'uuid';

const generateId = (): string => {
  return uuidv4();
};


interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}


const initialState: Task[] = [];



  export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<any>) => {
        const newTask = { ...action.payload, id: generateId() };
        state.push(newTask)
      },
      editTask: (state, action: PayloadAction<any>) => {
        const { id, title, description, completed } = action.payload;
        const task = state.find((task: any) => task.id === id);
        if (task) {
          task.title = title;
          task.description = description;
          task.completed = completed;
        }
      },
      deleteTask: (state, action: PayloadAction<string>) => {
        const index = state.findIndex((task) => task.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      },
      setTasks: (state, action: PayloadAction<any>) => {
        return action.payload;
      },

    },
  })
  
  export const { addTask, deleteTask, editTask, setTasks } = taskSlice.actions
  

  export const selectCount = (state: RootState) => state.tasks
  
  export default taskSlice.reducer

