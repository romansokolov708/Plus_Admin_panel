import React, {Component} from 'react';
import {FuseUtils} from '@fuse';
import {withStyles, Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment/moment.js';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
        padding: 12,
        margin: 4,
      },
      table: {
        minWidth: 650,
    },
});

class TransactionsList extends Component {

    state = {
        rowsPerPage: 10,
        page: 0,
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value});
    }

    render()
    {
        const {classes, searchText} = this.props;
        const {rowsPerPage, page} = this.state;
        const data = this.getFilteredArray(this.props.data, searchText);

        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Chama Code</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Created At</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.slice(rowsPerPage * page, rowsPerPage * (page + 1)).map(row => (
                            <TableRow key={row.user_name}>
                                <TableCell component="th" scope="row">
                                    {row.user_name}
                                </TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.chama_code}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.currency}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{moment(row.created_at).format('YYYY-MM-DD hh:mm')}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    {data.length === 0 &&
                        <Typography variant="h6" style={{marginTop: 20, marginBottom: 20}}>Cannot find any transaction history.</Typography>
                    }
                    {data.length > 0 && 
                        <TablePagination
                            rowsPerPageOptions={[10, 50, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                            'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                            'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    }
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(TransactionsList);
