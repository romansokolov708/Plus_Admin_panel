import React, {Component} from 'react';
import {MuiThemeProvider, Hidden, Icon, IconButton, Typography, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';

class SettingsHeader extends Component {

    render()
    {
        const {pageLayout, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex flex-shrink items-center sm:w-224">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">settings</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">Admin Settings</Typography>
                        </FuseAnimate>
                    </div>

                </div>

                <div className="flex flex-1 items-end justify-end pr-8 sm:px-12">
                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Button variant="contained" size="large" onClick={this.props.onSave}>
                                <SaveIcon />
                                Save
                            </Button>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

function mapStateToProps({fuse})
{
    return {
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps)(SettingsHeader);
