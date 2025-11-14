const express = require("express");
const { GracefulShutdownServer } = require("medusa-core-utils");

(async () => {
  async function start() {
    const app = express();
    const directory = process.cwd();

    try {
      // Ensure payment providers exist before loading Medusa
      const { DataSource } = require("typeorm");
      const config = require("./medusa-config.js");
      
      const tempDataSource = new DataSource({
        type: "postgres",
        url: config.projectConfig.database_url,
      });
      
      try {
        await tempDataSource.initialize();
        const queryRunner = tempDataSource.createQueryRunner();
        await queryRunner.connect();
        
        // Ensure manual payment provider exists
        const existingProvider = await queryRunner.query(
          "SELECT id FROM payment_provider WHERE id = 'manual'"
        );
        
        if (existingProvider.length === 0) {
          await queryRunner.query(`
            INSERT INTO payment_provider (id, is_installed)
            VALUES ('manual', true)
            ON CONFLICT (id) DO NOTHING
          `);
        }
        
        await queryRunner.release();
        await tempDataSource.destroy();
      } catch (error) {
        console.warn("⚠️  Warning: Could not ensure payment providers exist:", error.message);
      }

      // Now load Medusa
      const { container } = await require("@medusajs/medusa/dist/loaders")
        .default({
          directory,
          expressApp: app,
        });

      const configModule = container.resolve("configModule");
      const port = configModule.projectConfig.port ?? 9000;

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return;
          }
          console.log(`✅ Medusa server is listening on port: ${port}`);
          console.log(`📱 Admin: http://localhost:${port}/app`);
          console.log(`🛒 Store API: http://localhost:${port}/store`);
          console.log(`⚙️  Admin API: http://localhost:${port}/admin`);
        })
      );

      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.");
            process.exit(0);
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e);
            process.exit(1);
          });
      };

      process.on("SIGTERM", gracefulShutDown);
      process.on("SIGINT", gracefulShutDown);
    } catch (err) {
      console.error("❌ Error starting server:", err.message);
      if (err.stack) {
        console.error(err.stack);
      }
      process.exit(1);
    }
  }

  await start();
})();
