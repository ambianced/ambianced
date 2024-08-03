import Link from "next/link";

export function ApolloIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Link
      href="/api/graphql"
      className="fixed bottom-1 right-1 z-50 flex items-center justify-center rounded-full bg-primary p-3 font-mono text-xs"
    >
      GraphQL
    </Link>
  );
}
