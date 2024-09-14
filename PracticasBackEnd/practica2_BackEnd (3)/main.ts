// @ts-ignore : import error.
import express from "express";
import mongoose from "mongoose";
import getTardis from "./resolvers/getTardis.ts";
import postTardis from "./resolvers/postTardis.ts";
import updateTardis from "./resolvers/updateTardis.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  console.log("You need to define 'MONGO_URL' in '.env' file.");
  throw new Error("Mongo environment variable is required but not provided.");
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Connected with Mongo.");
}catch(e){
  console.log(e);
}

const app = express();
app.use(express.json());

app
.post("/api/tardis", postTardis)
.get("/api/tardis/:id", getTardis )
.put("/api/tardis/:id", updateTardis);

app.listen(3000 , () => {
  console.log("Server running in port 3000.")
});


