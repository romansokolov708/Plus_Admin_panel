import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
// import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {UsersAppConfig} from 'app/main/users/UsersAppConfig';
import {DashboardAppConfig} from 'app/main/dashboard/DashboardAppConfig';
import {GroupsAppConfig} from 'app/main/groups/GroupsAppConfig';
import {TransactionsAppConfig} from 'app/main/transactions/TransactionsAppConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';
import {SettingsConfig} from 'app/main/settings/SettingsConfig';

const routeConfigs = [
    UsersAppConfig,
    GroupsAppConfig,
    TransactionsAppConfig,
    LoginConfig,
    RegisterConfig,
    LogoutConfig,
    DashboardAppConfig,
    SettingsConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path        : '/',
        component   : () => <Redirect to="/dashboard"/>
    }
];

 export default routes;
