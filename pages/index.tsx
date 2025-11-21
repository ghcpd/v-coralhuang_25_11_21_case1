import Head from 'next/head';
import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('../components/TodoApp'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>To-Do List</title>
        <meta
          name="description"
          content="A modern to-do list built with Next.js and Tailwind CSS"
        />
      </Head>
      <TodoApp />
    </>
  );
}
