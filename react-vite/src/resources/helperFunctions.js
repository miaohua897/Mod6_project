export const calculateDuration = (arr) => {
    let minutes = 0;
    let seconds = 0;
    let hours = 0;
  
    arr.forEach((songObj) => {
      const [songMinutes, songSeconds] = songObj.duration.split(":").map(Number);
      minutes += songMinutes;
      seconds += songSeconds;
    });
  
    if (seconds > 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
  
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
  
    if (minutes < 10) minutes = `0${minutes}`;
  
    if (seconds < 10) seconds = `0${seconds}`;
  
    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };