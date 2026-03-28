import { Contact } from '../components/Contacts';
import { calculateContactScore } from './scoring';

export interface NetworkStrengthScore {
  overallScore: number; // 0-100
  strongTieCount: number;
  weakTieCount: number;
  referralPotentialCount: number;
  targetCompanyCount: number;
  reciprocityCount: number;
  highScoringContactsPercent: number;
  averageContactScore: number;
  avgTrust: number;
  avgProximity: number;
  avgInfluence: number;
  avgTiming: number;
  avgDiscovery: number;
  avgReciprocity: number;
}

export const calculateNetworkStrength = (
  contacts: Contact[],
  completedReciprocalActions: number = 0
): NetworkStrengthScore => {
  if (contacts.length === 0) {
    return {
      overallScore: 0,
      strongTieCount: 0,
      weakTieCount: 0,
      referralPotentialCount: 0,
      targetCompanyCount: 0,
      reciprocityCount: 0,
      highScoringContactsPercent: 0,
      averageContactScore: 0,
      avgTrust: 0,
      avgProximity: 0,
      avgInfluence: 0,
      avgTiming: 0,
      avgDiscovery: 0,
      avgReciprocity: 0,
    };
  }

  const strongTieCount = contacts.filter((c) => c.role === 'strong-tie').length;
  const weakTieCount = contacts.filter((c) => c.role === 'weak-tie').length;
  const referralPotentialCount = contacts.filter((c) => c.role === 'referral-potential').length;
  const targetCompanyCount = contacts.filter((c) => c.role === 'target-company').length;
  const reciprocityCount = contacts.filter((c) => c.reciprocity === 3).length;

  const scores = contacts.map((c) => calculateContactScore(c));
  const averageContactScore = scores.reduce((a, b) => a + b, 0) / contacts.length;
  const highScoringContacts = scores.filter((s) => s >= 15).length;
  const highScoringContactsPercent = (highScoringContacts / contacts.length) * 100;

  const avgTrust = (contacts.reduce((sum, c) => sum + (c.trust || 1), 0) / contacts.length);
  const avgProximity = (contacts.reduce((sum, c) => sum + (c.opportunityProximity || 1), 0) / contacts.length);
  const avgInfluence = (contacts.reduce((sum, c) => sum + (c.influence || 1), 0) / contacts.length);
  const avgTiming = (contacts.reduce((sum, c) => sum + (c.timing || 1), 0) / contacts.length);
  const avgDiscovery = (contacts.reduce((sum, c) => sum + (c.discovery || 1), 0) / contacts.length);
  const avgReciprocity = (contacts.reduce((sum, c) => sum + (c.reciprocity || 1), 0) / contacts.length);

  // Calculate overall score (0-100)
  // Based on: contact diversity, average score, reciprocity, diversity of ties
  const diversityScore =
    (strongTieCount > 0 ? 20 : 0) +
    (weakTieCount > 0 ? 20 : 0) +
    (referralPotentialCount > 0 ? 20 : 0) +
    (targetCompanyCount > 0 ? 20 : 0) +
    (reciprocityCount > 0 ? 20 : 0);

  const scorePercentage = (averageContactScore / 18) * 40; // 40 points from contact scores
  const reciprocityBonus = Math.min(completedReciprocalActions * 2, 20); // Up to 20 points

  const overallScore = Math.min(
    Math.round(diversityScore * 0.4 + scorePercentage + reciprocityBonus),
    100
  );

  return {
    overallScore,
    strongTieCount,
    weakTieCount,
    referralPotentialCount,
    targetCompanyCount,
    reciprocityCount,
    highScoringContactsPercent: Math.round(highScoringContactsPercent),
    averageContactScore: Math.round(averageContactScore * 10) / 10,
    avgTrust: Math.round(avgTrust * 10) / 10,
    avgProximity: Math.round(avgProximity * 10) / 10,
    avgInfluence: Math.round(avgInfluence * 10) / 10,
    avgTiming: Math.round(avgTiming * 10) / 10,
    avgDiscovery: Math.round(avgDiscovery * 10) / 10,
    avgReciprocity: Math.round(avgReciprocity * 10) / 10,
  };
};

export const generateNetworkInsight = (strength: NetworkStrengthScore): string => {
  const { overallScore, strongTieCount, weakTieCount, avgReciprocity } = strength;

  if (overallScore < 30) {
    return '🌱 You\'re just starting to build your network. Focus on quality over quantity.';
  }

  if (strongTieCount > 0 && weakTieCount === 0) {
    return '🔗 Strong ties help with conversion, but weak ties are better for discovering new opportunities.';
  }

  if (weakTieCount > strongTieCount) {
    return '🌐 Your network is diverse! You have good access to new opportunities through weak ties.';
  }

  if (avgReciprocity < 1.5) {
    return '🤝 You haven\'t created value for your network yet. Help others to increase future referrals.';
  }

  if (strength.referralPotentialCount === 0) {
    return '🎯 Consider rating contacts for referral potential—they can amplify your search.';
  }

  if (strength.targetCompanyCount === 0) {
    return '🏢 You have few connections at target companies. This is your biggest opportunity.';
  }

  return '📊 Your network is well-balanced. Time to activate your top contacts.';
};
