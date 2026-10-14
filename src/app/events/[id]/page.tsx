import { SEED_EVENTS } from '@/data/events';
import EventDetailClient from './EventDetailClient';

export function generateStaticParams() {
  return SEED_EVENTS.map((e) => ({ id: e.id }));
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return <EventDetailClient id={params.id} />;
}
