import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      if (!req.query.branch || !req.query.name || !req.query.env) {
        res.status(400).json({
          code: "MISSING-BODY",
          message: "Missing parameters",
        });

        return;
      }

      await fetch(`${process.env.SUPABASE_BASE_URL}/Deploy`, {
        method: "POST",
        body: JSON.stringify({
          branch: req.query.branch,
          name: req.query.name,
          env: req.query.env,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_ANON_KEY ?? "",
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
      }).then((r) => {
        res.status(r.status).json(null);
      });

      break;
  }
};

export default handler;
