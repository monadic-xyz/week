export const getWeek = date => {
  const time = new Date(date.getTime());

  time.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  time.setDate(time.getDate() + 3 - ((time.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(time.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from time to week1.
  return (
    1 +
    Math.round(
      ((time.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
};
