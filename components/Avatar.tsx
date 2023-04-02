import styles from './Avatar.module.css';

export interface AvatarProps {
  avatar: string;
}

/* Displays an emoji avatar. */
export const Avatar = ({ avatar }: AvatarProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event);
  };

  return (
    <button className={styles.avatar} onClick={handleClick}>
      <span>{avatar}</span>
    </button>
  );
};
