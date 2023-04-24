
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState} from '../../store'

interface TaskState {
    value: any,
}

const initialState: TaskState = {
    value: [
      {
        id: "1",
        title: "Task 1",
        completed: false,
        description: "This is a example task",
      },
    ],
  }

  export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<any>) => {
        state.value.push(action.payload)
      },
      deleteTask: (state, action: PayloadAction<any>) => {
        state.value = state.value.filter((task: any) => task.id !== action.payload)
      }
      
    },
  })
  
  export const { addTask, deleteTask } = taskSlice.actions
  

  export const selectCount = (state: RootState) => state.tasks.value
  
  export default taskSlice.reducer

