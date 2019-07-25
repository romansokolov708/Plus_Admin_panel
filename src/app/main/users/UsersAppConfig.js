import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const UsersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users/group/:chama_code',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
        {
            path     : '/users/:id',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
        {
            path     : '/users',
            component: () => <Redirect to="/users/all"/>
        },
    ]
};
