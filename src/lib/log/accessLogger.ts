import Log4js from "log4js";
import logger from "./logger";

const DEFAULT_LOG_LEVEL = "auto";

export default (level?: string) => {
  const options = { level: level || DEFAULT_LOG_LEVEL };
  return Log4js.connectLogger(logger.access, options);
};