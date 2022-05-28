

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

function formatDateFromSQL(sqlTimestamp) {
  const date = new Date(sqlTimestamp);
  const dateDisplay = num => {
    return num < 10 ? '0' + num : num;
  }
  const month = dateDisplay(date.getMonth() + 1);
  const day = dateDisplay(date.getDate());
  const hour = dateDisplay(date.getHours());
  const min = dateDisplay(date.getMinutes());

  return `${date.getFullYear()}/${month}/${day} ${hour}:${min}`;
}

export { timestampIsFresh, formatDateFromSQL };
