// Utility function (keeps calculations modular)
const calculatePercentageChange = (current, previous) => {
  const currentNum = Number(current);
  const previousNum = Number(previous);

  if (previousNum === 0) return currentNum > 0 ? "+100%" : "0%"; // Avoid division by zero

  const change = ((currentNum - previousNum) / previousNum) * 100;
  return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
};

//Last Month Bookings Count
const getLastMonthBookings = (bookings) => {
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const lastMonthString = lastMonthDate.toISOString().slice(0, 7);

  return bookings.filter(
    (booking) =>
      booking.date.startsWith(lastMonthString) && booking.status !== "cancelled"
  ).length;
};

//Current Month Bookings Count
const getCurrentMonthBookings = (bookings) => {
  const currentMonth = new Date().toISOString().slice(0, 7);

  return bookings.filter(
    (booking) =>
      booking.date.startsWith(currentMonth) && booking.status !== "cancelled"
  ).length;
};

// Current month's upcoming bookings
export const getUpcomingBookings = (bookings) => {
  const today = new Date().toISOString().split("T")[0];

  return bookings.filter(
    (booking) => booking.status !== "cancelled" && booking.date > today
  ).length;
};

// Last month’s upcoming bookings (on this same date)
export const getUpcomingBookingsLastMonth = (bookings) => {
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const lastMonthString = lastMonthDate.toISOString().slice(0, 7);

  const lastMonthCount = bookings.filter(
    (booking) =>
      booking.date.startsWith(lastMonthString) && booking.status !== "cancelled"
  ).length;

  return lastMonthCount || 0; // Ensure it returns 0 if empty
};

/** TODAYS**/
export const todayBookings = (bookings) => {
  const today = new Date().toISOString().split("T")[0];

  return bookings.filter(
    (booking) => booking.status !== "cancelled" && booking.date === today
  ).length; // ✅ Now, we return the length inside the function
};

////  Get Last Month's Same Date Bookings
const getLastMonthSameDateBookings = (bookings) => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  //where last month has no such date
  if (lastMonth.getMonth() === today.getMonth()) {
    lastMonth.setDate(0); //last day of last month
  }
  const lastMonthDate = lastMonth.toISOString().split("T")[0];

  return bookings.filter(
    (booking) =>
      booking.date === lastMonthDate && booking.status !== "cancelled"
  ).length;
};

/*NEW CLIENST*/
export const newClientsThisMonth = (bookings) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const firstTimeClients = new Map();

  bookings.forEach((booking) => {
    if (booking.status !== "cancelled") {
      const phone = booking.phone;
      if (
        !firstTimeClients.has(phone) ||
        booking.date < firstTimeClients.get(phone)
      ) {
        firstTimeClients.set(phone, booking.date);
      }
    }
  });

  return [...firstTimeClients.values()].filter((date) =>
    date.startsWith(currentMonth)
  ).length;
};

//last month clients
const getNewClientsLastMonth = (bookings) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const lastMonthString = lastMonth.toISOString().slice(0, 7);

  const firstTimeClients = new Map();

  bookings.forEach((booking) => {
    if (booking.status !== "cancelled") {
      const phone = booking.phone;
      if (
        !firstTimeClients.has(phone) ||
        booking.date < firstTimeClients.get(phone)
      ) {
        firstTimeClients.set(phone, booking.date);
      }
    }
  });

  return [...firstTimeClients.values()].filter((date) =>
    date.startsWith(lastMonthString)
  ).length;
};

//Total Bookings Percentage Change
export const totalBookingPercentage = (bookings) =>
  calculatePercentageChange(
    getCurrentMonthBookings(bookings),
    getLastMonthBookings(bookings)
  );

//upcoming booking % change
export const upcomingBookingsPercentage = (bookings) =>
  calculatePercentageChange(
    getUpcomingBookings(bookings),
    getUpcomingBookingsLastMonth(bookings)
  );

//  Today's Bookings Percentage Change
export const todaysBookingPercentage = (bookings) =>
  calculatePercentageChange(
    todayBookings(bookings),
    getLastMonthSameDateBookings(bookings)
  );

//new client %
export const newClientsPercentage = (bookings) =>
  calculatePercentageChange(
    newClientsThisMonth(bookings),
    getNewClientsLastMonth(bookings)
  );
