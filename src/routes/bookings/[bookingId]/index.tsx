import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { isMessageGuard } from '~/types/bookings.types';
import { fetchBookingById, getBookingTotalFormatted } from '~/utils/bookings.utils';

export const useBooking = routeLoader$(async (requestEvent) => {
  const { bookingId: bookingIdString } = requestEvent.params;
  const bookingId = new Number(bookingIdString).valueOf();
  return fetchBookingById(requestEvent, bookingId);
});
export default component$(() => {
  const { value: booking } = useBooking();
  if (isMessageGuard(booking)) return (
    <div
      class="w-screen h-screen flex flex-col items-center justify-center gap-4"
    >
      <h1
        class="text-6xl font-bold text-[#FF9580]"
      >
        {booking.message}
      </h1>
      <Link
        class="text-4xl hover:underline text-[#7970A9]"
        href="/bookings/"
      >
        Back to Bookings
      </Link>
    </div>
  );

  const total = getBookingTotalFormatted(booking);
  const statusDisplay = booking.cancelledAt ?
    <span
      class='text-[#FF9580]'
    >
      Cancelled at: {booking.cancelledAt.toLocaleString()}
    </span> :
    <span
      class='text-[#8AFF80]'
    >
      Active
    </span>;
  const paidDisplay = booking.paidInFullAt ?
    <span
      class='text-[#8AFF80]'
    >
      Paid At: {booking.paidInFullAt.toLocaleString()}
    </span> :
    <span
      class='text-[#FF9580]'
    >
      Unpaid
    </span>;

  const stayTime = booking.checkOutDate.getTime() - booking.checkInDate.getTime();
  const stayLengthDays = stayTime / (1000 * 60 * 60 * 24);

  return (
    <div
      class='flex flex-col items-start gap-8 p-8 w-full'
    >
      <div>
        Hotel: {booking.hotel.name}
      </div>
      <div>
        Occupancy: {booking.occupancy}
        {booking.occupancy > booking.room.maxOccupancy &&
          <span
          class='text-[#FF9580]'
          >
            (Over Occupancy)
          </span>
        }
      </div>
      <div>
        Total: {total}
      </div>
      <div>
        Status: {statusDisplay}
      </div>
      <div>
        Payment Status: {paidDisplay}
      </div>
      <div>
        Check In: {booking.checkInDate.toLocaleDateString()}
      </div>
      <div>
        Check Out: {booking.checkOutDate.toLocaleDateString()}
      </div>
      <div>
        Length of Stay: {stayLengthDays} days
      </div>
      <div>
        Booked At: {booking.createdAt.toLocaleString()}
      </div>
      <div>
        Updated At: {booking.updatedAt.toLocaleString()}
      </div>

      {booking.notes &&
        <div>
          Notes: {booking.notes}
        </div>
      }

      <div>
        Room:
        <div
          class='flex flex-col items-start gap-4 p-8 w-full'
        >
          <div>
            Max Units: {booking.room.maxUnits}
          </div>
          <div>
            Max Occupancy: {booking.room.maxOccupancy}
          </div>
        </div>

      </div>

      <div>
        Customer:
        <div
          class='flex flex-col items-start gap-4 p-8 w-full'
        >
          <div>
            Name: {booking.customer.firstName} {booking.customer.lastName}
          </div>
          <div>
            Email: {booking.customer.email}
          </div>
          <div>
            Other Bookings:
            <ul
              class='flex flex-col items-start gap-2 p-8 w-full'
            >
              {booking.customer.bookingIds.map((bookingId) => {
                return (
                  <li
                    key={bookingId}
                  >
                    <Link
                      class='hover:underline text-[#7970A9]'
                      href={`/bookings/${bookingId}`}
                    >
                      {bookingId}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>
  );
});