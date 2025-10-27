import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/redis";

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

      const deployId = await client.incr(`deploy:${req.query.site}:${req.query.env}:counter`);
      const key = `deploy:${req.query.site}:${req.query.env}:${deployId}`;

      const deploy = await client.json.set(key, '$', {
        "branch": req.query.branch,
        "name": req.query.name,
        "createdAt": new Date()
      });

      res.status(deploy === "OK" ? 200 : 500).json(null)

      break;
  }
};

export default handler;
