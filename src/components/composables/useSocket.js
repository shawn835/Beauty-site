import { io } from "socket.io-client";

let socket = null;

// used to restore state after reconnect
let currentBookingCode = null;

export const setCurrentBookingCode = (code) => {
  currentBookingCode = code;
};

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      reconnection: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // restore room after reconnect
      if (currentBookingCode) {
        socket.emit("join-booking", currentBookingCode, (response) => {
          if (!response?.ok) {
            console.error(response?.error);
          }
        });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    socket.io.on("reconnect_attempt", () => {
      console.log("Socket reconnecting...");
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
  currentBookingCode = null;
};
