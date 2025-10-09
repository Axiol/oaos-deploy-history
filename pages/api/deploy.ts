import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      if (!req.query.branch || !req.query.name || !req.query.env || !req.query.site) {
        res.status(400).json({
          code: "MISSING-BODY",
          message: "Missing parameters",
        });

        return;
      }

      const client = createClient({
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
          socket: {
              host: process.env.REDIS_HOST,
              port: parseInt(process.env.REDIS_PORT || '')
          }
      });

      client.on('error', err => console.log('Redis Client Error', err));

      await client.connect();
      const deployId = await client.incr(`deploy:${req.query.site}:counter`);
      const key = `deploy:${req.query.site}:${deployId}`;

      const deploy = await client.json.set(key, '$', {
        "branch": req.query.branch,
        "name": req.query.name,
        "env": req.query.env,
        "createdAt": new Date()
      });

      res.status(deploy === "OK" ? 200 : 500).json(null)

      break;
  }
};

export default handler;
