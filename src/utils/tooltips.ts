// Comprehensive tooltip system with research-backed messaging
// All tooltips are short, include hard numbers when available, and clean citations

export const TOOLTIPS = {
  // CORE DIMENSIONS (Primary Sliders)
  WEAK_TIES: {
    label: '41% ↑',
    tooltip:
      'In one intervention, activating weak ties led to 41% of participants finding jobs (Sharabi & Simonovich, 2017). Weak ties provide access to opportunities outside your immediate network.',
  },
  REFERRALS: {
    label: '+15% tenure',
    tooltip:
      'Referred hires had 15% longer tenure, suggesting better job matches and stronger hiring outcomes (Lalanne & Levati, 2020). Referrals also improve how candidates are evaluated.',
  },
  STRONG_TIES: {
    label: 'High impact',
    tooltip:
      "Strong ties (people you've worked closely with) are more likely to lead to real opportunities and referrals, especially in later hiring stages (Porter et al., 2022).",
  },
  PROXIMITY: {
    label: 'Proven advantage',
    tooltip:
      'Contacts closer to hiring teams are more effective. Networking adds value beyond online applications, especially with relevant contacts (Van Hoye et al., 2009, n=1,177).',
  },
  TIMING: {
    label: 'Critical',
    tooltip:
      'Networks influence when opportunities appear, not just access. Many roles are filled before or early in formal hiring processes (Castilla et al., 2013).',
  },
  RECIPROCITY: {
    label: 'Network multiplier',
    tooltip:
      'Helping others (referrals, endorsements, introductions) builds trust and increases the likelihood of future support through reciprocity.',
  },

  // SECONDARY / SUPPORTING TOOLTIPS
  NETWORKING_VS_APPLYING: 'Networking provides additional access to job opportunities beyond online applications and job boards (Van Hoye et al., 2009).',
  HIDDEN_JOB_MARKET:
    'Many opportunities are shared through networks rather than publicly posted, making connections a key source of job information.',
  REFERRALS_MECHANISM:
    'Referrals improve how candidates present themselves and signal fit to employers, increasing perceived alignment (Campero & Kacperczyk, 2023).',
  WEAK_VS_STRONG_TIES:
    'Weak ties are better for discovering new opportunities, while strong ties are more effective for securing offers.',
  NETWORK_QUALITY_VS_QUANTITY:
    'The effectiveness of networking depends more on the quality and relevance of contacts than the size of your network (Van Hoye et al., 2009).',
  INFORMATION_ADVANTAGE: 'Connections provide access to non-public information about roles, teams, and hiring needs.',
  INFLUENCE_MECHANISM: 'Some contacts can directly influence hiring decisions through referrals or advocacy.',
  RECIPROCITY_BEHAVIOR: 'Networks operate on mutual exchange—people are more likely to help those who have helped them.',
  INEQUALITY_NOTE:
    'Not all job seekers benefit equally from networks—access and outcomes can vary across groups (Pedulla & Pager, 2019).',

  // ACTION-LEVEL TOOLTIPS (Weekly Plan)
  OUTREACH_GENERAL: 'Targeted outreach to relevant contacts is more effective than high-volume, untargeted applications.',
  STRONG_TIE_OUTREACH: 'Reconnecting with strong ties increases the likelihood of meaningful responses and referrals.',
  WEAK_TIE_OUTREACH: 'Weak ties are especially useful for discovering new opportunities and expanding your search.',
  REFERRAL_REQUEST: 'Referrals increase visibility and improve how candidates are evaluated in hiring processes.',
  GIVE_VALUE_ACTION:
    'Helping others (e.g., endorsements or referrals) strengthens relationships and increases future opportunities.',
  INTERNAL_NETWORKING: 'Connections within your current organization can improve access to internal opportunities and promotions.',

  // PROGRESS / INSIGHT TOOLTIPS
  PROGRESS_BAR: 'Consistent, targeted actions are more effective than sporadic, high-volume efforts.',
  INSIGHT_WEAK_TIE_GAP: 'You may be underutilizing weak ties, which are important for discovering new opportunities.',
  INSIGHT_STRONG_TIE_BIAS: 'Strong ties help with conversion, but relying only on them may limit new opportunities.',
  INSIGHT_LOW_PROXIMITY: 'Few of your contacts are close to target companies, which may reduce access to opportunities.',

  // OPTIONAL (ADVANCED / POWER USER MODE)
  NETWORK_EFFECTS:
    'Your network influences both current opportunities and long-term career outcomes through accumulated connections.',
  SOCIAL_CAPITAL: 'Social capital refers to the value of your relationships and their ability to provide information, influence, and opportunities.',
};

// Helper function to get tooltip for a dimension
export const getTooltipForDimension = (dimension: string): { label: string; tooltip: string } | null => {
  switch (dimension) {
    case 'discovery':
    case 'weak-ties':
      return TOOLTIPS.WEAK_TIES;
    case 'influence':
    case 'referrals':
      return TOOLTIPS.REFERRALS;
    case 'trust':
    case 'strong-ties':
      return TOOLTIPS.STRONG_TIES;
    case 'proximity':
    case 'opportunity-proximity':
      return TOOLTIPS.PROXIMITY;
    case 'timing':
      return TOOLTIPS.TIMING;
    case 'reciprocity':
      return TOOLTIPS.RECIPROCITY;
    default:
      return null;
  }
};
