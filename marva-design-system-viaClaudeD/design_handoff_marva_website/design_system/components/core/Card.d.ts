import { ReactNode, CSSProperties } from 'react';

export interface CardProps {
  children: ReactNode;
  /** CSS color for a 4px top accent stripe, e.g. 'var(--marva-sage)'. Omit for a plain card. */
  accent?: string;
  style?: CSSProperties;
}
