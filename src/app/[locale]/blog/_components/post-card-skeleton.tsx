export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 rounded-lg border p-4">
      <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
