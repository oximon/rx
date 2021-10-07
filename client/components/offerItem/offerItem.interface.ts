export interface OfferItemProps {
  photos: Array<string>;
  price: number;
  title: string;
  year: string;
  createdAt: string;
  city: string;
  desc: string;
  condition: string;
  favorite?: boolean;
  isFavorite?: boolean;
  isVip?: boolean;
}
