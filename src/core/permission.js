import { exceptionRes } from './message'
async function validatePermission(req,res, permissionName) {
    if (req["permissions"].indexOf(permissionName) !== -1) {
        res.status(200).send(exceptionRes(403, "Permission Denied", "You don't have a permission"));
        return false;
    }
    return true;
    
}
const PERMISSON_NAME = {
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

export { validatePermission, PERMISSON_NAME } 
