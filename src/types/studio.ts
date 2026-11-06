export interface Studio {
    _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  images: string[];
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerName?: string;
  ownerEmail?: string;
}