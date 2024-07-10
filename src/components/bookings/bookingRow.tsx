import { component$ } from '@builder.io/qwik';
import type { Booking } from '~/types/bookings.types';

export const BookingRow = component$(({booking}: {booking: Booking}) => {
  return (
    <li>
      {booking.id}
    </li>
  );
});