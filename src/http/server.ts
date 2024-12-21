import { app as server } from "./app";
import { env } from "@/config/env.config";
import { Chalk } from "@/config/chalk.config";

const { PORT } = env;

server.listen(parseInt(PORT), () => {
	(async () => {
        const chalk = await Chalk();
        console.log(" ");
        console.log(chalk.bold.greenBright(`💥 Server running at ${chalk.underline(`http//127.0.0.1:${PORT}/`)}`));
        console.log(" ");
    })();
});
