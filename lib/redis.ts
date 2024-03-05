import Redis from "ioredis";

export async function connectToRedis() {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  redis.on("error", (error: any) => {
    console.error(`❌ Failed to connect to Redis server: ${error.message}`);
  });

  redis.on("connect", () => {
    console.log("✅ Redis Connected Successfully");
  });

  return redis; // Optionally, you can return the Redis instance
}
