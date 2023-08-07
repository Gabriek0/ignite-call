import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { month, year } = req.query;
  const username = String(req.query.username);

  if (!username) {
    return res.status(400).json({
      message: "Username not specified",
    });
  }

  if (!month || !year) {
    return res.status(400).json({
      message: "Month or year no specified.",
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

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      week_day: true,
    },
  });

  const weekDays = Array.from({ length: 7 }, (_, index) => index);

  const blockedWeekDays = weekDays.filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay
      )
  );

  // QUERY TO CHECK BLOCKED DATES WITH ONE OPERATION
  // SEG -> [8, 9, 10] -> [8, 9] -> true
  // TER -> [8, 9, 10] -> [8, 9, 10] -> false

  const blockedDatesRaw = await prisma.$queryRaw`
    SELECT * 
    FROM schedulings S

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  `;

  return res.status(201).json({ blockedWeekDays, blockedDatesRaw });
}
