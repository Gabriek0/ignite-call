import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const date = String(req.query.date);
  // http://localhost:3000/api/users/[username]/availability?date=2023-07-23

  if (!username) {
    return res.status(400).json({
      message: "Username not specified",
    });
  }

  if (!date) {
    return res.status(400).json({
      message: "Date is not specified",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const referenceDate = dayjs(date);
  const weekDay = referenceDate.get("day");
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({ availability: [] });
  }

  //Cross between TimerInterval and Schedulings
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: weekDay,
    },
  });

  if (!userAvailability) {
    return res.json({ availability: [] });
  }

  const { time_end_in_minutes, time_start_in_minutes } = userAvailability;

  const startHour = time_start_in_minutes / 60; // 10:
  const endHour = time_end_in_minutes / 60; // 18

  // endHour - startHour = array length

  const possibleTimes = Array.from(
    { length: endHour - startHour },
    (_, index) => startHour + index
  );

  return res.status(201).json({
    availability: possibleTimes,
  });
}
