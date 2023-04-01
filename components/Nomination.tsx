import { Category, Nominee } from "@/types";
import Link from "next/link";
import { Item } from "@/components/Item";
import styles from './Nomination.module.css';

export interface NominationProps {
  nominee?: Nominee;
  category: Category;
  win: boolean;
  user?: string;
}

export const Nomination = ({ nominee, category, win, user }: NominationProps) => {
  const userParam = user ? `&user=${user}` : '';
  const names = nominee?.name ? nominee.name.split(',') : [];
  const [principalName] = names;

  return (
    <Item>
      <Link className={styles.link} href={`/category?id=${category._id}${userParam}`}>
        <div className={styles.selection}>
          <span className={styles.categoryName}><strong>{category.name}</strong></span>
          <span className={styles.nominee}>{principalName}</span>
        </div> 
        <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </Link>
    </Item>
  )
}