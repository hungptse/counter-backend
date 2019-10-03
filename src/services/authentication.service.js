const DB = require('@models');

async function loginWithUsernamePassword(req, res) {
    const body = req.body;

    console.log(body);
    res.status(200).send({ body: "123" });
}

async function getUserPermission(userId) {
    const user = await DB.User.findOne({
        attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id'],
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
