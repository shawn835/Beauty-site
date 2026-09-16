// utils/greeting.js
export function getGreeting(
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
) {
  const hourString = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone,
  }).format(new Date());

  const currentHour = parseInt(hourString, 10);

  if (currentHour < 12) {
    return {
      text: "Good morning",
      icon: "sun",
    };
  }

  if (currentHour < 18) {
    return {
      text: "Good afternoon",
      icon: "cloud-sun",
    };
  }

  return {
    text: "Good evening",
    icon: "moon",
  };
}
