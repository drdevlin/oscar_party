import { useRouter } from 'next/router';
import { useNominationQuery, useSelectionQuery } from '@/lib/query';
import { Category } from '@/components/Category';

export default function CategoryPage() {
  const query = useRouter().query;
  const categoryId = Array.isArray(query.id) ? query.id?.[0] : (query.id || undefined);
  const userId = Array.isArray(query.user) ? query.user?.[0] : (query.user || undefined);

  const nominationQuery = useNominationQuery({
    body: JSON.stringify({ category: categoryId }),
  }, { enabled: !!categoryId });
  const nominations = nominationQuery.data;
  const categoryName = nominations && nominations?.[0]?.category?.name;

  const selectionQuery = useSelectionQuery({
    body: JSON.stringify({ user: userId }),
  }, { enabled: !!userId });
  const selections = selectionQuery.data;
  const selection = selections && selections.find((selection) => selection.nomination.category._id === categoryId);

  return (
    <main>
      <h1>{categoryName}</h1>
      {!!nominations?.length && userId && <Category userId={userId} nominations={nominations} selection={selection || undefined} />}
    </main>
  )
}
