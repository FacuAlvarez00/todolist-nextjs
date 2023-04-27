
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState} from '../../store'
import { v4 as uuidv4 } from 'uuid';

const generateId = (): string => {
  return uuidv4();
};

interface TaskState {
    value: any,
}

const initialState: TaskState = {
    value: [
      {
        id: generateId(),
        title: "Task 1",
        completed: false,
        description: "This is an example task",
      },
    ],
  }

  export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<any>) => {
        const newTask = { ...action.payload, id: generateId() };
        state.value.push(newTask)
      },
      editTask: (state, action: PayloadAction<any>) => {
        const { id, title, description, completed } = action.payload;
        const task = state.value.find((task: any) => task.id === id);
        if (task) {
          task.title = title;
          task.description = description;
          task.completed = completed;
        }
      },
      deleteTask: (state, action: PayloadAction<any>) => {
        state.value = state.value.filter((task: any) => task.id !== action.payload)
      }

    },
  })
  
  export const { addTask, deleteTask, editTask } = taskSlice.actions
  

  export const selectCount = (state: RootState) => state.tasks.value
  
  export default taskSlice.reducer

