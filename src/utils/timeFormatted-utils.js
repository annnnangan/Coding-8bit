/* ------------------------------- Format Video Duration ------------------------------ */

// 轉換為影片時間格式
export const convertSecondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const timeFormatted = `${mins}:${secs.toString().padStart(2, "0")}`;

  return timeFormatted;
};

/* ------------------------------- Format Date ------------------------------ */
export const formatDateToTaiwanStyle = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("zh-TW", options).replace(/\//g, "-").replace(",", "");
};

// 轉換為 yyyy/mm/dd 格式
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// 轉換為 yyyy-mm-dd 格式
export const formatDateDash = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const daysOfWeekInChinese = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
// 從yyyy-mm-dd來取得星期X
export const getDayOfWeekFromStringDate = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const dayNameInChinese = daysOfWeekInChinese[dayOfWeek];

  return dayNameInChinese;
};

export const removeYearFromDate = (isoString) => {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
};

/* ------------------------------- Format Time ------------------------------ */

// 從 數字(e.g. 9) 轉到 09:00
export const formatHour = (hour) => {
  hour = hour.toString();
  return hour.padStart(2, "0") + ":00";
};

// Convert decimal number (e.g. 1536) to binary (e.g. 1100000000 ) to timeslot array (e.g. [10, 11])
// e.g. 32768 -> 1000000000000000 -> [15]
// e.g. 17920 -> 100011000000000 -> [9,10,14]
export const convertDecimalTimeslotsToArray = (number) => {
  const binaryString = number.toString(2);
  const timeslotsArray = [];
  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[binaryString.length - 1 - i] === "1") {
      timeslotsArray.push(i);
    }
  }

  return timeslotsArray;
};
