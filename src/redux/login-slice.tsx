import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        user_name: localStorage.getItem('user_name'),
        email: localStorage.getItem('email'),
        isLoggedIn: localStorage.getItem('token') ? true : false,
        project_code: localStorage.getItem('projectcode'),
        projectStartDate: localStorage.getItem('projectStartDate'),
        tenantId:localStorage.getItem('tenantId'),
        isAdmin:false,


    },
    reducers: {
        userLogin(state, action) {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        userLogout(state) {
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user_name');
            localStorage.removeItem('email');
            localStorage.removeItem('projectcode');
            localStorage.removeItem('projectStartDate');
            localStorage.removeItem('tenantId');
            localStorage.removeItem('isAdmin');
        },
        setUserId(state, action) {
            state.userId = action.payload.userId;
            localStorage.setItem('userId', action.payload.userId);
        },
        setUserName(state, action) {
            state.user_name = action.payload.user_name;
            localStorage.setItem('user_name', action.payload.user_name);
        },
        setEmail(state, action) {
            state.email = action.payload.email;
            localStorage.setItem('email', action.payload.email);
        },
        userLoggedInStatus(state, action) {
            state.isLoggedIn = action.payload.status;
        },
        agronomistLogin(state, action) {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        agronomistLoggedInStatus(state, action) {
            state.isLoggedIn = action.payload.status;
        },
        agronomistLogout(state) {
            state.token = '';
            localStorage.removeItem('token');
        },
        setProjectCode(state, action) {
            state.project_code = action.payload.projectCode;
            localStorage.setItem('projectcode', action.payload.projectCode);
        },
        
        projectStartDate(state, action) {
            state.projectStartDate = action.payload.projectStartDate;
            localStorage.setItem('projectStartDate', action.payload.projectStartDate);
        },
        setTenantId(state,action)
        {
            state.tenantId=action.payload.tenantId;
            localStorage.setItem('tenantId',action.payload.tenantId);
        },
        unsetTenantId(state) {
            state.tenantId = '';
            localStorage.removeItem('tenantId');
        },
        setIsAdmin(state,action)
        {
            state.isAdmin=action.payload.isAdmin;
            localStorage.setItem('isAdmin',action.payload.isAdmin);
        },
        unsetIsAdmin(state)
        {
            state.isAdmin=false;
            localStorage.removeItem('isAdmin');
        }
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
