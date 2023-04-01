import { useRouter } from "next/router";
import { useCategoryQuery, useSelectionQuery, useUserQuery } from "@/lib/query";
import { Nomination } from "@/components/Nomination";

export default function SelectionPage() {
  const query = useRouter().query;
  const userId = Array.isArray(query.user) ? query.user?.[0] : (query.user || undefined);

  const categoryQuery = useCategoryQuery();
  const categories = categoryQuery.data;

  const userQuery = useUserQuery({
    body: JSON.stringify({ id: userId }),
  });
  const [user] = userQuery.data || [];

  const selectionQuery = useSelectionQuery({
    body: JSON.stringify({ user: userId }),
  });
  const selections = selectionQuery.data;

  return (
    <main>
      {user && (
        <>
          <h1>{user.name}</h1>
          {
            categories &&
            categories.map((category) => {
              const selection = selections?.find(({ nomination }) => nomination.category._id === category._id);
              return (
                <Nomination
                  key={category._id}
                  nominee={selection?.nomination.nominee}
                  category={category}
                  win={!!selection?.nomination.win}
                  user={user._id}
                />
              );
            })
          }
        </>
      )}
    </main>
  );
}
