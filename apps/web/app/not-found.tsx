import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-neutral-600">This page could not be found.</p>
      <Link href="/" className="text-primary-600 underline">
        Go home
      </Link>
    </div>
  );
}
