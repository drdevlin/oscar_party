import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCategoryQuery, useSelectionQuery, useUserQuery } from '@/lib/query';
import { Selection } from '@/components/Selection';
import { Item } from '@/components/Item';

import styles from '@/styles/SelectionPage.module.css';
import { useUserStore } from '@/lib/userStore';
import classNames from 'classnames';

/* The selection page displays all the nominee selections for a user by category. */
/* If the user matches the signed in user, */
/* tapping a selection takes you to the category page. */
export default function SelectionPage() {
  // Get the user id from the url search params.
  const query = useRouter().query;
  const [userId] = Array.isArray(query.user) ? query.user : [query.user];

  // Get signed-in user id.
  const signedInUserId = useUserStore((state) => state.userId);

  // Fetch that user (if there is one).
  const userQuery = useUserQuery({
    body: JSON.stringify({ id: userId }),
  }, { enabled: !!userId });
  const [user] = userQuery.data || [];

  // Fetch that user's selections (if there is one).
  const selectionQuery = useSelectionQuery({
    body: JSON.stringify({ user: userId }),
  }, { enabled: !!userId });
  const userSelections = selectionQuery.data || [];

  // Fetch all the categories.
  const categoryQuery = useCategoryQuery();
  const allCategories = categoryQuery.data || [];

  // Calculated Props
  const isUser = Boolean(user && user._id && user.name);
  const isSignedIn = isUser && user._id === signedInUserId;

  return (
    <main>
      {isUser && (
        <>
          <Link href="/">
            <h1>{user.name}</h1>
          </Link>
          {
            !!allCategories.length &&
              allCategories.map((category) => {
                const selection = userSelections.find(({ nomination }) => nomination.category._id === category._id);
                return !!user._id && (
                  <Item key={category._id}>
                    <Link
                      className={classNames(
                        styles.selectionLink,
                        { [styles.linkDisabled]: !isSignedIn },
                      )}
                      href={`/category?id=${category._id}&user=${userId}`}
                    >
                      <Selection
                        userId={user._id}
                        category={category}
                        nominee={selection?.nomination.nominee}
                        win={!!selection?.nomination.win}
                      />
                    </Link>
                  </Item>
                );
              })
          }
        </>
      )}
    </main>
  );
}
