export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  userName?: string;
  email: string;
  image?: string;
//   studioImage?: string; // Studio thumbnail image
  bookingDate: string;
  bookingTime?: string | Date;
  startTime: string;
  hours: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Cancelled";
  location?: string;
}