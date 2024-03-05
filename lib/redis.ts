import Redis, { RedisOptions } from "ioredis";

export async function connectToRedis() {
  const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
  };

  const redis = new Redis(redisOptions);

  redis.on("error", (error: any) => {
    console.error(`Failed to connect to Redis server: ${error.message}`);
  });

  redis.on("connect", () => {
    console.log("Redis Connected Successfully");
  });

  return redis;
}
