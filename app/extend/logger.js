const log4js = require('log4js');
/**
 * 日志感觉
 * 外部调用 app.logger.info logger.error
 * @param app
 * @returns {*}
 */
module.exports = (app) => {
    let logger;

    if (app.env.isLocal()) {
        //打印在控制台
        logger = console;
    } else {
        // 把日志输出并落地在磁盘（日志落盘）
        log4js.configure({
            appenders: {
                console: {
                    type: 'console'
                },
                // 日志文件切分
                dataFile: {
                    type: 'dateFile',
                    filename: './logs/application.log',
                    pattern: '.yyyy-MM-dd'
                }
            },
            categories: {
                default: {
                    // 级别
                    appenders: ['console', 'dataFile'],
                    level: 'trace'
                }
            }
        });

        logger = log4js.getLogger();
    }

    return logger;
}