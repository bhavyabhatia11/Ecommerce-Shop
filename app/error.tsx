'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-auto flex h-[100vh] items-center font-serif">
      <div className="mx-auto my-auto flex max-w-xl flex-col border border-beige-light bg-white p-8 md:p-12">
        <h2 className="font-sans text-xl font-bold">Oh no!</h2>
        <p className="my-2">
          There was an issue with our storefront. This could be a temporary issue, please try your
          action again.
        </p>
        <button
          className="mx-auto mt-4 flex w-full items-center justify-center bg-secondary p-4 tracking-wider text-white hover:opacity-90"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
