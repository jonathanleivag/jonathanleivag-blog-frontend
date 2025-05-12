import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuditLog, Dashboard, DashboardState, Pagination} from '@/type';


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
            percentage: 0,
            title: ''
        }
    },
    auditLog: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    }
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        initialDataDashboard: (state, action: PayloadAction<Dashboard>) => {
            state.dashboard = action.payload;
        },
        initialDataAuditLogs: (state, action: PayloadAction<Pagination<AuditLog>>) => {
            state.auditLog = action.payload;
        },
        addAuditLog: (state, action: PayloadAction<Pagination<AuditLog>>) => {
          state.auditLog = {
              ...action.payload,
              docs: [...state.auditLog.docs, ...action.payload.docs]
          }
        }
    },
});

export const { initialDataDashboard, initialDataAuditLogs,addAuditLog } = dashboardSlice.actions;
export default dashboardSlice.reducer;
