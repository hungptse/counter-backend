export const PERMISSON_NAME = {
    MANAGE_USER : 'MANAGE_USER',
    VIEW_USER : 'VIEW_USER',
}


const PERMISSION = {
    name: PERMISSON_NAME.MANAGE_USER,
    displayName: 'Manage User',
    child: [
      {
        name: PERMISSON_NAME.VIEW_USER,
        displayName: 'View User',
        child: [],
      },
    ],
}

