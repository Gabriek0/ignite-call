import { prisma } from "@/lib/prisma";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, username } = req.body;

  const alreadyUserExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (alreadyUserExists) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res }, "@ignitecall:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/", // path to access cookie
  });

  return res.status(201).json(user);
}
