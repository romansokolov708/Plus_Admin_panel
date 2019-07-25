import api from 'app/ApiConfig.js'

export const GET_USERS = '[USERS APP] GET USERS';
export const SET_SEARCH_TEXT = '[USERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_USERS = '[USERS APP] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USERS APP] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USERS APP] DESELECT ALL USERS';
export const OPEN_NEW_USER_DIALOG = '[USERS APP] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[USERS APP] CLOSE NEW USER DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[USERS APP] OPEN EDIT USER DIALOG';
export const CLOSE_EDIT_USER_DIALOG = '[USERS APP] CLOSE EDIT USER DIALOG';
export const ADD_USER = '[USERS APP] ADD USER';
export const UPDATE_USER = '[USERS APP] UPDATE USER';
export const REMOVE_USER = '[USERS APP] REMOVE USER';
export const REMOVE_USERS = '[USERS APP] REMOVE USERS';
export const RESET_PASSWORD = '[USERS APP] RESET PASSWORD';

export function getUsers(routeParams)
{
    var apiPath = '/users/getUsersByStatus';
    var account_status = "All";
    var chama_code = '';

    switch(routeParams.id) {
        case 'active':
            account_status = "Active";
            break;
        case 'suspend':
            account_status = "Suspend";
            break;
        case "remove":
            account_status = "Remove";
            break;
        default:
            break;
    }

    if (routeParams.chama_code !== undefined) {
        apiPath = '/users/getGroupMembersByStatus';
        chama_code = routeParams.chama_code;
    }

    return (dispatch) => api.post(apiPath, {account_status, chama_code}).then((response) => {
        dispatch({
            type   : GET_USERS,
            payload: response.data.doc,
            routeParams
        });}
    );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedUsers(userId)
{
    return {
        type: TOGGLE_IN_SELECTED_USERS,
        userId
    }
}


export function selectAllUsers()
{
    return {
        type: SELECT_ALL_USERS
    }
}

export function deSelectAllUsers()
{
    return {
        type: DESELECT_ALL_USERS
    }
}


export function openNewUserDialog()
{
    return {
        type: OPEN_NEW_USER_DIALOG
    }
}

export function closeNewUserDialog()
{
    return {
        type: CLOSE_NEW_USER_DIALOG
    }
}

export function openEditUserDialog(data)
{
    return {
        type: OPEN_EDIT_USER_DIALOG,
        data
    }
}

export function closeEditUserDialog()
{
    return {
        type: CLOSE_EDIT_USER_DIALOG
    }
}

export function addUser(user)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().usersApp.users;

        const request = api.post('/users/addNewUser', {
            user
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        );
    };
}

export function updateUser(user)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().usersApp.users;

        const request = api.post('/users/updateUser', {
            user
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        );
    };
}

export function removeUser(userId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().usersApp.users;

        const request = api.post('/users/removeUser', {
            userId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        );
    };
}

export function removeUsers(userIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().usersApp.users;

        const request = api.post('/users/removeUsers', {
            userIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USERS
                }),
                dispatch({
                    type: DESELECT_ALL_USERS
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        );
    };
}
