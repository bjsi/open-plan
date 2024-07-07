export function gcalItemToRawEventDef(item: any) {
  const url = item.htmlLink || null;

  return {
    id: item.id,
    title: item.summary,
    start: item.start.dateTime || item.start.date, // try timed. will fall back to all-day
    end: item.end.dateTime || item.end.date, // same
    url,
    location: item.location,
    description: item.description,
    attachments: item.attachments || [],
    extendedProps: item.extendedProperties?.shared || {},
  };
}
