import React, {Component} from 'react'
import {withStyles, Typography, Grid, TextField} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '95%',
        maxWidth: 512,
        margin: 'auto',
        padding: 8
    }
});

class SettingsContent extends Component {

    state = {
    };


    render()
    {
        const {classes} = this.props;
        return (
            <FuseAnimate>
                <div className={classes.root}>
                    <Grid container spacing={8} alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant="h6">Transaction Fee (%)</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="transaction_fee"
                                label="Required"
                                type="number"
                                value={this.props.data.transaction_fee === undefined ? 0 : this.props.data.transaction_fee}
                                margin="normal"
                                variant="outlined"
                                onChange={this.props.onChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">Interest Rate (%)</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="interest_rate"
                                label="Required"
                                type="number"
                                value={this.props.data.interest_rate === undefined ? 0 : this.props.data.interest_rate}
                                margin="normal"
                                variant="outlined"
                                onChange={this.props.onChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </FuseAnimate>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(SettingsContent));
