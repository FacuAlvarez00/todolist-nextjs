import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../GlobalRedux/features/task/taskSlice"
import userReducer from "../GlobalRedux/features/account/accountSlice"



const store = configureStore({
    reducer: {
        tasks: taskReducer,
        user: userReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch