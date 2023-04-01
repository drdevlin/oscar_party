import { Edit } from "@/components/Edit";
import { New } from "@/components/New";
import { Table } from "@/components/Table";
import { useCategoryQuery, useNomineeQuery, useNominationQuery, useSelectionQuery, useUserQuery } from "@/lib/query";

export default function Admin() {
  const nomineeQuery = useNomineeQuery();
  const userQuery = useUserQuery();
  const categoryQuery = useCategoryQuery();
  const nominationQuery = useNominationQuery();
  const selectionQuery = useSelectionQuery();

  const allNominees = nomineeQuery.data;
  const allUsers = userQuery.data;
  const allCategories = categoryQuery.data;
  const allNominations = nominationQuery.data;
  const allSelections = selectionQuery.data;

  // const movieMutation = useMovieMutation();
  // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.preventDefault();
  //   const button = event.target as HTMLButtonElement;
  //   const { form } = button;
  //   const input = Array.from(form?.children || []).find(element => element instanceof HTMLInputElement) as HTMLInputElement;
  //   movieMutation.mutateAsync({ method: 'POST', body: JSON.stringify({ title: input.value })});
  // }
  // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.preventDefault();
  //   const button = event.target as HTMLButtonElement;
  //   const { form } = button;
  //   const input = Array.from(form?.children || []).find(element => element instanceof HTMLInputElement) as HTMLInputElement;
  //   movieMutation.mutateAsync({ method: 'PATCH', body: JSON.stringify({ _id: '64188c991a46150b8483ee47', title: input.value })});
  // }
  // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.preventDefault();
  //   const button = event.target as HTMLButtonElement;
  //   const { form } = button;
  //   const input = Array.from(form?.children || []).find(element => element instanceof HTMLInputElement) as HTMLInputElement;
  //   movieMutation.mutateAsync({ method: 'DELETE', body: JSON.stringify({ _id: input.value })});
  // }

  return (
    <>
      <h1>Admin</h1>
      <h2>All Categories</h2>
      <Table records={allCategories || []} />
      <h2>Edit</h2>
      <Edit model="Category" fields={['_id', 'name', 'year']} />
      <h2>New</h2>
      <New model="Category" fields={['name', 'year']} />
      <h2>All Nominees</h2>
      <Table records={allNominees || []} />
      <h2>Edit</h2>
      <Edit model="Nominee" fields={['_id', 'name']} />
      <h2>New</h2>
      <New model="Nominee" fields={['name']} />
      <h2>All Users</h2>
      <Table records={allUsers || []} />
      <h2>Edit</h2>
      <Edit model="User" fields={['_id', 'name', 'avatar']} />
      <h2>New</h2>
      <New model="User" fields={['name', 'avatar']} />
      <h2>All Nominations</h2>
      <Table records={allNominations || []} />
      <h2>Edit</h2>
      <Edit model="Nomination" fields={['_id', 'category', 'nominee', 'win']} />
      <h2>New</h2>
      <New model="Nomination" fields={['category', 'nominee', 'win']} />
    </>
  );
}
