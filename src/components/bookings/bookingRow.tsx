import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { Booking } from '~/types/bookings.types';
import { getBookingTotalFormatted } from '~/utils/bookings.utils';

// 2. Format the total appropriately, it is in the lowest unit of the currency code (e.g. cents in the above data).

// 3. A booking can be cancelled, fully paid, both or neither. Indicate this status in a way that makes sense.

// 4. Include the length of the stay for each booking (e.g. 1 night in the above case)

// 5. Include a link to /bookings/<id></id>
export const BookingRow = component$(({ booking }: { booking: Booking; }) => {
  const total = getBookingTotalFormatted(booking);
  const statusDisplay = booking.cancelled ?
    <span
      class='text-[#FF9580]'
    >
      Cancelled
    </span> :
    <span
      class='text-[#8AFF80]'
    >
      Active
    </span>;
  const paidDisplay = booking.paid ?
    <span
      class='text-[#8AFF80]'
    >
      Paid
    </span> :
    <span
      class='text-[#FF9580]'
    >
      Unpaid
    </span>;
  const stayTime = booking.checkOutDate.getTime() - booking.checkInDate.getTime();
  const stayLengthDays = stayTime / (1000 * 60 * 60 * 24);

  return (
    <li>
      <Link
        class='flex items-center gap-8 w-full justify-between text-base hover:bg-[#454158] p-4'
        href={`/bookings/${booking.id}`}
      >
        <div
          class='w-48'
        >
          {booking.hotelName}
        </div>
        <div
          class='w-24'
        >
          {booking.occupancy}
        </div>
        <div
          class="w-24"
        >
          {total}
        </div>
        <div
          class="w-24"
        >
          {statusDisplay}
        </div>
        <div
          class="w-24"
        >
          {paidDisplay}
        </div>
        <div
          class="w-24"
        >
          {booking.checkInDate.toLocaleDateString()}
        </div>
        <div
          class="w-24"
        >
          {booking.checkOutDate.toLocaleDateString()}
        </div>
        <div
          class="w-28"
        >
          {stayLengthDays} days
        </div>
      </Link>
    </li>
  );
});