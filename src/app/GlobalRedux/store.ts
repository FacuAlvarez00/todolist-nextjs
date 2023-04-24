import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../GlobalRedux/features/task/taskSlice"



const store = configureStore({
    reducer: {
        tasks: taskReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch