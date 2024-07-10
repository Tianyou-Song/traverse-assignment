import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { BookingRow } from '~/components/bookings/bookingRow';
import { fetchBookings } from '~/utils/bookings.utils';
import Breadcrumb from '~/components/ui/breadcrumb/breadcrumbWrapper';

export const useBookings = routeLoader$(async (requestEvent) => {
  return fetchBookings(requestEvent)
});
export default component$(() => {
  const { value: bookings } = useBookings();

  return (
    <div
      class='flex flex-col items-center gap-8 p-8 w-full'
    >
      <div
        class='self-start'
      >
        <Breadcrumb
          items={[{
            name: 'Home',
            link: '/',
          }, {
            name: 'Bookings',
          }]}
        />
      </div>

      <h1
        class="text-6xl font-bold"
      >
        Bookings
      </h1>
      <ul
        class='flex flex-col w-full p-8'
      >
        <li
          class='flex items-center gap-8 w-full justify-between text-base font-bold sticky top-0 bg-[#22212C] p-4'
        >
          <div
            class='w-48'
          >
            Hotel
          </div>
          <div
            class='w-24'
          >
            Occupancy
          </div>
          <div
            class="w-24"
          >
            Total
          </div>
          <div
            class="w-24"
          >
            Active
          </div>
          <div
            class="w-24"
          >
            Paid
          </div>
          <div
            class="w-24"
          >
            Check In
          </div>
          <div
            class="w-24"
          >
            Check Out
          </div>
          <div
            class="w-28"
          >
            Length of Stay
          </div>
        </li>
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