export interface BidItemProps {
  title: string;
  createdAt: string;
  city: string;
  price: string | number;
  desc: string;
  favorite?: boolean;
  isFavorite?: boolean;
  isVip?: boolean;
}
