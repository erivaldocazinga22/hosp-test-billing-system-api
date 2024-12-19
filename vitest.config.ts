import path from "node:path";
(async () => {
    const { defineConfig } = await import("vitest/config");
    module.exports = defineConfig({
        test: {
            globals: true,
            environment: "node"
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@shared": path.resolve(__dirname, "../shared"),
            }
        }
    });
})();