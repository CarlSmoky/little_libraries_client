

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function timestampIsFresh(timestamp) {
  const tsDate = new Date(timestamp);
  const tsDatePlusOne = addDays(tsDate, 1);
  const now = new Date();
  return now < tsDatePlusOne;
}

export { timestampIsFresh }
