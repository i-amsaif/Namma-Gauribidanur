import { SEED_OFFICIALS } from '@/data/officials';
import OfficialDetailClient from './OfficialDetailClient';

export function generateStaticParams() {
  return SEED_OFFICIALS.map((o) => ({ id: o.id }));
}

export default function OfficialDetailPage({ params }: { params: { id: string } }) {
  return <OfficialDetailClient id={params.id} />;
}
