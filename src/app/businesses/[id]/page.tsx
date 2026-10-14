import { SEED_BUSINESSES } from '@/data/businesses';
import BusinessDetailClient from './BusinessDetailClient';

export function generateStaticParams() {
  return SEED_BUSINESSES.map((b) => ({ id: b.id }));
}

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  return <BusinessDetailClient id={params.id} />;
}
