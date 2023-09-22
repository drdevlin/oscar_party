import { useRouter } from 'next/router';
import Link from 'next/link';
import { useNominationQuery, useSelectionQuery } from '@/lib/query';
import { useUserStore } from '@/lib/userStore';
import { Category } from '@/components/Category';
import { OscarPartyHead } from '@/components/OscarPartyHead';
import { AnimatePresence } from 'framer-motion';
import { Placeholder } from '@/components/Placeholder';

/* The category page displays all the nominees for a category. */
/* In a radio-style, it displays the selection of a user. */
/* If the user matches the signed in user, */
/* you can change the selection. */
export default function CategoryPage() {
  // Get the category id and user id from the url search params.
  const query = useRouter().query;
  const [categoryId] = Array.isArray(query.id) ? query.id : [query.id];
  const [userId] = Array.isArray(query.user) ? query.user : [query.user];

  // Get signed-in user id.
  const signedInUserId = useUserStore((state) => state.userId);
  const isSignedIn = userId === signedInUserId;

  // Fetch the nominations for the category (if there is one).
  const nominationQuery = useNominationQuery({
    body: JSON.stringify({ category: categoryId }),
  }, { enabled: !!categoryId && isSignedIn });
  const nominations = nominationQuery.data || [];

  // Fetch the selections of the user (if there is one).
  const selectionQuery = useSelectionQuery({
    body: JSON.stringify({ user: userId }),
  }, { enabled: !!userId && isSignedIn });
  const userSelections = selectionQuery.data || [];

  // Extract the selection for this category.
  const userSelection = userSelections.find((selection) => selection.nomination.category._id === categoryId);

  // Calculated Props
  const categoryName = nominations.length ? nominations[0].category.name : '';

  return (
    <>
      <OscarPartyHead />
      <main>
        {
          !!categoryId && !!userId &&
            <>
              <Link href={`/selection?user=${userId}`}>
                <h1>{categoryName}</h1>
              </Link>
              <AnimatePresence mode="popLayout">
                {
                  nominations.length ? (
                    <Category
                      key="category"
                      userId={userId}
                      nominations={nominations}
                      selection={userSelection}
                    />
                  ) : (
                    <Placeholder key="placeholder"/>
                  )
                }
              </AnimatePresence>
            </>
        }
      </main>
    </>
  );
}
