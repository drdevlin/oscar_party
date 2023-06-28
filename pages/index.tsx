import { useContext, useState } from 'react';
import { useTallyQuery } from '@/lib/query';
import { OscarPartyHead } from '@/components/OscarPartyHead';
import { User } from '@/components/User';
import { NewUser } from '@/components/NewUser';
import { Unauthorized, UnauthorizedContext } from '@/components/Unauthorized';

import type { Tally } from '@/types';

import styles from '@/styles/HomePage.module.css';

/* The home page displays all users. */
/* Tapping on a user takes you to the selection page. */
export default function Home() {
  // Context
  const { isVisible: unauthorizedVisibility } = useContext(UnauthorizedContext);

  // State
  const [showNewUser, setShowNewUser] = useState(false);
  
  // Queries
  const tallyQuery = useTallyQuery();
  const tallies = tallyQuery.data || [];
  
  // Handlers
  const handleAddNewUserClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowNewUser(true);
  }
  
  const handleNewUserClose: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowNewUser(false);
  };

  return (
    <>
      <OscarPartyHead />
      <main>
        <h1>Users</h1>
        {!!tallies.length && <Users tallies={tallies} />}
        {
          showNewUser ? (
            <NewUser onCancel={handleNewUserClose} onSubmit={handleNewUserClose} />
          ) : (
            <PlusButton onClick={handleAddNewUserClick} />
          )
        }
      </main>
      {unauthorizedVisibility && <Unauthorized />}
    </>
  )
}

// Subcomponents
interface UsersProps {
  tallies: Tally[];
}
const Users = ({ tallies }: UsersProps) => {
  const users = tallies.map(({ user }) => user);
  const winners = tallies
    .filter(({ score }, _, [firstTally]) => score === firstTally.score)
    .map(({ user }) => user);

  return (
    <>
      {
        users.map((user) => (
          <User
            key={user._id}
            id={user._id}
            name={user.name + (winners.includes(user) ? ' 🏆' : '')}
            avatar={user.avatar}
          />
        ))
      }
    </>
  );
};

interface PlusButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const PlusButton = ({ onClick }: PlusButtonProps) => {
  return (
    <button className={styles.addNewUser} onClick={onClick}>
      <svg className={styles.plus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    </button>
  );
};
