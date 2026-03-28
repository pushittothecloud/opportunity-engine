import { Contact } from '../components/Contacts';
import { TOOLTIPS } from './tooltips';

export type ActionType = 'discover' | 'validate' | 'convert' | 'give-value';

export const determineActionType = (contact: Contact): ActionType => {
  const discovery = contact.discovery || 1;
  const trust = contact.trust || 1;
  const influence = contact.influence || 1;
  const reciprocity = contact.reciprocity || 1;

  // If high reciprocity opportunity, prioritize giving value
  if (reciprocity >= 3 && reciprocity >= trust) {
    return 'give-value';
  }

  // Highest value determines the action type
  if (discovery >= trust && discovery >= influence && discovery > 1) {
    return 'discover';
  }
  if (trust >= influence && trust > discovery && trust > 1) {
    return 'validate';
  }
  if (influence > discovery && influence > trust && influence > 1) {
    return 'convert';
  }

  // Default based on basic scoring
  if (trust > 2) return 'validate';
  if (influence > 2) return 'convert';
  return 'discover';
};

export const getActionTypeLabel = (type: ActionType): string => {
  switch (type) {
    case 'discover':
      return 'Discover';
    case 'validate':
      return 'Validate';
    case 'convert':
      return 'Convert';
    case 'give-value':
      return 'Give Value';
  }
};

export const getActionTypeColor = (type: ActionType): string => {
  switch (type) {
    case 'discover':
      return '#7c5cdb';
    case 'validate':
      return '#22863a';
    case 'convert':
      return '#cb2431';
    case 'give-value':
      return '#f59e0b';
  }
};

export const getActionTypeEmoji = (type: ActionType): string => {
  switch (type) {
    case 'discover':
      return '🔍';
    case 'validate':
      return '✅';
    case 'convert':
      return '🎯';
    case 'give-value':
      return '🔄';
  }
};

export const getReasonForContact = (contact: Contact): string => {
  const reasons: string[] = [];

  if (contact.reciprocity === 3) reasons.push('High reciprocity potential');
  if (contact.trust === 3) reasons.push('High trust');
  if (contact.opportunityProximity === 3) reasons.push('At target company');
  if (contact.influence === 3) reasons.push('Can refer');
  if (contact.timing === 3) reasons.push('Perfect timing');
  if (contact.discovery === 3) reasons.push('Unique insights');

  if (reasons.length === 0) {
    if (contact.reciprocity === 2) reasons.push('Can help indirectly');
    if (contact.trust === 2) reasons.push('Moderate trust');
    if (contact.opportunityProximity === 2) reasons.push('Related company');
    if (contact.influence === 2) reasons.push('Can help');
  }

  return reasons[0] || 'Strong connection';
};

export const getActionTypeTooltip = (type: ActionType): string => {
  switch (type) {
    case 'discover':
      return TOOLTIPS.WEAK_TIE_OUTREACH;
    case 'validate':
      return TOOLTIPS.STRONG_TIE_OUTREACH;
    case 'convert':
      return TOOLTIPS.REFERRAL_REQUEST;
    case 'give-value':
      return TOOLTIPS.GIVE_VALUE_ACTION;
  }
};
