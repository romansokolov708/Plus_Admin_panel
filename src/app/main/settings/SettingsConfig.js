import {FuseLoadable} from '@fuse';

export const SettingsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/settings',
            component: FuseLoadable({
                loader: () => import('./Settings')
            })
        },
    ]
};
