import { LegacyRef, ReactNode } from 'react';

export interface ModalComponentType {
  modalName: string;
  data?: any;
}

export interface ModalProps {
  children: ReactNode;
  innerRef: LegacyRef<HTMLDivElement>;
}
