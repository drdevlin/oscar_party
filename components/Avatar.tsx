import { useUserStore } from '@/lib/userStore';
import classNames from 'classnames';
import styles from './Avatar.module.css';

export interface AvatarProps {
  userId: string;
  avatar: string;
}

/* Displays an emoji avatar. */
export const Avatar = ({ userId, avatar }: AvatarProps) => {
  const currentUserId = useUserStore((state) => state.userId);
  const setCurrentUserId = useUserStore((state) => state.setUserId);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (userId === currentUserId) {
      setCurrentUserId(null);
      return;
    }
    setCurrentUserId(userId);
  };

  return (
    <button
      className={classNames(
        styles.avatar,
        { [styles.signedIn]: userId === currentUserId }
      )}
      onClick={handleClick}
    >
      <span>{avatar}</span>
    </button>
  );
};
