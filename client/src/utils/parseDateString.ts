interface UseTimeReturn {
  seconds: string;
  minutes: string;
  hours: string;
  meridiemHours: { value: number; type: string };
  day: string;
  month: string;
  year: number;
  timestamp: number;
}

function dateValueWithStartZero(value: number) {
  return value < 10 ? "0" + value : String(value);
}

export function parseDateString(dateString: string): UseTimeReturn {
  // Создаем объект Date из строки
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Получаем компоненты даты и времени
  const seconds = date.getUTCSeconds();
  const minutes = date.getUTCMinutes();
  const hours = date.getUTCHours();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Месяцы начинаются с 0
  const year = date.getUTCFullYear();
  const timestamp = date.getTime();

  // Рассчитываем часы в формате 12 часов
  const meridiemHoursValue = hours % 12 === 0 ? 12 : hours % 12;
  const meridiemType = hours >= 12 ? "PM" : "AM";

  return {
    seconds: dateValueWithStartZero(seconds),
    minutes: dateValueWithStartZero(minutes),
    hours: dateValueWithStartZero(hours),
    meridiemHours: {
      value: meridiemHoursValue,
      type: meridiemType
    },
    day: dateValueWithStartZero(day),
    month: dateValueWithStartZero(month),
    year,
    timestamp
  };
}
