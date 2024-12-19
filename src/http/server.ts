import { app as server } from "./app";
import { env } from "@/core/config/env.config";
import { runningController } from "@/core/hooks/running-controller";
import { Chalk } from "@/core/config/chalk.config";

const { PORT } = env;

server.listen(parseInt(PORT), () => {
	runningController().then(async isCanRunning => {
        const chalk = await Chalk();
        console.log(" ");
        if (!isCanRunning) {
            console.log(chalk.bold.redBright("❌ Server cannot start, shutting down."));
            return process.exit(1); 
        }
        console.log(chalk.bold.greenBright(`💥 Server running at ${chalk.underline(`http//127.0.0.1:${PORT}/`)}`));
        console.log(" ");
    });
});
