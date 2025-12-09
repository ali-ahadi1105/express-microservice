import { createApp } from "@/app";
import { createServer } from "http";

export const main = async () => {
    try {
        const app = createApp();
        const server = createServer(app);

        

    } catch (error) {
        
    }
};

main();