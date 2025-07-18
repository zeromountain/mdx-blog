import './blog-detail.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="blogDetailLayout">{children}</div>;
}
