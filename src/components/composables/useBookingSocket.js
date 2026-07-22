import { getSocket, setCurrentBookingCode } from "./useSocket";

export function useBookingSocket() {
  const socket = getSocket();

  const joinBooking = (bookingCode) => {
    setCurrentBookingCode(bookingCode);

    if (socket.connected) {
      socket.emit("join-booking", bookingCode);
    }
  };

  // LIVE UPDATES
  const onBookingEvent = (callback) => {
    socket.off("booking-event");
    socket.on("booking-event", callback);
  };

  // INITIAL STATE (IMPORTANT ADDITION)
  const onBookingState = (callback) => {
    socket.off("booking-state");
    socket.on("booking-state", callback);
  };

  const leaveBooking = (bookingCode) => {
    socket.emit("leave-booking", bookingCode);
  };

  return {
    joinBooking,
    onBookingEvent,
    onBookingState,
    leaveBooking,
  };
}
