"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingID) => {
      return curBookings.filter((booking) => booking.id !== bookingID);
    }
  );
  return (
    <div>
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            onDelete={handleDelete}
            booking={booking}
            key={booking.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
