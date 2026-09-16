import { getSocket, setCurrentBookingCode } from "./useSocket";

export function useBookingSocket() {
  const socket = getSocket();

  const joinBooking = (bookingCode) => {
    setCurrentBookingCode(bookingCode);

    if (socket.connected) {
      socket.emit("join-booking", bookingCode, (response) => {
        if (!response?.ok) {
          console.error("Failed to join booking room:", response?.error);
        }
      });
    }
  };

  const onBookingEvent = (callback) => {
    socket.on("booking-event", callback);

    return () => {
      socket.off("booking-event", callback);
    };
  };

  const onBookingState = (callback) => {
    socket.on("booking-state", callback);

    return () => {
      socket.off("booking-state", callback);
    };
  };

  const leaveBooking = (bookingCode) => {
    socket.emit("leave-booking", bookingCode);

    setCurrentBookingCode(null);
  };

  return {
    joinBooking,
    onBookingEvent,
    onBookingState,
    leaveBooking,
  };
}
