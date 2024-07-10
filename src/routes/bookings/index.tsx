import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { BookingRow } from '~/components/bookings/bookingRow';
import { fetchBookings } from '~/utils/bookings.utils';

export const useBookings = routeLoader$(async (requestEvent) => {
  return fetchBookings(requestEvent)
});
export default component$(() => {
  const { value: bookings } = useBookings();

  return (
    <div
      class='flex flex-col items-center gap-8 p-8'
    >
      <h1
        class="text-6xl font-bold"
      >
        Bookings
      </h1>
      <ul>
        {bookings.map((booking) => {
        return (
          <BookingRow
            booking={booking}
            key={booking.id}
          />
        );
      })}
      </ul>
    </div>
  );
});