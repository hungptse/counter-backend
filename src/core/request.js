import { exceptionRes } from './message'
async function validatePermission(req,res, permissionName) {
    if (req["permisions"].indexOf(permissionName) !== -1) {
        res.status(200).send(exceptionRes(403, "Permission Denied", "You don't have a permission"));
        return false;
    }
    return true;
    
}
export { validatePermission } 