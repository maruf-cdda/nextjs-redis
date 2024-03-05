export interface RedisClient {
  set(key: string, value: string): Promise<any>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<number>;
  keys(pattern: string): Promise<string[]>;
}

interface JSONData {
  [key: string]: any;
}

export class RedisUtility {
  private redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  async setData(key: string, data: JSONData): Promise<boolean> {
    try {
      await this.redis.set(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error setting data in Redis:", error);
      return false;
    }
  }

  async getData(key: string): Promise<JSONData | null> {
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting data from Redis:", error);
      return null;
    }
  }

  async deleteData(key: string): Promise<boolean> {
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      console.error("Error deleting data from Redis:", error);
      return false;
    }
  }

  async getAllData(): Promise<{ [key: string]: JSONData } | null> {
    try {
      const keys = await this.redis.keys("*");
      const data: { [key: string]: JSONData } = {};
      for (const key of keys) {
        const value = await this.redis.get(key);
        data[key] = value ? JSON.parse(value) : null;
      }
      return data;
    } catch (error) {
      console.error("Error getting all data from Redis:", error);
      return null;
    }
  }
}
