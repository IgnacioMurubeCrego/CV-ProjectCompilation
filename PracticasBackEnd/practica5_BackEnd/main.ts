import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { server } from "./server.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
} catch (error) {
  console.log(error);
}

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
});

console.info(`Server is listening ${url}`);

