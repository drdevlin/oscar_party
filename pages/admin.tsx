import {
  useCategoryQuery,
  useNomineeQuery,
  useNominationQuery,
  useUserQuery
} from "@/lib/query";
import { Edit } from "@/components/Edit";
import { New } from "@/components/New";
import { Table } from "@/components/Table";

/* A very rough admin page for adding and editing documents. */
export default function Admin() {
  const nomineeQuery = useNomineeQuery();
  const userQuery = useUserQuery();
  const categoryQuery = useCategoryQuery();
  const nominationQuery = useNominationQuery();

  const allNominees = nomineeQuery.data;
  const allUsers = userQuery.data;
  const allCategories = categoryQuery.data;
  const allNominations = nominationQuery.data;

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
