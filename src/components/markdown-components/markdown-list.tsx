export const MarkdownList = ({ children }: { children: React.ReactNode }) => {
  return <li className="my-1 list-disc p-0 text-sm text-black dark:text-gray-100">{children}</li>;
};
