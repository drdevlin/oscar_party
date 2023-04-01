import styles from './Item.module.css';

export interface LinkPadProps {
  children?: React.ReactNode;
}

export const Item = ({ children }: LinkPadProps) => {
  return <div className={styles.item}>{children}</div>
}