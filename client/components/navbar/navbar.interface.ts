export interface CatalogItemMobileProps {
  onClick: () => void;
  title: string;
  activeItem: string;
  data: catalogItemInterface[];
}

export interface catalogItemInterface {
  letter: string;
  name: string[];
}

export interface NavItemProps {
  route: string;
  title: string;
  icon: any;
}

export interface CatalogItemProps {
  title: string;
  activeItem: string;
  onClick: () => void;
}
