import React, { useState } from 'react';

interface GuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidanceItem {
  title: string;
  emoji: string;
  statistic: string;
  citation: string;
  description: string;
  tooltip: string;
}

const guidanceItems: GuidanceItem[] = [
  {
    title: 'Spray & Pray Applications',
    emoji: '📧',
    statistic: 'Networking explained additional job offers beyond online applications in a study of 1,177 job seekers',
    citation: 'Van Hoye et al., 2009',
    description: 'Apply to jobs blindly → Lower effectiveness',
    tooltip: 'In a study of 1,177 job seekers, networking explained additional job offers beyond online applications and job boards.',
  },
  {
    title: 'Relying Only on Strong Ties',
    emoji: '👥',
    statistic: 'Weak ties intervention led to 41% job placement',
    citation: 'Sharabi & Simonovich, 2017',
    description: "Only talk to people you already know well → Miss new opportunities",
    tooltip: 'In one intervention, activating weaker ties led to 41% of participants finding jobs.',
  },
  {
    title: 'Ignoring Referrals',
    emoji: '🎯',
    statistic: 'Referred hires had 15% longer tenure',
    citation: 'Lalanne & Levati, 2020',
    description: 'Applying without connections or referrals → Lower match quality',
    tooltip: 'Referred hires stayed 15% longer, suggesting better job matches and stronger hiring outcomes.',
  },
  {
    title: 'Untargeted Networking',
    emoji: '🎲',
    statistic: 'Networking effectiveness depends on network quality and relevance, not just activity',
    citation: 'Van Hoye et al., 2009',
    description: 'Random networking without a target → Lower impact',
    tooltip: 'Networking is more effective when contacts are relevant and well-positioned.',
  },
  {
    title: 'Ignoring Weak Ties',
    emoji: '🔗',
    statistic: 'Weak ties provide non-redundant information and better opportunity discovery',
    citation: 'Greenberg & Fernandez, 2016',
    description: 'Staying in the same network circle → Fewer opportunities',
    tooltip: "Weak ties expose you to new opportunities your close network doesn't have.",
  },
  {
    title: 'Ignoring Timing',
    emoji: '⏰',
    statistic: 'Networks influence when opportunities appear, not just access',
    citation: 'Castilla et al., 2013',
    description: 'Reaching out at random times → Lower success',
    tooltip: 'Many opportunities emerge through networks before or early in formal hiring.',
  },
];

const GuidanceModal: React.FC<GuidanceModalProps> = ({ isOpen, onClose }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>🚫 What NOT to do</h2>
          <p>Research-backed pitfalls to avoid in your job search</p>
        </div>

        <div className="modal-body">
          <div className="guidance-items-list">
            {guidanceItems.map((item, index) => (
              <div
                key={index}
                className="guidance-item"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="guidance-item-header">
                  <span className="guidance-emoji">{item.emoji}</span>
                  <div className="guidance-item-title">
                    <h3>{item.title}</h3>
                    <p className="guidance-description">{item.description}</p>
                  </div>
                </div>
                <div className="guidance-item-stat">
                  <p className="stat-text">{item.statistic}</p>
                  <p className="citation">({item.citation})</p>
                </div>
                {hoveredIndex === index && (
                  <div className="guidance-tooltip">{item.tooltip}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
};

export default GuidanceModal;
