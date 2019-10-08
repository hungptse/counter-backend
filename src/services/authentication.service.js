const DB = require('@models');

async function getUserPermission(userId) {
    const user = await DB.User.findOne({
        attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id','address','email'],
        where: {
            username: userId
        }
    });
    if (!user) {
        return [null, []];
    }
    const permissionName = await DB.RolePermission.findAll({ attributes: ['permission_name'], where: { role_id: user.role_id, is_deleted: false, is_enabled: true }, raw: true });
    return [user, permissionName];
}

export {
    getUserPermission
};
