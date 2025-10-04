const APP_NAME = "Community App";
const APP_VERSION = "1.0";
const APP_DESCRIPTION = "API documentation for Community App";

const ENVIRONMENT = "dev";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

export default {
  app: {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    version: APP_VERSION,
    host: HOST,
    env: ENVIRONMENT,
    port: PORT,
  },
  cors: {
    options: {
      origin: "",
      credentials: "",
    },
  },
  rateLimiter: {
    options: {
      windowMs: 15 * 60 * 1000,
      max: 2000,
      message:
        "Too many requests from this IP, please try again after 15 minutes.",
    },
  },
  postgresql: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dbName: process.env.POSTGRES_DB_NAME,
    url:
      process.env.POSTGRES_URL || "postgresql://localhost:5432/community_app",
    options: {},
  },
  mongo: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    dbName: process.env.MONGODB_DB_NAME,
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/community_app",
    options: {
      serverSelectionTimeoutMS: 5000,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_URL || "redis://localhost:6379",
    options: {
      // tls: {}, // Uncomment this line to enable TLS
      connectTimeout: 10000,
    },
  },
  jwt: {
    moduleOptions: {
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    },
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    saltRounds: process.env.SALT_ROUNDS || 8,
  },
};
