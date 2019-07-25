import {FuseLoadable} from '@fuse';

export const GroupsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/groups',
            component: FuseLoadable({
                loader: () => import('./GroupsApp')
            })
        }
    ]
};
