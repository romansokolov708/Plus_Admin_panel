import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography, Tooltip} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import {Link} from 'react-router-dom';
import {SERVER_URL} from 'app/ServerUrl.js';

class UsersList extends Component {

    state = {
        selectedUsersMenu: null,
        data: []
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedUserMenu = (event) => {
        this.setState({selectedUsersMenu: event.currentTarget});
    };

    closeSelectedUsersMenu = () => {
        this.setState({selectedUsersMenu: null});
    };

    render()
    {
        const { users, searchText, selectedUserIds, selectAllUsers, deSelectAllUsers, toggleInSelectedUsers, openEditUserDialog, removeUsers, removeUser} = this.props;
        const data = this.getFilteredArray(users, searchText);
        const {selectedUsersMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No users found
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditUserDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header   : () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllUsers() : deSelectAllUsers();
                                    }}
                                    checked={selectedUserIds.length === Object.keys(users).length && selectedUserIds.length > 0}
                                    indeterminate={selectedUserIds.length !== Object.keys(users).length && selectedUserIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedUserIds.includes(row.value._id)}
                                        onChange={() => toggleInSelectedUsers(row.value._id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedUserIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedUserMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedUsersMenu"
                                            anchorEl={selectedUsersMenu}
                                            open={Boolean(selectedUsersMenu)}
                                            onClose={this.closeSelectedUsersMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeUsers(selectedUserIds);
                                                        this.closeSelectedUsersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                )
                            ),
                            accessor : "avatar",
                            Cell     : row => (
                                <Avatar
                                    className=""
                                    alt="user photo"
                                    src={row.value && row.value !== '' ? (SERVER_URL + row.value) : "assets/images/avatars/profile.jpg"}
                                />
                            ),
                            className: "justify-center",
                            width    : 64,
                            sortable : false
                        },
                        {
                            Header    : "User Name",
                            accessor  : "user_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Phone",
                            accessor  : "phone",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Role",
                            accessor  : "role",
                            filterable: true
                        },
                        {
                            Header    : "Account Status",
                            accessor  : "account_status",
                            filterable: true
                        },
                        {
                            Header    : "Chama Code",
                            accessor  : "chama_code",
                            filterable: true
                        },
                        {
                            Header: "",
                            width : 160,
                            Cell  : row => (
                                <div className="flex items-center" onClick={(ev)=>{
                                    ev.stopPropagation();
                                }}>
                                    <Link to={"/transactions/user/" + row.original._id}>
                                        <Tooltip title="Show user transaction history">
                                            <IconButton>
                                                <Icon>history</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>

                                    <Tooltip title="Remove">
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                if (window.confirm('Are you sure to delete it?')) {
                                                    removeUser(row.original._id);
                                                }
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No users found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUsers             : Actions.getUsers,
        toggleInSelectedUsers: Actions.toggleInSelectedUsers,
        selectAllUsers       : Actions.selectAllUsers,
        deSelectAllUsers     : Actions.deSelectAllUsers,
        openEditUserDialog   : Actions.openEditUserDialog,
        removeUsers          : Actions.removeUsers,
        removeUser           : Actions.removeUser,
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        users          : usersApp.users.entities,
        selectedUserIds: usersApp.users.selectedUserIds,
        searchText        : usersApp.users.searchText,
        user              : usersApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList));
