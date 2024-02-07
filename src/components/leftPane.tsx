import { signOut, useSession } from 'next-auth/react';

export default function LeftPane() {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <section className="flex w-full flex-col bg-gray-800 md:w-72">
      <div className="flex-1 overflow-y-hidden">
        <div className="flex h-full flex-col divide-y divide-gray-700">
          <header className="p-4">
            <h1 className="text-3xl font-bold text-gray-50">Tic Tac Toe</h1>
            <p className="text-sm text-gray-400">
              Built using TRPC + NextJs + Prisma + NextAuth
              <br />
              <a
                className="text-gray-100 underline"
                href="https://github.com/sumanthneerumalla/ttt"
                target="_blank"
                rel="noreferrer"
              >
                View Source on GitHub
              </a>
            </p>
          </header>
          <div className="hidden flex-1 space-y-6 overflow-y-auto p-4 text-gray-400 md:block">
            {userName && (
              <article>
                <h2 className="text-lg text-gray-200">User information</h2>
                <ul className="space-y-2">
                  <li className="text-lg">
                    You&apos;re{' '}
                    <input
                      id="name"
                      name="name"
                      type="text"
                      disabled
                      className="bg-transparent"
                      value={userName}
                    />
                  </li>
                  <li>
                    <button onClick={() => signOut()}>Sign Out</button>
                  </li>
                </ul>
              </article>
            )}
          </div>
        </div>
      </div>
      <div className="hidden h-16 shrink-0 md:block"></div>
    </section>
  );
}
