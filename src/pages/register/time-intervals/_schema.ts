import * as z from "zod";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";

// ZOD SCHEMA
export const TimeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana.",
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeMinutes: convertTimeStringToMinutes(interval.endTime),
      }))
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeMinutes - 60 >= interval.startTimeMinutes
        ),
      {
        message:
          "O horário de término deve ter a diferença de pelo menos 1h do de ínicio.",
      }
    ),
});

// TYPES
export type TimeIntervalsInput = z.input<typeof TimeIntervalsSchema>;
export type TimeIntervalsOutput = z.output<typeof TimeIntervalsSchema>;

export default function Default() {
  return {};
}
