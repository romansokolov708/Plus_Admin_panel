import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import _ from '@lodash';
import TransactionsList from './TransactionsList';
import TransactionsHeader from './TransactionsHeader';
import api from 'app/ApiConfig.js';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class TransactionsApp extends Component {

    state = {
        data: [],
        searchText: '',
    }

    componentDidMount()
    {
        this.getTransactions(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.getTransactions(this.props.match.params);
        }
    }

    getTransactions = (params) => {
        var apiUrl = '/transactions/getAllTransactions';
        var chama_code = null;
        var user_id = null;
        if (params.id !== undefined) {
            apiUrl = '/transactions/getTransactionsByUserId';
            user_id = params.id;
        }
        else if (params.chama_code !== undefined) {
            apiUrl = '/transactions/getProfileByGroup';
            chama_code = params.chama_code;
        }

        api.post(apiUrl, {chama_code, user_id}).then((res) => {
            this.setState({data: res.data.doc})
        })
    }

    setSearchText = (ev) => {
        this.setState({searchText: ev.target.value})
    }

    render()
    {
        const {data, searchText} = this.state;
        const params = this.props.match.params;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <TransactionsHeader pageLayout={() => this.pageLayout} data={params} searchText={searchText} setSearchText={this.setSearchText}/>
                    }
                    content={
                        <TransactionsList data={data} searchText={searchText}/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

export default withStyles(styles, {withTheme: true})(TransactionsApp);
