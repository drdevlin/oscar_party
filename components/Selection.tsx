import classNames from 'classnames';
import Link from 'next/link';
import { Item } from '@/components/Item';

import type { Category, Nominee, Selection as SelectionType } from '@/types';

import styles from './Selection.module.css';

export interface SelectionProps {
  category: Category;
  userId: string;
  userSelections: SelectionType[];
  isSignedIn: boolean;
}

/* Displays a user's selection of nominee for a category. */
export const Selection = ({ category, userId, userSelections, isSignedIn }: SelectionProps) => {
  const selection = userSelections.find(({ nomination }) => nomination.category._id === category._id);
  const nominee = selection?.nomination.nominee;
  const win = Boolean(selection?.nomination.win);

  return (
    <Item key={category._id}>
      <Link
        className={classNames(
          styles.selectionLink,
          { [styles.linkDisabled]: !isSignedIn },
        )}
        href={`/category?id=${category._id}&user=${userId}`}
      >
        <Content
          category={category}
          nominee={nominee}
          win={win}
        />
        {isSignedIn && <Chevron />}
      </Link>
    </Item>
  );
};

// Subcomponents
interface ContentProps {
  category: Category;
  nominee?: Nominee;
  win: boolean;
}
const Content = ({ category, nominee, win }: ContentProps) => {
  const [principalName] = nominee?.name.split(',') || [];

  return (
    <div className={styles.content}>
      <span className={styles.categoryName}><strong>{category.name}</strong>{win && ' ⭐️'}</span>
      <span className={styles.nominee}>{principalName}</span>
    </div>
  );
};

const Chevron = () => {
  return (
    <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
    </svg>
  );
};
