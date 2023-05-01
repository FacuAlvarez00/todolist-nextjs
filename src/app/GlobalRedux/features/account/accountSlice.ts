import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState} from '../../store'
import { v4 as uuidv4 } from 'uuid';

const generateId = (): string => {
    return uuidv4();
  };

  interface UserState {
    user: any,
}

const initialState: UserState = {
  user: null
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any> ) => { 
      state.user = action.payload
    },
    removeUser: (state, action: PayloadAction<any> ) => { 
      state.user = action.payload
    }
   },
})

export const { setUser, removeUser } = userSlice.actions


export const selectCount = (state: RootState) => state.tasks.value

export default userSlice.reducer
