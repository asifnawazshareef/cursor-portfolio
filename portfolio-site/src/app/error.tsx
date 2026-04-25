"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="container-max py-20">
      <div className="glass rounded-3xl p-10">
        <h1 className="text-2xl font-bold text-rose-300">Something went wrong</h1>
        <p className="mt-3 text-slate-300">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-accent px-5 py-3 font-medium text-slate-950"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
