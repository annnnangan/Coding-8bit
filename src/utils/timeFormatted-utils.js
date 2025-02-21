// 轉換為影片時間格式
export const convertSecondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);  
  const secs = seconds % 60; 
  
  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;
  
  return timeFormatted;
}

// 轉換為 yyyy/mm/dd 格式
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}