import Link from 'next/link';
import { Item } from '@/components/Item';
import { Avatar } from '@/components/Avatar';

import styles from './User.module.css';

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

/* Displays a user with avatar. */
export const User = ({ id, name, avatar }: UserProps) => {
  return (
    <Item>
      <div className={styles.avatarFrame}>
        <Avatar userId={id} avatar={avatar} />
      </div>
      <Link className={styles.link} href={`/selection?user=${id}`}>
        <h2>{name}</h2>
        <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </Link>
    </Item>
  );
};
