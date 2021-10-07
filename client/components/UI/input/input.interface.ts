import { MutableRefObject, ReactNode } from 'react';

export interface InputComponentProps {
  version?: string;
  placeholder?: string;
  type?:
    | 'button'
    | 'checkbox'
    | 'file'
    | 'hidden'
    | 'image'
    | 'password'
    | 'radio'
    | 'reset'
    | 'submit'
    | 'text';
  className?: string;
  onChange?: (props: any) => void;
  value?: string;
  defaultValue?: string;
  innerRef?: MutableRefObject<HTMLInputElement>;
  iconLeft?: ReactNode;
}
