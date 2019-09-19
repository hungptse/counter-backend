import { hashSync, compareSync } from "bcryptjs";
async function encryptPassword(password) {
    console.log(await hashSync(password,10));    
}

async function checkPassword(check,passwordHash) {
    return await compareSync(check,passwordHash);
}
export { encryptPassword, checkPassword }