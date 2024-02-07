// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import TicTacToeTable from 'components/TicTacToeTable';
import ChatWindow from 'components/chatWindow';
import LeftPane from 'components/leftPane';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col md:flex-row">
        <LeftPane />

        <div className="flex-1 md:h-screen">
          <section className="flex h-full flex-col justify-end space-y-4 bg-purple-700 p-4">
            <TicTacToeTable />
          </section>
        </div>

        <ChatWindow />
      </div>
    </>
  );
}
