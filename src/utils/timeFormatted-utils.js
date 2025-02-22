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
