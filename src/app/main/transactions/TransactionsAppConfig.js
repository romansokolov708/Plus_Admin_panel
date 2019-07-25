import {FuseLoadable} from '@fuse';

export const TransactionsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/transactions/group/:chama_code',
            component: FuseLoadable({
                loader: () => import('./TransactionsApp')
            })
        },
        {
            path     : '/transactions/user/:id',
            component: FuseLoadable({
                loader: () => import('./TransactionsApp')
            })
        },
        {
            path     : '/transactions',
            component: FuseLoadable({
                loader: () => import('./TransactionsApp')
            })
        }
    ]
};
