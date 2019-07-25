import React, {Component} from 'react';
import {MuiThemeProvider, Icon, Input, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';

class TransactionsHeader extends Component {

    render()
    {
        const {mainTheme, data, searchText, setSearchText} = this.props;
        var title = "All transactions";
        if (data.id !== undefined) {
            title = "User transactions";
        }
        else if (data.chama_code !== undefined) {
            title = "Group transactions";
        }

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">list_alt</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">{title}</Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}


function mapStateToProps({groupsApp, fuse})
{
    return {
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps)(TransactionsHeader);
