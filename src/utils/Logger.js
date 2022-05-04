import loglevel from "loglevel";

class Logger {

    constructor(name, defaultLevel='info') {
        this.logger = loglevel.getLogger(name);
        this.logger.setDefaultLevel(defaultLevel);
    }

    setLevel(level) {
        this.logger.setLevel(level);
    }

    trace(msg) {
        this.logger.trace(this.formatMessage(msg));
    }

    debug(msg) {
        this.logger.debug(this.formatMessage(msg));
    }

    info(msg) {
        this.logger.info(this.formatMessage(msg));
    }

    warn(msg) {
        this.logger.warn(this.formatMessage(msg));
    }

    error(msg) {
        this.logger.error(this.formatMessage(msg));
    }

    log(msg) {
        this.logger.debug(this.formatMessage(msg));
    }

    formatMessage(msg) {
        return `${(new Date()).getTime()} [${this.logger.name}] ${msg}`
    }

}

export default Logger;