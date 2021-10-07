import { LegacyRef } from 'react';

export interface LoginModalInterface {
  onToggleModalView: (modalName: string, flag?: boolean) => void;
  innerRef: LegacyRef<HTMLDivElement>;
}
