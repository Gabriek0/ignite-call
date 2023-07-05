import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { NextAuthHandler } from "../auth/[...nextauth].api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, NextAuthHandler(req, res));

  return res.json({
    session: session,
  });
}
