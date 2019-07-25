import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import GroupsList from './GroupsList';
import GroupsHeader from './GroupsHeader';
import GroupDialog from './GroupDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class GroupsApp extends Component {

    componentDidMount()
    {
        this.props.getGroups();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getGroups();
        }
    }

    render()
    {
        const {classes, openNewGroupDialog} = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <GroupsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <GroupsList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewGroupDialog}
                    >
                        <Icon>person_add</Icon>
                    </Fab>
                </FuseAnimate>
                <GroupDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getGroups         : Actions.getGroups,
        openNewGroupDialog: Actions.openNewGroupDialog
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

export default withReducer('groupsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupsApp))));
