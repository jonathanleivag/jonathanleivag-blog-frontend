import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dashboard, DashboardState} from '@/type';


const initialState: DashboardState = {
    dashboard: {
        totalBlogs: 0,
        totalBlogsDraft: 0,
        totalBlogsPublished: 0,
        totalCategories: 0,
        totalCategoriesPublished: 0,
        totalCategoriesDraft: 0,
        totalUsers: 0,
        totalUserAdmin: 0,
        totalUserUser: 0,
        views: '',
        averageReadings: 0,
        averageTime: 0,
        featuredBlog: 0,
        tendencies: {
            trend: '→ estable',
            percentage: 0
        }
    }
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        initialDataDashboard: (state, action: PayloadAction<Dashboard>) => {
            state.dashboard = action.payload;
        }
    },
});

export const { initialDataDashboard} = dashboardSlice.actions;
export default dashboardSlice.reducer;
