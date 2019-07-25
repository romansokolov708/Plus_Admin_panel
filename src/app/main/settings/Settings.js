import React, {Component} from 'react'
import {withStyles} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SettingsHeader from './SettingsHeader';
import SettingsContent from './SettingsContent';
import api from 'app/ApiConfig';
import {message} from 'antd';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});

class Settings extends Component {

    state = {
        accountData: []
    };

    componentDidMount() {
        if (this.props.user.user_name) {
            api.post('/auth/getAccountByUserId', {userId: this.props.user.user_name}).then((res) => {
                this.setState({accountData: res.data.doc});
            })
        }
    }

    handleSave = () => {
        api.post('/auth/updateAccount', {account: this.state.accountData}).then(() => {
            message.success('Admin settings are successfully saved.');
        }).catch((error) => {
            console.log(error);
            message.error('Update admin settings is failed.');
        })
    }

    handleChange = (ev) => {
        var {accountData} = this.state;
        accountData[ev.target.id] = ev.target.value;
        this.setState({accountData});
    }

    render()
    {
        const {accountData} = this.state;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <SettingsHeader pageLayout={() => this.pageLayout} onSave={this.handleSave}/>
                    }
                    content={
                        <SettingsContent data={accountData} onChange={this.handleChange}/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    }
}

function mapStateToProps({auth})
{
    return {
        user              : auth.user
    }
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(withRouter(Settings)));
