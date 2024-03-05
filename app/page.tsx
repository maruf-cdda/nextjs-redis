import { connectToRedis } from "@/lib/redis";

export default function Home() {
  const redis = connectToRedis();

  redis.then(async (redis) => {
    const data = await redis.get("bike:1");
    console.log("**", data);
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Redis</h1>
    </main>
  );
}
