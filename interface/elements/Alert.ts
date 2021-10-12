export interface AlertProps {
  type: 'alert' | 'success' | 'danger';
  title: string;
  text: string;
  onclickremove?: boolean;
}
