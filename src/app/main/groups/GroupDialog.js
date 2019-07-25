import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, MenuItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const newGroupState = {
    chama_name: '',
    user_name: '',
    phone   : '',
    password: '123456',
    role: '',
    avatar  : '',
    max_members: 0,
    contribution: 0,
    contribution_cycle: '',
    emergency_fund: 0,
    my_saving: 0,
    merry_go_round: 0,  
};

class GroupDialog extends Component {

    state = {...newGroupState};

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.groupDialog.props.open && this.props.groupDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.groupDialog.type === 'edit' &&
                this.props.groupDialog.data &&
                !_.isEqual(this.props.groupDialog.data, prevState) )
            {
                this.setState({...this.props.groupDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.groupDialog.type === 'new' &&
                !_.isEqual(newGroupState, prevState) )
            {
                this.setState({...newGroupState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.groupDialog.type === 'edit' ? this.props.closeEditGroupDialog() : this.props.closeNewGroupDialog();
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
        const {groupDialog, addGroup, updateGroup, removeGroup} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...groupDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {groupDialog.type === 'new' ? 'New Group' : 'Edit Group'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar
                            className="w-96 h-96"
                            alt="user avatar"
                            src={this.state.avatar && this.state.avatar}
                        />
                        {groupDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.user_name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_box</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Chama Name
                        </Typography>

                        <TextField
                            className="mb-24"
                            label="Chama Name"
                            autoFocus
                            id="chama_name"
                            name="chama_name"
                            value={this.state.chama_name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

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
                            <Icon color="action">phone</Icon>
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
                            <Icon color="action">airline_seat_recline_normal</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Max No. of Members
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="max_members"
                            name="max_members"
                            label="Max No. of Members"
                            type="number"
                            value={this.state.max_members}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">import_contacts</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160">
                                Each member Contribution in KES
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="contribution"
                            name="contribution"
                            label="Each member Contribution in KES"
                            type="number"
                            value={this.state.contribution}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">accessibility</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Contribution Cycle
                        </Typography>
                        <Select
                            className="mb-24 text-left"
                            value={this.state.contribution_cycle}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                                name="contribution_cycle"
                                labelWidth={0}
                                id="contribution_cycle"
                            />
                            }
                            fullWidth
                        >
                            <MenuItem value="1 week">1 week</MenuItem>
                            <MenuItem value="2 weeks">2 weeks</MenuItem>
                            <MenuItem value="3 weeks">3 weeks</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                        </Select>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">monetization_on</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Emergency Fund
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="emergency_fund"
                            name="emergency_fund"
                            label="Emergency Fund (%)"
                            type="number"
                            value={this.state.emergency_fund}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">save</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                3x My Saving
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="my_saving"
                            name="my_saving"
                            label="3x My Saving (%)"
                            type="number"
                            value={this.state.my_saving}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">money</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Merry Go Round
                        </Typography>
                        <TextField
                            className="mb-24"
                            id="merry_go_round"
                            name="merry_go_round"
                            label="Merry Go Round (%)"
                            type="number"
                            value={this.state.merry_go_round}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {groupDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addGroup(this.state);
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
                                updateGroup(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete it?')) {
                                    removeGroup(this.state._id);
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
        closeEditGroupDialog: Actions.closeEditGroupDialog,
        closeNewGroupDialog : Actions.closeNewGroupDialog,
        addGroup            : Actions.addGroup,
        updateGroup         : Actions.updateGroup,
        removeGroup         : Actions.removeGroup
    }, dispatch);
}

function mapStateToProps({groupsApp})
{
    return {
        groupDialog: groupsApp.groups.groupDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupDialog);
