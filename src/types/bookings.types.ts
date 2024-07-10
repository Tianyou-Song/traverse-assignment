export interface BookingResponse {
  cancelled: boolean;
  checkInDate: string;
  checkOutDate: string;
  currencyCode: string;
  hotelName: string;
  id: number;
  occupancy: number;
  paid: boolean;
  total: number;
}

export interface Booking {
  cancelled: boolean;
  checkInDate: Date;
  checkOutDate: Date;
  currencyCode: string;
  hotelName: string;
  id: number;
  occupancy: number;
  paid: boolean;
  total: number;
}

export const convertBookingResponseToBooking = (bookingResponse: BookingResponse): Booking => {
  return {
    ...bookingResponse,
    checkInDate: new Date(bookingResponse.checkInDate),
    checkOutDate: new Date(bookingResponse.checkOutDate),
  };
};

export interface DetailedBookingResponse {
  cancelledAt: null | string;
  checkInDate: string;
  createdAt: string;
  checkOutDate: string;
  currencyCode: string;
  customer: {
    bookingIds: number[];
    email: string;
    firstName: string;
    id: number;
    lastName: string;
  };
  hotel: {
    id: number;
    name: string;
  };
  id: number;
  occupancy: number;
  notes: null | string;
  paidInFullAt: null | string;
  room: {
    id: number;
    maxUnits: number;
    maxOccupancy: number;
    name: string;
  };
  total: number;
  updatedAt: string;
}

export interface DetailedBooking {
  cancelledAt: null | Date;
  checkInDate: Date;
  createdAt: Date;
  checkOutDate: Date;
  currencyCode: string;
  customer: {
    bookingIds: number[];
    email: string;
    firstName: string;
    id: number;
    lastName: string;
  };
  hotel: {
    id: number;
    name: string;
  };
  id: number;
  occupancy: number;
  notes: null | string;
  paidInFullAt: null | Date;
  room: {
    id: number;
    maxUnits: number;
    maxOccupancy: number;
    name: string;
  };
  total: number;
  updatedAt: Date;
}

export const convertDetailedBookingResponseToDetailedBooking = (detailedBookingResponse: DetailedBookingResponse): DetailedBooking => {
  return {
    ...detailedBookingResponse,
    cancelledAt: detailedBookingResponse.cancelledAt ? new Date(detailedBookingResponse.cancelledAt) : null,
    checkInDate: new Date(detailedBookingResponse.checkInDate),
    createdAt: new Date(detailedBookingResponse.createdAt),
    checkOutDate: new Date(detailedBookingResponse.checkOutDate),
    paidInFullAt: detailedBookingResponse.paidInFullAt ? new Date(detailedBookingResponse.paidInFullAt) : null,
    updatedAt: new Date(detailedBookingResponse.updatedAt),
  };
};

export const isDetailedBookingGuard = (booking: DetailedBooking | { message: any; }): booking is DetailedBooking => {
  return (booking as DetailedBooking).id !== undefined;
};

export const isMessageGuard = (booking: DetailedBooking | { message: any; }): booking is { message: any; } => {
  return (booking as { message: any; }).message !== undefined;
}