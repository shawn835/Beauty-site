import { useToast } from "./useToast";
import { useBookingStore } from "../store/useBookingStore";

export const useServiceBookingActions = () => {
  const { show } = useToast();
  const bookingStore = useBookingStore();

  const handleBookService = (service) => {
    const result = bookingStore.toggleService(service);

    const serviceName =
      service.type === "service" ? service.serviceName : service.subServiceName;

    show({
      message:
        result === "added"
          ? `${serviceName} added to your preview`
          : `${serviceName} removed from your preview`,
      type: result === "added" ? "success" : "info",
    });
  };

  return {
    handleBookService,
  };
};
