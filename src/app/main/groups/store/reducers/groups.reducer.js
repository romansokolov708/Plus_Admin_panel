import * as Actions from '../actions';

const initialState = {
    entities          : [],
    searchText        : '',
    selectedGroupIds: [],
    routeParams       : {},
    groupDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const groupsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GROUPS:
        {
            return {
                ...state,
                entities   : action.payload,
                routeParams: action.routeParams
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_GROUPS:
        {

            const groupId = action.groupId;

            let selectedGroupIds = [...state.selectedGroupIds];

            if ( selectedGroupIds.find(id => id === groupId) !== undefined )
            {
                selectedGroupIds = selectedGroupIds.filter(id => id !== groupId);
            }
            else
            {
                selectedGroupIds = [...selectedGroupIds, groupId];
            }

            return {
                ...state,
                selectedGroupIds: selectedGroupIds
            };
        }
        case Actions.SELECT_ALL_GROUPS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedGroupIds = arr.map(group => group._id);

            return {
                ...state,
                selectedGroupIds: selectedGroupIds
            };
        }
        case Actions.DESELECT_ALL_GROUPS:
        {
            return {
                ...state,
                selectedGroupIds: []
            };
        }
        case Actions.OPEN_NEW_GROUP_DIALOG:
        {
            return {
                ...state,
                groupDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_GROUP_DIALOG:
        {
            return {
                ...state,
                groupDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_GROUP_DIALOG:
        {
            return {
                ...state,
                groupDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_GROUP_DIALOG:
        {
            return {
                ...state,
                groupDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default groupsReducer;
