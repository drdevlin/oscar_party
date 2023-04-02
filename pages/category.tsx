import { useRouter } from 'next/router';
import { useNominationQuery, useSelectionQuery } from '@/lib/query';
import { Category } from '@/components/Category';

/* The category page displays all the nominees for a category. */
/* In a radio-style, it displays the selection of a user. */
/* TODO: If the user matches the signed in user, */
/* you can change the selection. */
export default function CategoryPage() {
  // Get the category id and user id from the url search params.
  const query = useRouter().query;
  const [categoryId] = Array.isArray(query.id) ? query.id : [query.id];
  const [userId] = Array.isArray(query.user) ? query.user : [query.user];

  // Fetch the nominations for the category (if there is one).
  const nominationQuery = useNominationQuery({
    body: JSON.stringify({ category: categoryId }),
  }, { enabled: !!categoryId });
  const nominations = nominationQuery.data || [];

  // Fetch the selections of the user (if there is one).
  const selectionQuery = useSelectionQuery({
    body: JSON.stringify({ user: userId }),
  }, { enabled: !!userId });
  const userSelections = selectionQuery.data || [];

  // Extract the selection for this category.
  const userSelection = userSelections.find((selection) => selection.nomination.category._id === categoryId);

  // Calculated Props
  const categoryName = nominations.length ? nominations[0].category.name : '';

  return (
    <main>
      {!!categoryId && !!userId && (
        <>
          <h1>{categoryName}</h1>
          {!!nominations.length && (
            <Category
              userId={userId}
              nominations={nominations}
              selection={userSelection}
            />
          )}
        </>
      )}
    </main>
  )
}
