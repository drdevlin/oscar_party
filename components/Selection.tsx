import type { Category, Nominee } from '@/types';

import styles from './Selection.module.css';

export interface SelectionProps {
  category: Category;
  nominee?: Nominee;
  win: boolean;
}

/* Displays a user's selection of nominee for a category. */
export const Selection = ({ category, nominee, win }: SelectionProps) => {
  const [principalName] = nominee?.name.split(',') || [];

  return (
    <div className={styles.selection}>
      <span className={styles.categoryName}><strong>{category.name}</strong>{win && ' ⭐️'}</span>
      <span className={styles.nominee}>{principalName}</span>
    </div>
  );
};
