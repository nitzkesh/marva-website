import { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
  children: ReactNode;
  tone?: 'sage' | 'sky' | 'sand' | 'outline';
  style?: CSSProperties;
}
