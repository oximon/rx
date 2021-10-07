export interface additionalModalModalInterface {
  onToggleModalView: (modalName: string, flag?: boolean) => void;
  innerRef: any;
  title: string;
  subtitle?: string;
  type: string;
}
