import {FuseLoadable} from '@fuse';

export const DashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: FuseLoadable({
                loader: () => import('./DashboardApp')
            })
        },
    ]
};
