import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProjectState, ProjectWeb} from '@/type';

const initialState: ProjectState = {
    project: {
        status: 0,
        statusText: '',
        error: null,
        data: {
            pinned: [],
            readme: '',
            info: {
                login: '',
                id: 0,
                node_id: '',
                avatar_url: '',
                gravatar_id: '',
                url: '',
                html_url: '',
                followers_url: '',
                following_url: '',
                gists_url: '',
                starred_url: '',
                subscriptions_url: '',
                organizations_url: '',
                repos_url: '',
                events_url: '',
                received_events_url: '',
                type: '',
                user_view_type: '',
                site_admin: false,
                name: '',
                company: '',
                blog: '',
                location: null,
                email: null,
                hireable: null,
                bio: '',
                twitter_username: '',
                notification_email: null,
                public_repos: 0,
                public_gists: 0,
                followers: 0,
                following: 0,
                created_at: new Date(),
                updated_at: new Date(),
                private_gists: 0,
                total_private_repos: 0,
                owned_private_repos: 0,
                disk_usage: 0,
                collaborators: 0,
                two_factor_authentication: false,
                plan: {
                    name: '',
                    space: 0,
                    collaborators: 0,
                    private_repos: 0
                }
            }
        }
    }
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        initialDataProject: (state, action: PayloadAction<ProjectWeb>) => {
            state.project = action.payload;
        }
    },
});

export const { initialDataProject } = projectSlice.actions;
export default projectSlice.reducer;
