import { Contact } from '../components/Contacts';
import { calculateContactScore } from './scoring';
import { TOOLTIPS } from './tooltips';

export interface ProgressStats {
  totalContacts: number;
  highPriorityContacts: number;
  completedActions: number;
  avgScore: number;
  strongTies: number;
  weakTies: number;
  mediumTies: number;
}

export const calculateProgressStats = (contacts: Contact[], completedIds: Set<string>): ProgressStats => {
  const totalContacts = contacts.length;
  const highPriorityContacts = contacts.filter(c => calculateContactScore(c) >= 13).length;
  const completedActions = completedIds.size;

  const scores = contacts.map(c => calculateContactScore(c));
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  // Categorize ties by average score
  const strongTies = contacts.filter(c => {
    const score = calculateContactScore(c);
    return (c.trust === 3 || c.trust === 2) && score >= 10;
  }).length;

  const weakTies = contacts.filter(c => {
    const score = calculateContactScore(c);
    return (c.discovery === 3 || c.discovery === 2) && score <= 8;
  }).length;

  const mediumTies = totalContacts - strongTies - weakTies;

  return {
    totalContacts,
    highPriorityContacts,
    completedActions,
    avgScore,
    strongTies,
    weakTies,
    mediumTies,
  };
};

export const generateInsight = (stats: ProgressStats): string => {
  const { totalContacts, strongTies, weakTies, avgScore, highPriorityContacts } = stats;

  if (totalContacts === 0) {
    return 'Start building your network by adding contacts in Brain Dump.';
  }

  const strongTiesPercent = totalContacts > 0 ? Math.round((strongTies / totalContacts) * 100) : 0;
  const weakTiesPercent = totalContacts > 0 ? Math.round((weakTies / totalContacts) * 100) : 0;

  // Rule-based insights
  if (strongTiesPercent > 80) {
    return '🔗 You are relying heavily on strong ties. Consider reaching out to more weak ties for fresh opportunities.';
  }

  if (weakTiesPercent > 60) {
    return '🌟 You may be underusing strong ties. Don\'t forget about your closest contacts—they can be powerful allies.';
  }

  if (highPriorityContacts === 0 && totalContacts > 0) {
    return '📈 Work on strengthening your network by rating your contacts. Higher scores mean better outreach targets.';
  }

  if (avgScore > 12) {
    return '🚀 Excellent network quality! Your contacts are highly rated and ready for outreach.';
  }

  if (highPriorityContacts > 0 && highPriorityContacts <= 3) {
    return '⭐ You have solid high-priority contacts. Focus on them this week for maximum impact.';
  }

  return '💡 Keep building relationships. Diverse connections lead to better opportunities.';
};

export const getInsightTooltip = (insight: string): string | null => {
  if (insight.includes('strong ties')) {
    return TOOLTIPS.INSIGHT_STRONG_TIE_BIAS;
  }
  if (insight.includes('weak ties')) {
    return TOOLTIPS.INSIGHT_WEAK_TIE_GAP;
  }
  if (insight.includes('rating your contacts')) {
    return TOOLTIPS.NETWORK_QUALITY_VS_QUANTITY;
  }
  if (insight.includes('Excellent network quality')) {
    return TOOLTIPS.WEAK_VS_STRONG_TIES;
  }
  return null;
};

export const getProgressPhraseTooltip = (): string => {
  return TOOLTIPS.PROGRESS_BAR;
};

export const getProgressPercent = (completed: number, total: number = 5): number => {
  return Math.min(Math.round((completed / total) * 100), 100);
};
