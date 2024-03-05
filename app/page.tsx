import { connectToRedis } from "@/lib/redis";

export default function Home() {
  const redis = connectToRedis();

  const json_data: any = {
    key1: "value1",
    key2: "value2",
    key3: ["item1", "item2", "item3"],
  };
  // REDIS SET DATA
  redis.then(async (redis) => {
    const res_data = await redis.set("jsondata", JSON.stringify(json_data));
  });
  // REDIS GET DATA
  redis.then(async (redis) => {
    const data: any = await redis.get("jsondata");
    console.log("**", JSON.parse(data));
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Redis</h1>
      <button className="border-2 px-3">SET DATA</button>
    </main>
  );
}
