import { User } from '@/components/User';
import { useUserQuery } from '@/lib/query';
import Head from 'next/head';

export default function Home() {
  const userQuery = useUserQuery();
  const users = userQuery.data;

  return (
    <>
      <Head>
        <title>Oscar Party</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Users</h1>
        {
          users &&
          users.map((user) => (user._id &&
            <User key={user._id} id={user._id} name={user.name} avatar={user.avatar} />
          ))
        }
      </main>
    </>
  )
}
