import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { year } = req.query;
  const username = String(req.query.username);
  const month = String(req.query.month).padStart(2, "0");

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

  // 1. get all schedulings and set a short name (S)

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
        EXTRACT(DAY FROM S.DATE) AS date,
        COUNT(S.date) AS amount,
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    
    FROM schedulings S

    LEFT JOIN user_time_interval UTI
        ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.DATE),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      HAVING amount >= size
  `;

  const blockedDates = blockedDatesRaw.map((item) => item.date);

  return res.status(201).json({ blockedWeekDays, blockedDates });
}
