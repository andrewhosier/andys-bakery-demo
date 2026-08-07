export interface OpenInterval {
  start: string;
  end: string;
}

export interface DayHours {
  isClosed?: boolean;
  openIntervals?: OpenInterval[];
}

export interface Hours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface PhotoItem {
  url: string;
  alternateText?: string;
}

export interface Review {
  reviewId: string;
  publisher: string;
  rating: number;
  authorName: string;
  reviewDate: string;
  content: string;
  reviewResponse?: string | null;
  status: string;
}

export interface Post {
  postId: string;
  publisher: string;
  entityId: string;
  text: string;
  status: string;
  createDate: string;
  photoUrls?: string[];
  metrics?: {
    impressions?: number;
    clicks?: number;
    shares?: number;
  };
}

export interface LocationProfile {
  id: string;
  name: string;
  address: Address;
  mainPhone?: string;
  alternatePhone?: string;
  description?: string;
  hours?: Hours;
  websiteUrl?: { url: string };
  facebookPageUrl?: string;
  instagramHandle?: string;
  twitterHandle?: string;
  linkedInUrl?: string;
  logo?: { url: string; alternateText?: string };
  photoGallery?: PhotoItem[];
  geocodedCoordinate?: Coordinate;
  priceRange?: string;
  yearEstablished?: number;
  paymentOptions?: string[];
  firstPartyReviewPage?: string;
  reviewGenerationUrl?: string;
}
