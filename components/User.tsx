import { useContext, useState } from 'react';
import Link from 'next/link';

import { useUserStore } from '@/lib/userStore';
import { UnauthorizedContext } from '@/components/Unauthorized';
import { Item } from '@/components/Item';
import { Avatar } from '@/components/Avatar';
import { Pin } from '@/components/Pin';

import type { PinProps } from '@/components/Pin';

import styles from './User.module.css';

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

/* Displays a user with avatar. */
export const User = ({ id, name, avatar }: UserProps) => {
  // Context
  const { show: showUnauthorized } = useContext(UnauthorizedContext);

  // State
  const currentUserId = useUserStore((state) => state.userId);
  const setCurrentUserId = useUserStore((state) => state.setUserId);

  const [pinMode, setPinMode] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');

  // Calculated Props
  const isSignedIn = id === currentUserId;

  // Handlers
  const handleAvatarClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (isSignedIn || pinMode) {
      setCurrentUserId(null);
      setPinMode(false);
      return;
    }
    setPinMode(true);
  };

  const handlePinChange: PinProps['onChange'] = (value) => {
    if (!Number.isNaN(Number(value))) {
      setPinMode(false);
      (async () => {
        const response = await fetch('/api/signin', {
          method: 'POST',
          body: JSON.stringify({ user: id, pin: value }),
        });
        if (response.status === 401) showUnauthorized();
        const auth = response.ok ? (await response.json()).data.auth : false;
        if (auth) setCurrentUserId(id);
      })();
      return;
    }
  }


  return (
    <Item>
      <div className={styles.avatarFrame}>
        <Avatar avatar={avatar} isSignedIn={isSignedIn} onClick={handleAvatarClick} />
      </div>
      {pinMode ? (
        <Pin onChange={handlePinChange} description="4-Digit PIN" autoFocus />
      ) : (
        <Link className={styles.link} href={`/selection?user=${id}`}>
          <h2>{name}</h2>
          <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
          </svg>
        </Link>
      )}
    </Item>
  );
};
