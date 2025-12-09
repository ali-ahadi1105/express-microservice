import { createApp } from "@/app";
import { createServer } from "http";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

export const main = async () => {
    try {
        const app = createApp();
        const server = createServer(app);

        const port = env.AUTH_SERVICE_PORT;

        server.listen(port, () => {
            logger.info({ port }, "Auth service is running...");
        });

    } catch (error) {
        
    }
};

main();