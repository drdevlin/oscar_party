import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useCategoryQuery, useSelectionQuery, useUserQuery } from '@/lib/query';
import { Selection } from '@/components/Selection';

import { useUserStore } from '@/lib/userStore';

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
  const title = user ? `${user.name}'s Picks` : 'No User';
  const isSignedIn = user && user._id === signedInUserId;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {
          !!user &&
            <>
              <Link href="/">
                <h1>{user.name}</h1>
              </Link>
              {
                !!allCategories.length &&
                  allCategories.map((category) => (
                    <Selection 
                      key={category._id}
                      category={category}
                      userId={userId || ''}
                      userSelections={userSelections}
                      isSignedIn={isSignedIn}
                    /> 
                  ))
              }
            </>
        }
      </main>
    </>
  );
}
