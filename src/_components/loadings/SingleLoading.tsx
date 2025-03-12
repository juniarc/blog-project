export default function SingleLoading({ className }: { className: string }) {
  return (
    <div className={`${className} animate-pulse rounded bg-gray-200`}></div>
  );
}
