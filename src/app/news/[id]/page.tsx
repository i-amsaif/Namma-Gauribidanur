import { SEED_NEWS } from '@/data/news';
import NewsDetailClient from './NewsDetailClient';

export function generateStaticParams() {
  return SEED_NEWS.map((n) => ({ id: n.id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return <NewsDetailClient id={params.id} />;
}
