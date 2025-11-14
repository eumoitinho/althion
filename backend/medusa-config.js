const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
    database_url: process.env.DATABASE_URL || "postgres://medusa_user:medusa_password@localhost:5432/medusa_db",
    database_type: "postgres",
    store_cors: process.env.STORE_CORS || "http://localhost:3000,http://localhost:8000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:7000",
    redis_url: process.env.REDIS_URL || "redis://localhost:6379",
    port: parseInt(process.env.PORT || "9000", 10),
  },
  plugins,
};
