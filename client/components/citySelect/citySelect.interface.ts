export interface CitySelectProps {
  direction: string;
  color: string;
}

export interface CityComponentProps {
  title: string;
  activeCityTitle: string;
  onClick: () => void;
}