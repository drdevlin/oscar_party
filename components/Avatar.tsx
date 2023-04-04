import classNames from 'classnames';
import styles from './Avatar.module.css';

export interface AvatarProps {
  avatar: string;
  isSignedIn?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/* Displays an emoji avatar. */
export const Avatar = ({ avatar, isSignedIn, onClick }: AvatarProps) => {
  

  return (
    <button
      className={classNames(
        styles.avatar,
        { [styles.signedIn]: isSignedIn }
      )}
      onClick={onClick}
    >
      <span>{avatar}</span>
    </button>
  );
};
