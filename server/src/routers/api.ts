import { calendar, calendar_v3 } from "@googleapis/calendar";
import { router, publicProcedure } from "../lib/trpc";
import { z } from "zod";
import { getGoogleAuthClientOrAuthenticate } from "../lib/googleAuthClient";

export const apiRouter = router({
  createEvent: publicProcedure
    .input(
      z.object({
        summary: z.string(),
        description: z.string().optional(),
        start: z.coerce.date(),
        end: z.coerce.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = {
        summary: input.summary,
        description: input.description,
        start: {
          dateTime: input.start.toISOString(),
        },
        end: {
          dateTime: input.end.toISOString(),
        },
      };
      const auth = await getGoogleAuthClientOrAuthenticate();
      if (!auth) {
        return;
      }
      const res = await calendar("v3").events.insert({
        calendarId: "primary",
        requestBody: event,
        auth,
      });
    }),
  listTodaysEvents: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const auth = await getGoogleAuthClientOrAuthenticate();
      if (!auth) {
        return;
      }
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(0, 0, 0, 0);
      endOfDay.setDate(endOfDay.getDate() + 1);
      const opts = {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        showDeleted: false,
      };

      const res = await calendar("v3").events.list({
        calendarId: "primary",
        ...opts,
        auth,
      });
      return res.data.items;
    }),
});
