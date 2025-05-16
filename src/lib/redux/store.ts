import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './features/news/news.slice'
import categoryReducer from './features/category/category.slice'
import blogReducer from './features/blog/blog.slice'
import userReducer from './features/user/user.slice'
import dashboardReducer from './features/dashboard/dashboard.slice'
import ProjectReducer from './features/project/project.slice'
import SocialReducer from './features/social/social.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            news: newsReducer,
            category: categoryReducer,
            blog: blogReducer,
            user: userReducer,
            dashboard: dashboardReducer,
            project: ProjectReducer,
            social: SocialReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
