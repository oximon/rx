import { ReactNode } from 'react';

export interface ButtonDefaultProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (props: any) => void;
  title?: string | ReactNode;
  color?: string;
  iconLeft?: boolean;
  close?: boolean;
  version?: string;
  className?: string;
}
