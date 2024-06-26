# open-plan
A flexible daily planner that uses Google Calendar as its backend

# Ideas
- Use FullCalendar DayView for the calendar view, can use the premium version for free if this project is FOSS
- Basic shortcuts copying from SuperMemo plan
- Use Google Calendar for the backend
- Reuse time compression code from https://github.com/bjsi/google-calendar-plan 
- Syncing with Google Calendar
    - I quickly tested webhooks, but they are a pain to set up for non-technical users and free webhook services like webhookrelay have very low usage limits
    - Google Calendar supports 1 million requests per day for free, so we could poll every second and never hit the limit.
