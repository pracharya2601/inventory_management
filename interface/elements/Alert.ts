export interface AlertProps {
    type: 'alert' | 'success' | 'danger';
    title: string;
    text: string;
    closeStat?: boolean;
    onclickremove?: boolean;
    onClick?: () => void;
}
