export const convertISODate = (ISODate: string) => {
  const date = new Date(ISODate);
  return `
  ${date.getDate()}
  ${date.toLocaleString("default", { month: "long" })}
  ${date.getFullYear()}`;
};

export const isEntryAddedBefore = (list: { date: string }[], entry: { date: string }) => {
  const dates = list.map(single => convertISODate(single.date));
  return dates.includes(convertISODate(entry.date));
};

export const sortListByDate = (list: any) => {
  return list.slice().sort((a: any, b: any) => {
    if (new Date(a.date) > new Date(b.date)) return -1;
    if (new Date(a.date) < new Date(b.date)) return 1;
    return 0;
  });
};
