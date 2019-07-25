import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, MenuItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const newUserState = {
    user_name: '',
    phone   : '',
    password: '123456',
    role: '',
    avatar  : '',
    account_status: '',
    chama_code: '',
};

class UserDialog extends Component {

    state = {...newUserState};

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.userDialog.props.open && this.props.userDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.userDialog.type === 'edit' &&
                this.props.userDialog.data &&
                !_.isEqual(this.props.userDialog.data, prevState) )
            {
                this.setState({...this.props.userDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.userDialog.type === 'new' &&
                !_.isEqual(newUserState, prevState) )
            {
                this.setState({...newUserState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.userDialog.type === 'edit' ? this.props.closeEditUserDialog() : this.props.closeNewUserDialog();
    };

    canBeSubmitted()
    {
        const {user_name} = this.state;
        return (
            user_name.length > 0
        );
    }

    render()
    {
        const {userDialog, addUser, updateUser, removeUser} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...userDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {userDialog.type === 'new' ? 'New User' : 'Edit User'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar
                            className="w-96 h-96"
                            alt="user avatar"
                            src={this.state.avatar && this.state.avatar}
                        />
                        {userDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.user_name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                User Name
                        </Typography>

                        <TextField
                            className="mb-24"
                            label="User Name"
                            autoFocus
                            id="user_name"
                            name="user_name"
                            value={this.state.user_name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">email</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Phone
                        </Typography>
                        <TextField
                            className="mb-24"
                            label="Phone"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">accessibility</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Role
                        </Typography>
                        <Select
                            className="mb-24 text-left"
                            value={this.state.role}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                                name="role"
                                labelWidth={0}
                                id="role"
                            />
                            }
                            fullWidth
                        >
                            <MenuItem value="Secretary">Secretary</MenuItem>
                            <MenuItem value="Treasure">Treasure</MenuItem>
                            <MenuItem value="Member">Member</MenuItem>
                        </Select>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">accessible</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Account Status
                        </Typography>
                        <Select
                            className="mb-24 text-left"
                            value={this.state.account_status}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                                name="account_status"
                                labelWidth={0}
                                id="account_status"
                            />
                            }
                            fullWidth
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Suspend">Suspend</MenuItem>
                            <MenuItem value="Remove">Remove</MenuItem>
                        </Select>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">code</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Chama Code
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="chama_code"
                            name="chama_code"
                            label="Chama Code"
                            value={this.state.chama_code}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {userDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addUser(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateUser(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete it?')) {
                                    removeUser(this.state._id);
                                    this.closeComposeDialog();
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditUserDialog: Actions.closeEditUserDialog,
        closeNewUserDialog : Actions.closeNewUserDialog,
        addUser            : Actions.addUser,
        updateUser         : Actions.updateUser,
        removeUser         : Actions.removeUser
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        userDialog: usersApp.users.userDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
