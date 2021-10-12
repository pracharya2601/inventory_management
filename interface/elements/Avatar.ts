export interface AvatarProps {
  goto?: string;
  withBorder?: boolean;
  withInfo?: boolean;
  img?: string;
  size?: 'small' | 'normal' | 'big' | 'monster';
  type?: 'square' | 'rounded' | 'full';
}