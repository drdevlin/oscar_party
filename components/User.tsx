import Link from 'next/link';
import { Item } from '@/components/Item';
import { Avatar } from '@/components/Avatar';

import styles from './User.module.css';
import { useUserStore } from '@/lib/userStore';
import { useState } from 'react';

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

/* Displays a user with avatar. */
export const User = ({ id, name, avatar }: UserProps) => {
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

  const handlePinChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const newPin = /\D+/.test(value) ? pin : value;
    if (value.length === 4) {
      setPin('');
      setPinMode(false);
      (async () => {
        const response = await fetch('/api/signin', {
          method: 'POST',
          body: JSON.stringify({ user: id, pin: newPin }),
        });
        const auth = response.ok ? (await response.json()).data.auth : false;
        if (auth) setCurrentUserId(id);
      })();
      return;
    }
    setPin(newPin);
  }


  return (
    <Item>
      <div className={styles.avatarFrame}>
        <Avatar avatar={avatar} isSignedIn={isSignedIn} onClick={handleAvatarClick} />
      </div>
      {pinMode ? (
        <input
          className={styles.input}
          type="password"
          value={pin}
          placeholder="_ _ _ _"
          autoFocus
          onChange={handlePinChange}
        />
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
