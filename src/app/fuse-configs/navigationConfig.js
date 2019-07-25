const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : '',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'dashboard',
                'title': 'Dashboard',
                'type' : 'item',
                'icon' : 'dashboard',
                'url'  : '/dashboard'
            },
            {
                'id'   : 'groups-component',
                'title': 'Group Management',
                'type' : 'item',
                'icon' : 'group',
                'url'  : '/groups'
            },
            {
                'id'   : 'users-component',
                'title': 'User Management',
                'type' : 'item',
                'icon' : 'supervised_user_circle',
                'url'  : '/users'
            },
            {
                'id'   : 'transaction',
                'title': 'Transactions',
                'type' : 'item',
                'icon' : 'list_alt',
                'url'  : '/transactions'
            },
        ]
    }
];

export default navigationConfig;
