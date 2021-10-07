const rentArrSort: Array<{ title: string; value: string }> = [
  {
    title: 'По умолчанию',
    value: 'default',
  },
  {
    title: 'Дешевле',
    value: 'price_down',
  },
  {
    title: 'Дороже',
    value: 'price_rise',
  },
  {
    title: 'По дате',
    value: 'date',
  },
];

const showList: Array<{ title: number; value: number }> = [
  { title: 10, value: 10 },
  { title: 20, value: 20 },
  { title: 50, value: 50 },
  { title: 100, value: 100 },
];

export { rentArrSort, showList };
