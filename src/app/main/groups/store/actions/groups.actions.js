import api from 'app/ApiConfig.js'
import { message } from 'antd';

export const GET_GROUPS = '[GROUPS APP] GET GROUPS';
export const SET_SEARCH_TEXT = '[GROUPS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_GROUPS = '[GROUPS APP] TOGGLE IN SELECTED GROUPS';
export const SELECT_ALL_GROUPS = '[GROUPS APP] SELECT ALL GROUPS';
export const DESELECT_ALL_GROUPS = '[GROUPS APP] DESELECT ALL GROUPS';
export const OPEN_NEW_GROUP_DIALOG = '[GROUPS APP] OPEN NEW GROUP DIALOG';
export const CLOSE_NEW_GROUP_DIALOG = '[GROUPS APP] CLOSE NEW GROUP DIALOG';
export const OPEN_EDIT_GROUP_DIALOG = '[GROUPS APP] OPEN EDIT GROUP DIALOG';
export const CLOSE_EDIT_GROUP_DIALOG = '[GROUPS APP] CLOSE EDIT GROUP DIALOG';
export const ADD_GROUP = '[GROUPS APP] ADD GROUP';
export const UPDATE_GROUP = '[GROUPS APP] UPDATE GROUP';
export const REMOVE_GROUP = '[GROUPS APP] REMOVE GROUP';
export const REMOVE_GROUPS = '[GROUPS APP] REMOVE GROUPS';
export const RESET_PASSWORD = '[GROUPS APP] RESET PASSWORD';

export function getGroups(routeParams)
{
    var apiPath = '/groups/getAllGroups';

    return (dispatch) => api.post(apiPath, {}).then((response) => {
        dispatch({
            type   : GET_GROUPS,
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

export function toggleInSelectedGroups(groupId)
{
    return {
        type: TOGGLE_IN_SELECTED_GROUPS,
        groupId
    }
}


export function selectAllGroups()
{
    return {
        type: SELECT_ALL_GROUPS
    }
}

export function deSelectAllGroups()
{
    return {
        type: DESELECT_ALL_GROUPS
    }
}


export function openNewGroupDialog()
{
    return {
        type: OPEN_NEW_GROUP_DIALOG
    }
}

export function closeNewGroupDialog()
{
    return {
        type: CLOSE_NEW_GROUP_DIALOG
    }
}

export function openEditGroupDialog(data)
{
    return {
        type: OPEN_EDIT_GROUP_DIALOG,
        data
    }
}

export function closeEditGroupDialog()
{
    return {
        type: CLOSE_EDIT_GROUP_DIALOG
    }
}

export function addGroup(newAccount)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().groupsApp.groups;

        const request = api.post('/groups/addNewGroup', {
            group: newAccount
        });

        return request.then((response) =>
            {
                message.success('Chama group successfully created.');
                Promise.all([
                    dispatch({
                        type: ADD_GROUP
                    })
                ]).then(() => dispatch(getGroups(routeParams)))
            }
        ).catch((error) => {
            message.error(error);
        });
    };
}

export function updateGroup(group)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().groupsApp.groups;

        const request = api.post('/groups/updateGroup', {
            group
        });

        return request.then((response) =>
            {
                message.success('Chama group successfully updated.');
                Promise.all([
                    dispatch({
                        type: UPDATE_GROUP
                    })
                ]).then(() => dispatch(getGroups(routeParams)))
            }
        ).catch((error) => {
            message.error(error);
        });
    };
}

export function removeGroup(groupId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().groupsApp.groups;

        const request = api.post('/groups/removeGroup', {
            groupId
        });

        return request.then((response) =>
            {
                message.success('Chama group successfully removed.');
                Promise.all([
                    dispatch({
                        type: REMOVE_GROUP
                    })
                ]).then(() => dispatch(getGroups(routeParams)))
            }
        ).catch(error => {
            message.error(error);
        });
    };
}

export function removeGroups(groupIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().groupsApp.groups;

        const request = api.post('/groups/removeGroups', {
            groupIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_GROUPS
                }),
                dispatch({
                    type: DESELECT_ALL_GROUPS
                })
            ]).then(() => dispatch(getGroups(routeParams)))
        );
    };
}
