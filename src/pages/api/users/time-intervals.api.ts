import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

import { NextAuthHandler } from "../auth/[...nextauth].api";

import * as z from "zod";
import { prisma } from "@/lib/prisma";

const intervalSchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      endTimeMinutes: z.number(),
      startTimeMinutes: z.number(),
    })
  ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, NextAuthHandler(req, res));

  if (!session) {
    return res.status(401).end();
  }

  const { intervals } = intervalSchema.parse(req.body);

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeMinutes,
          time_start_in_minutes: interval.startTimeMinutes,
          week_day: interval.weekDay,
          user_id: session.user?.id,
        },
      });
    })
  );

  return res.status(201).end();
}
