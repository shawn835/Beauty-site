<template>
  <tr class="booking-row">
    <td>{{ booking.bookingId }}</td>
    <td>{{ booking.name }}<br />{{ booking.contact }}</td>
    <td>{{ booking.service }} - {{ booking.subservice }}</td>
    <td>{{ formatDate(booking.date) }}<br />{{ booking.time }}</td>
    <td :class="booking?.paymentStatus">
      {{ booking?.paymentStatus }}
    </td>
    <td :class="booking?.bookingStatus.toLowerCase()">
      {{ booking.bookingStatus }}
    </td>
    <td>{{ formatDate(booking.createdDate) }}</td>
    <td>
      <button @click="$emit('openDetails')" class="action-btn view-btn">
        View
      </button>
      <button
        v-if="booking.bookingStatus === 'upcoming'"
        @click="$emit('reschedule')"
        class="action-btn reschedule-btn">
        Reschedule
      </button>
      <button
        v-if="booking.bookingStatus === 'upcoming'"
        @click="handleCancel(booking.bookingId)"
        class="action-btn cancel-btn"
        :disabled="cancelling">
        cancel
      </button>
      <button
        v-if="booking.bookingStatus === 'upcoming'"
        @click="handleMarkComplete(booking)"
        class="action-btn complete-btn"
        :disabled="markingComplete">
        mark complete
      </button>
      <button
        v-if="canUpdatePayment(booking)"
        @click="$emit('updatePayment')"
        class="action-btn payment-btn">
        Update Payment
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useBooking } from "@/components/composables/useBooking";
import { formatDate } from "@/utils";
import { useToast } from "@/components/composables/useToast";
import { useAdmin } from "@/components/composables/useAdmin";
const { cancelBooking, loading: cancelling } = useBooking();
const { show } = useToast();
const { markComplete, loading: markingComplete } = useAdmin();

const handleCancel = async (bookingid) => {
  try {
    const { message } = await cancelBooking(bookingid);
    show({ message: message, type: "success" });
  } catch (error) {
    show({ message: error.message, type: "error" });
  }
};
const handleMarkComplete = async (booking) => {
  try {
    const { message } = await markComplete(booking);
    show({ message: message, type: "success" });
  } catch (error) {
    show({ message: error.message, type: "error" });
  }
};

defineProps({
  booking: { type: Object, required: true },
});

defineEmits(["reschedule", "cancel", "complete"]);

const canUpdatePayment = () => true;
</script>
<style scoped>
.view-btn {
  background-color: #d81b60;
  color: #fff;
}
.info-btn {
  background-color: #2e7d32;
  color: #fff;
}
.reschedule-btn {
  background-color: #ed6c02;
  color: #fff;
}
.cancel-btn {
  background-color: #d32f2f;
  color: #fff;
}
.complete-btn {
  background-color: #1b5e20;
  color: #fff;
}
.payment-btn {
  background-color: #6a1b9a;
  color: #fff;
}

.action-btn:hover {
  transform: translateY(-1px);
}
.view-btn:hover {
  background-color: #ad1457;
}
.info-btn:hover {
  background-color: #1b5e20;
}
.reschedule-btn:hover {
  background-color: #e65100;
}
.cancel-btn:hover {
  background-color: #b71c1c;
}
.complete-btn:hover {
  background-color: #103e10;
}
.payment-btn:hover {
  background-color: #4a148c;
}

.booking-row:hover {
  background-color: #fffaf9;
}

.action-btn {
  padding: 6px 12px;
  margin: 2px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.paid {
  color: #2e7d32;
  font-weight: 500;
}
.pending {
  color: #ed6c02;
  font-weight: 500;
}
.refunded {
  color: #d32f2f;
  font-weight: 500;
}
.confirmed {
  color: #2e7d32;
  font-weight: 500;
}
.rescheduled {
  color: #ed6c02;
  font-weight: 500;
}
.completed {
  color: #1b5e20;
  font-weight: 500;
}
.cancelled,
.no-show {
  color: #d32f2f;
  font-weight: 500;
}

@media (max-width: 768px) {
  .booking-row td:before {
    content: attr(data-label);
    font-weight: bold;
    color: #d81b60;
    margin-right: 10px;
  }
}
</style>
