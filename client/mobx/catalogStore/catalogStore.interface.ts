export interface ICatalogStore {
  isOpen: boolean;
  catalog: ICatalogItem[];
  activeItem: ICatalogItem;
  setOpen: (flag: boolean) => void;
  setCatalog: (catalog: ICatalogItem[]) => void;
  setActiveItem: (item: string) => void;
}

export interface ICatalogItem {
  id: number;
  title: string;
  titleUrl: string;
  data: any;
}
