// 轉換為影片時間格式
export const convertSecondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  return timeFormatted;
}

export const formatDateToTaiwanStyle = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  
  return date.toLocaleString('zh-TW', options).replace(/\//g, '-').replace(',', '');
}

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

// 從yyyy-mm-dd來取得星期X
export const getDayOfWeekFromStringDate = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const daysOfWeekInChinese = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const dayNameInChinese = daysOfWeekInChinese[dayOfWeek];

  return dayNameInChinese;
};

export const removeYearFromDate = (isoString) => {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
};

// 從 數字(e.g. 9) 轉到 09:00
export const formatHour = (hour) => {
  hour = hour.toString();
  return hour.padStart(2, "0") + ":00";
};
