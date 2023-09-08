type ReturnTimeType = "time" | "date" | "dialog";

export function getNormalTime(time: string, type: ReturnTimeType) {
  const date = new Date(time);

  switch (type) {
    case "time":
      return getOnlyTime(date);
  
    case "date":
      return getOnlyDate(date);
    
    case "dialog":
      const now = new Date();

      if (now.getDate() !== date.getDate() || now.getMonth() !== date.getMonth() || now.getFullYear() !== date.getFullYear()) return getOnlyDate(date);
      else return getOnlyTime(date); 
    
    default:
      return "";
  }
}

function getOnlyTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function getOnlyDate(date: Date) {
  const fulldate = date.toLocaleDateString('en-EN', { day: 'numeric', month: "short", year: 'numeric' });
  return fulldate;
}