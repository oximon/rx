export interface ICityStore {
  cities: ICityInterface[];
  activeCity: ICityInterface;
  setCities: (city: ICityInterface) => void;
  setActiveCity: (cities: ICityInterface[]) => void;
}

export interface ICityInterface {
  codes: number[];
  title: string;
  titleUrl: string;
}
