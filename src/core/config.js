
const env = process.env.NODE_ENV || 'development';

const CONFIG = require(`${__dirname.split("core")[0]}config/${env}.json`);
export default CONFIG;