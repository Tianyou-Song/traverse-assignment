import type { RequestEventLoader } from "@builder.io/qwik-city";
import type { BookingResponse, DetailedBookingResponse} from "~/types/bookings.types";
import { convertBookingResponseToBooking, convertDetailedBookingResponseToDetailedBooking } from "~/types/bookings.types";
import { fetchFromTraverseApi } from "./traverseApi.utils";

export const getBookingsRoute = (requestEvent: RequestEventLoader) => {
  const baseRoute = requestEvent.env.get('TRAVERSE_ASSIGNMENT_API_ROUTE_BASE');
  const bookingsRoute = requestEvent.env.get('TRAVERSE_ASSIGNMENT_API_ROUTE_BOOKINGS');
  if (!baseRoute || !bookingsRoute) {
    throw new Error('Missing required environment variables TRAVERSE_ASSIGNMENT_API_ROUTE_BASE and TRAVERSE_ASSIGNMENT_API_ROUTE_BOOKINGS');
  }
  return `${baseRoute}${bookingsRoute}`;
};

export const fetchBookings = async (requestEvent: RequestEventLoader) => {
  const bookingResponses = await fetchFromTraverseApi(requestEvent, getBookingsRoute(requestEvent)) as BookingResponse[];

  const bookings = bookingResponses.map((bookingResponse) => {
    return convertBookingResponseToBooking(bookingResponse);
  });

  return bookings;
};

export const fetchBookingById = async (requestEvent: RequestEventLoader, bookingId: number) => {
  const bookingResponse = await fetchFromTraverseApi(requestEvent, `${getBookingsRoute(requestEvent)}/${bookingId}`) as DetailedBookingResponse;

  return convertDetailedBookingResponseToDetailedBooking(bookingResponse);
};
