import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { fetchBookingById } from '~/utils/bookings.utils';

export const useBooking = routeLoader$(async (requestEvent) => {
  const { bookingId: bookingIdString } = requestEvent.params;
  const bookingId = new Number(bookingIdString).valueOf();
  return fetchBookingById(requestEvent, bookingId);
});
export default component$(() => {
  const { value: booking } = useBooking();

  return (
    <div>
    {JSON.stringify(booking, null, 2)}
    </div>
  );
});