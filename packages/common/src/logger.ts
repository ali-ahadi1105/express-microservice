import pino from "pino";

import type { Logger, LoggerOptions } from "pino";

type CreateLoggerOptions = LoggerOptions & {
  name: string;
};

export const createLogger = (options: CreateLoggerOptions): Logger => {
    const { name, ...rest } = options;
    
    if (process.env.NODE_ENV === "development") {
        return pino({
            level: process.env.LOG_LEVEL || "info",
            name,
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard"
                },
            },
            ...rest,
        });
    }

    return pino({
        level: process.env.LOG_LEVEL || "info",
        name,
        ...rest,
    });
};