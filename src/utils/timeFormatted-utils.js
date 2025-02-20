export const convertSecondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);  
  const secs = seconds % 60; 
  
  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;
  
  return timeFormatted;
}