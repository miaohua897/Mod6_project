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
  
    if (hours && minutes < 10) minutes = `0${minutes}`;
  
    if (seconds < 10) seconds = `0${seconds}`;
  
    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };

  export function isValidURL(string) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" + // Protocol
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // Domain name
        "localhost|" + // Localhost
        "\\d{1,3}(\\.\\d{1,3}){3})" + // OR IPv4
        "(\\:\\d+)?(\\/.*)?$", // Optional port and path
      "i"
    );
    return urlPattern.test(string);
  }