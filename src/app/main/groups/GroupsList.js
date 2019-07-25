import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import Tooltip from '@material-ui/core/Tooltip';
import {SERVER_URL} from 'app/ServerUrl.js';
import moment from 'moment/moment.js';

class GroupsList extends Component {

    state = {
        selectedGroupsMenu: null,
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

    openSelectedGroupMenu = (event) => {
        this.setState({selectedGroupsMenu: event.currentTarget});
    };

    closeSelectedGroupsMenu = () => {
        this.setState({selectedGroupsMenu: null});
    };

    render()
    {
        const { groups, searchText, selectedGroupIds, selectAllGroups, deSelectAllGroups, toggleInSelectedGroups, openEditGroupDialog, removeGroups, removeGroup} = this.props;
        const data = this.getFilteredArray(groups, searchText);
        const {selectedGroupsMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No groups found
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
                                console.log(rowInfo);
                                if ( rowInfo )
                                {
                                    openEditGroupDialog(rowInfo.original);
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
                                        event.target.checked ? selectAllGroups() : deSelectAllGroups();
                                    }}
                                    checked={selectedGroupIds.length === Object.keys(groups).length && selectedGroupIds.length > 0}
                                    indeterminate={selectedGroupIds.length !== Object.keys(groups).length && selectedGroupIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedGroupIds.includes(row.value._id)}
                                        onChange={() => toggleInSelectedGroups(row.value._id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedGroupIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedGroupsMenu ? 'selectedGroupsMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedGroupMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedGroupsMenu"
                                            anchorEl={selectedGroupsMenu}
                                            open={Boolean(selectedGroupsMenu)}
                                            onClose={this.closeSelectedGroupsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeGroups(selectedGroupIds);
                                                        this.closeSelectedGroupsMenu();
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
                            Header    : "Chama Name",
                            accessor  : "chama_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Leader Name",
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
                            Header    : "Max No. of Members",
                            accessor  : "max_members",
                            filterable: true
                        },
                        {
                            Header    : "Contribution",
                            accessor  : "contribution",
                            filterable: true
                        },
                        {
                            Header    : "Contribution Cycle",
                            accessor  : "contribution_cycle",
                            filterable: true
                        },
                        {
                            Header    : "Chama Code",
                            accessor  : "chama_code",
                            filterable: true
                        },
                        {
                            Header    : "Created At",
                            accessor  : "created_at",
                            filterable: true,
                            Cell     : row => (
                                moment(row.value).format('YYYY-MM-DD')
                            ),
                        },
                        {
                            Header: "",
                            width : 160,
                            Cell  : row => (
                                <div className="flex items-center relative" onClick={(ev)=>{
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                }}>
                                    <Link to={"/users/group/" + row.original.chama_code}>
                                        <Tooltip title="Show group members">
                                            <IconButton>
                                                <Icon>link</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Link to={"/transactions/group/" + row.original.chama_code}>
                                        <Tooltip title="Show group transaction history">
                                            <IconButton>
                                                <Icon>history</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Tooltip title="Remove">
                                        <IconButton
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                if (window.confirm('Are you sure to remove it?')) {
                                                    removeGroup(row.original._id);
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
                    noDataText="No groups found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getGroups             : Actions.getGroups,
        toggleInSelectedGroups: Actions.toggleInSelectedGroups,
        selectAllGroups       : Actions.selectAllGroups,
        deSelectAllGroups     : Actions.deSelectAllGroups,
        openEditGroupDialog   : Actions.openEditGroupDialog,
        removeGroups          : Actions.removeGroups,
        removeGroup           : Actions.removeGroup,
    }, dispatch);
}

function mapStateToProps({groupsApp})
{
    return {
        groups          : groupsApp.groups.entities,
        selectedGroupIds: groupsApp.groups.selectedGroupIds,
        searchText        : groupsApp.groups.searchText,
        user              : groupsApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsList));
