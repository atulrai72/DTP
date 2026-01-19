import Redis from "ioredis";


// import * as dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.resolve(__dirname, "../../../.env") }); 

// const redisUrl = process.env.EDIS_DATABASE_URI;

// if (!redisUrl) {
//     throw new Error("REDIS_URL is missing. Check your root .env file.");
// }

export const redis = new Redis("rediss://default:AZqHAAIncDJiYWZkNzcxYThhNDE0MzMxOTMxODViOTgyZTBhMzc2MXAyMzk1NTk@sterling-insect-39559.upstash.io:6379");


