import { useContext, useState } from 'react';
import { useTallyQuery } from '@/lib/query';
import { OscarPartyHead } from '@/components/OscarPartyHead';
import { User } from '@/components/User';
import { NewUser } from '@/components/NewUser';
import { Unauthorized, UnauthorizedContext } from '@/components/Unauthorized';
import { PlusButton } from '@/components/PlusButton';

import type { Tally } from '@/types';

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
