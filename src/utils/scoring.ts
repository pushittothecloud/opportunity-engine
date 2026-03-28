import { Contact } from '../components/Contacts';

export const calculateContactScore = (contact: Contact): number => {
  const trust = contact.trust || 1;
  const proximity = contact.opportunityProximity || 1;
  const influence = contact.influence || 1;
  const timing = contact.timing || 1;
  const discovery = contact.discovery || 1;
  const reciprocity = contact.reciprocity || 1; // NEW

  return trust + proximity + influence + timing + discovery + reciprocity;
};

export const getScoreColor = (score: number): string => {
  if (score >= 15) return 'high'; // 6-18 scale
  if (score >= 11) return 'medium';
  return 'low';
};

export const getScoreLabel = (score: number): string => {
  if (score >= 15) return '🔥 High Priority';
  if (score >= 11) return '⭐ Medium Priority';
  return '📌 Low Priority';
};
