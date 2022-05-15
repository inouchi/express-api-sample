import Log4js from "log4js";
import config from "../../config/log4js";

Log4js.configure(config);

// console logger
const console = Log4js.getLogger();

// application logger
const application = Log4js.getLogger("application");

// access logger
const access = Log4js.getLogger("access");

export default {
  console,
  application,
  access,
};