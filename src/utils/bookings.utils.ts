import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { Booking, BookingResponse, DetailedBooking, DetailedBookingResponse} from "~/types/bookings.types";
import { convertBookingResponseToBooking, convertDetailedBookingResponseToDetailedBooking } from "~/types/bookings.types";
import { fetchFromTraverseApi } from "./traverseApi.utils";

export const getBookingsRoute = (requestEvent: RequestEventLoader) => {
  const baseRoute = requestEvent.env.get('TRAVERSE_ASSIGNMENT_API_ROUTE_BASE');
  if (!baseRoute) {
    throw new Error('Missing required environment variables TRAVERSE_ASSIGNMENT_API_ROUTE_BASE');
  }
  return `${baseRoute}/bookings`;
};

export const fetchBookings = async (requestEvent: RequestEventLoader) => {
  const bookingResponses = await fetchFromTraverseApi(requestEvent, getBookingsRoute(requestEvent)) as BookingResponse[];

  const bookings = bookingResponses.map((bookingResponse) => {
    return convertBookingResponseToBooking(bookingResponse);
  }).sort((booking1, booking2) => booking2.checkInDate.getTime() - booking1.checkInDate.getTime());

  return bookings;
};

export const fetchBookingById = async (requestEvent: RequestEventLoader, bookingId: number) => {
  const fetchResponse = await fetchFromTraverseApi(requestEvent, `${getBookingsRoute(requestEvent)}/${bookingId}`);

  if (fetchResponse.message) {
    return {
      message: fetchResponse.message
    }
  }

  return convertDetailedBookingResponseToDetailedBooking(fetchResponse as DetailedBookingResponse);
};

export const getBookingTotalFormatted = (booking: Booking | DetailedBooking) => {
  switch (booking.currencyCode) {
    case 'USD':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: booking.currencyCode }).format(booking.total / 100);
  }
  throw new Error(`Unsupported currency code: ${booking.currencyCode}`);
};