import { SEED_COMPLAINTS } from '@/data/complaints';
import IssueDetailClient from './IssueDetailClient';

export function generateStaticParams() {
  return SEED_COMPLAINTS.map((c) => ({ id: c.id }));
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  return <IssueDetailClient id={params.id} />;
}
