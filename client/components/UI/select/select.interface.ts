export interface SelectComponentProps {
  onChange: (value: string | number, title: string | number) => void;
  arrValues?: Array<{
    title: string | number;
    value: string | number;
  }>;
  previewText?: string;
  defaultValue: string | number;
  numbersValues?: boolean;
}
