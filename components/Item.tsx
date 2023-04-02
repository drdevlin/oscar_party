import styles from './Item.module.css';

export interface ItemProps {
  children?: React.ReactNode;
}

/* The main UI container. */
export const Item = ({ children }: ItemProps) => {
  return <section className={styles.item}>{children}</section>;
};
