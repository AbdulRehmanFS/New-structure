import moment from "moment";

const handleViewCount = (list) => {
  let val = 0;
  let maxYLimit = 0;
  const output = [...list].map((doc) => {
    const obj = { name: doc.name };
    if (val || doc.view) {
      val = 1;
      obj.view = doc.view;
      maxYLimit = maxYLimit > doc.view ? maxYLimit : doc.view;
    }
    return obj;
  });
  return { output, maxYLimit };
};

export const weekYearGraphData = (type, today, data) => {
  const next = [];
  const previous = [];
  type?.forEach((name, index) => {
    let count = 0;
    data?.forEach((doc) => {
      if (doc._id - 1 === index) count = doc.count;
    });
    const object = { name, view: count };
    if (today < index + 1) next.push(object);
    else previous.push(object);
  });
  const { output, maxYLimit } = handleViewCount([...next, ...previous]);
  return { output, maxYLimit };
};

export const DayGraphData = (timeIntervals, current, data) => {
  const prev = [];
  const next = [];
  const currentDate = moment().date();
  timeIntervals.forEach((limit) => {
    let obj = {};
    let total = 0;
    data?.forEach((list) => {
      const date = parseInt(list?.dateAndMonth?.split("/")[0], 10);
      if (limit === list._id && date === currentDate) total += list.count;
      else if (limit === list._id && date !== currentDate && current !== list._id)
        total += list.count;
    });
    obj = {
      name: limit,
      view: total
    };
    if (current < limit) next.push(obj);
    else prev.push(obj);
  });
  const { output, maxYLimit } = handleViewCount([...next, ...prev]);
  return { output, maxYLimit };
};
export const DayGraphData2 = (timeIntervals, current, data) => {
  const prev = [];
  const next = [];
  const currentDate = moment().date();
  timeIntervals.forEach((limit) => {
    let obj = {};
    let total = 0;
    data?.forEach((list) => {
      const date = parseInt(list?.date?.split("/")[0], 10);
      if (limit === list._id && date === currentDate) total += list.count;
      else if (
        // used to reject the current time views of previous month if exist
        limit === list._id &&
        date !== currentDate &&
        current !== list._id
      )
        total += list.count;
    });
    obj = {
      name: limit,
      view: total
    };
    if (current < limit) next.push(obj);
    else prev.push(obj);
  });
  const { output, maxYLimit } = handleViewCount([...next, ...prev]);
  return { output, maxYLimit };
};

const getIntervals = (limit, gap) => {
  const range = [];
  let min = 0;
  for (let i = min; i < limit; i += gap) {
    min += gap;
    range.push(min);
  }
  return [...range];
};

export const getDateGraph = (todayDate, currentMonth, data, intervalgap = 1) => {
  const prev = [];
  const next = [];
  const preMonthLimit = moment().subtract(1, "months").endOf("month").date();
  const currentMonthLimit = moment().endOf("month").date();
  const maxlimit =
    todayDate === currentMonthLimit // if today is month end then only current month data is used
      ? currentMonthLimit
      : preMonthLimit > todayDate // if previous month is feb and today is 29/30-march then max limit is today date
        ? preMonthLimit
        : todayDate;
  const dateInterval = getIntervals(maxlimit, intervalgap);
  dateInterval?.forEach((limit) => {
    let total = 0;
    let obj = {};
    data?.forEach((list) => {
      const month = parseInt(list?.dateAndMonth?.split("/")[1], 10);
      const date = parseInt(list?.dateAndMonth?.split("/")[0], 10);
      if (limit === list._id && month === currentMonth) total += list.count;
      else if (
        // this condition is used to reject object if same date of current month exist in previous month
        limit === list._id &&
        month !== currentMonth &&
        date !== todayDate
      )
        total += list.count;
    });
    obj = {
      name: limit,
      view: total
    };
    if (todayDate < limit) next.push(obj);
    else prev.push(obj);
  });
  const { output, maxYLimit } = handleViewCount([...next, ...prev]);
  return { output, maxYLimit };
};

export const getHrMinSec = (duration) => {
  let contentDuration = "0 min 0 sec";
  const time = parseInt(duration, 10) ?? 0;
  if (time >= 60) {
    const hrs = parseInt(time / 3600, 10);
    const rem = time % 3600;
    if (hrs >= 1)
      contentDuration = `${hrs} hr ${parseInt(rem / 60, 10)} min ${parseInt(rem % 60, 10)} sec`;
    else contentDuration = `${parseInt(time / 60, 10)} min ${time % 60} sec`;
  } else contentDuration = `${0} min ${time} sec`;
  return contentDuration;
};

export function secToHourMinuteSec(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = Math.floor((seconds % 3600) % 60);
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${second < 10 ? "0" : ""}${second}`;
}

