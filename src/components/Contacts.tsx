import React, { useState } from 'react';
import { calculateContactScore, getScoreColor, getScoreLabel } from '../utils/scoring';
import {
  generateLinkedInSearchUrl,
  generateCompanySearchUrl,
  generateCalendarUrl,
  openUrl,
} from '../utils/actions';
import { TOOLTIPS } from '../utils/tooltips';

export type ContactRole = 'strong-tie' | 'weak-tie' | 'referral-potential' | 'target-company' | 'reciprocity-opportunity';

const roleConfig: Record<ContactRole, { label: string; color: string; emoji: string }> = {
  'strong-tie': { label: 'Strong Tie', color: 'blue', emoji: '🤝' },
  'weak-tie': { label: 'Weak Tie', color: 'green', emoji: '🌐' },
  'referral-potential': { label: 'Referral Potential', color: 'purple', emoji: '🎯' },
  'target-company': { label: 'Target Company', color: 'amber', emoji: '🏢' },
  'reciprocity-opportunity': { label: 'Reciprocity Opportunity', color: 'pink', emoji: '🔄' },
};

interface RankingSliderProps {
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
  evidence?: string;
  metric?: string; // e.g., "41% ↑", "+15%", "High impact"
}

const RankingSlider: React.FC<RankingSliderProps> = ({ label, hint, value, onChange, evidence, metric }) => {
  return (
    <div className="ranking-slider">
      <div className="slider-header">
        <div className="slider-label-wrapper">
          <label className="slider-label">{label}</label>
          {evidence && (
            <div className="info-icon-wrapper">
              <span className="info-icon">ℹ️</span>
              <div className="tooltip">{evidence}</div>
            </div>
          )}
        </div>
        <div className="slider-metric-wrapper">
          {metric && <span className="slider-metric">{metric}</span>}
          <span className="slider-hint">{hint}</span>
        </div>
      </div>
      <div className="slider-controls">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            className={`slider-dot-button ${level === value ? 'active' : ''}`}
            onClick={() => onChange(level)}
            title={`Level ${level}`}
          >
            <div className={`slider-dot ${level === value ? 'filled' : ''}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

interface RoleTagProps {
  role?: ContactRole;
}

const RoleTag: React.FC<RoleTagProps> = ({ role }) => {
  if (!role) return null;
  const config = roleConfig[role];
  
  return (
    <div className={`role-tag role-${config.color}`}>
      <span className="role-emoji">{config.emoji}</span>
      {roleConfig[role].label}
    </div>
  );
};

interface ActionButtonsProps {
  contact: Contact;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ contact }) => {
  return (
    <div className="contact-actions">
      {contact.linkedinUrl && (
        <button
          className="action-button action-linkedin"
          onClick={(e) => {
            e.stopPropagation();
            openUrl(contact.linkedinUrl!);
          }}
          title="View LinkedIn profile"
        >
          🔗 LinkedIn
        </button>
      )}

      {contact.company && (
        <button
          className="action-button action-search"
          onClick={(e) => {
            e.stopPropagation();
            openUrl(generateLinkedInSearchUrl(contact.company!));
          }}
          title="Search for employees at this company on LinkedIn"
        >
          👥 Team
        </button>
      )}

      {contact.company && (
        <button
          className="action-button action-search"
          onClick={(e) => {
            e.stopPropagation();
            openUrl(generateCompanySearchUrl(contact.company!));
          }}
          title="Find connections at this company"
        >
          🏢 Company
        </button>
      )}

      <button
        className="action-button action-calendar"
        onClick={(e) => {
          e.stopPropagation();
          openUrl(generateCalendarUrl(contact));
        }}
        title="Schedule outreach on Google Calendar"
      >
        📅 Schedule
      </button>
    </div>
  );
};

interface RankingDisplayProps {
  label: string;
  value: number;
  hint: string;
}

const RankingDisplay: React.FC<RankingDisplayProps> = ({ label, value }) => {
  return (
    <div className="ranking-item">
      <div className="ranking-label">{label}</div>
      <div className="ranking-dots">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`ranking-dot ${dot === value ? 'active' : ''} ${
              dot < value ? 'filled' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export interface Contact {
  id: string;
  name: string;
  company?: string;
  linkedinUrl?: string;
  notes?: string;
  category?: string;
  role?: ContactRole;
  // Ranking sliders (1-3 scale)
  trust?: number;
  opportunityProximity?: number;
  influence?: number;
  timing?: number;
  discovery?: number;
  reciprocity?: number; // NEW: Can you help them?
}

interface ContactsProps {
  contacts: Contact[];
  onContactUpdate: (contact: Contact) => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, onContactUpdate }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    onContactUpdate(updatedContact);
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  if (contacts.length === 0) {
    return (
      <div className="content-area">
        <div className="section-title">
          <span>👥</span>
          <span>Contacts</span>
        </div>
        <p className="section-description">
          Your professional network—extract from Brain Dump or add manually
        </p>
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No contacts yet</h3>
          <p>Start by going to Brain Dump and converting names to contacts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="section-title">
        <span>👥</span>
        <span>Contacts ({contacts.length})</span>
      </div>
      <p className="section-description">
        Click any card to edit details
      </p>

      <div className="contacts-grid">
        {contacts
          .sort((a, b) => calculateContactScore(b) - calculateContactScore(a))
          .map((contact) => {
            const score = calculateContactScore(contact);
            const scoreColor = getScoreColor(score);
            const scoreLabel = getScoreLabel(score);
            
            return (
          <div
            key={contact.id}
            className="contact-card"
            onClick={() => handleCardClick(contact)}
          >
            {contact.role && <RoleTag role={contact.role} />}
            
            <div className="contact-card-header">
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-header-info">
                <h3>{contact.name}</h3>
                {contact.category && (
                  <span className="contact-category">{contact.category}</span>
                )}
              </div>
              <div className={`score-badge score-${scoreColor}`}>
                <div className="score-number">{score}</div>
                <div className="score-label">{scoreLabel.split(' ')[0]}</div>
              </div>
            </div>

            <div className="contact-card-body">
              {contact.company && (
                <div className="contact-field">
                  <span className="field-label">🏢 Company:</span>
                  <span className="field-value">{contact.company}</span>
                </div>
              )}

              {contact.linkedinUrl && (
                <div className="contact-field">
                  <span className="field-label">🔗 LinkedIn:</span>
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="field-value-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Profile
                  </a>
                </div>
              )}

              {contact.notes && (
                <div className="contact-field notes-field">
                  <span className="field-label">📝 Notes:</span>
                  <p className="field-value-notes">{contact.notes}</p>
                </div>
              )}
            </div>

            <div className="contact-rankings">
              <RankingDisplay label="Trust" value={contact.trust || 1} hint="Relationship strength" />
              <RankingDisplay label="Proximity" value={contact.opportunityProximity || 1} hint="Opportunity fit" />
              <RankingDisplay label="Influence" value={contact.influence || 1} hint="Referral power" />
              <RankingDisplay label="Timing" value={contact.timing || 1} hint="Right now?" />
              <RankingDisplay label="Discovery" value={contact.discovery || 1} hint="Weak tie value" />
            </div>

            <ActionButtons contact={contact} />

            <div className="contact-card-footer">
              <button className="edit-button" onClick={(e) => {
                e.stopPropagation();
                handleCardClick(contact);
              }}>
                ✏️ Edit
              </button>
            </div>
          </div>
            );
          })}
      </div>

      {isModalOpen && selectedContact && (
        <EditContactModal
          contact={selectedContact}
          onSave={handleSaveContact}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

interface EditContactModalProps {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onClose: () => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  contact,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Contact>(contact);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRankingChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Contact</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Role in Your Network</label>
            <div className="role-selector">
              {(['strong-tie', 'weak-tie', 'referral-potential', 'target-company', 'reciprocity-opportunity'] as const).map((r) => (
                <button
                  key={r}
                  className={`role-option role-option-${roleConfig[r].color} ${
                    formData.role === r ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({ ...formData, role: r });
                  }}
                  title={roleConfig[r].label}
                >
                  <span>{roleConfig[r].emoji}</span>
                  <span>{roleConfig[r].label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              placeholder="e.g., Google, Microsoft"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedinUrl">LinkedIn URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              placeholder="e.g., Best bosses, Coworkers"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Add any notes about this person..."
              rows={4}
            />
          </div>

          <div className="rankings-section">
            <h3 className="rankings-title">🎯 Connection Rankings</h3>
            <p className="rankings-description">Rate this connection on a scale of 1-3</p>

            <RankingSlider
              label="🤝 Trust (Strong Ties)"
              hint="How strong is your relationship?"
              value={formData.trust || 1}
              onChange={(value) => handleRankingChange('trust', value)}
              metric={TOOLTIPS.STRONG_TIES.label}
              evidence={TOOLTIPS.STRONG_TIES.tooltip}
            />
            <RankingSlider
              label="🌐 Opportunity Proximity"
              hint="How likely they have relevant opportunities?"
              value={formData.opportunityProximity || 1}
              onChange={(value) => handleRankingChange('opportunityProximity', value)}
              metric={TOOLTIPS.PROXIMITY.label}
              evidence={TOOLTIPS.PROXIMITY.tooltip}
            />
            <RankingSlider
              label="🧲 Influence (Referrals)"
              hint="Can they make valuable referrals?"
              value={formData.influence || 1}
              onChange={(value) => handleRankingChange('influence', value)}
              metric={TOOLTIPS.REFERRALS.label}
              evidence={TOOLTIPS.REFERRALS.tooltip}
            />
            <RankingSlider
              label="⏱️ Timing"
              hint="Is this the right moment to reach out?"
              value={formData.timing || 1}
              onChange={(value) => handleRankingChange('timing', value)}
              metric={TOOLTIPS.TIMING.label}
              evidence={TOOLTIPS.TIMING.tooltip}
            />
            <RankingSlider
              label="🌐 Discovery (Weak Ties)"
              hint="How much unique value can they provide?"
              value={formData.discovery || 1}
              onChange={(value) => handleRankingChange('discovery', value)}
              metric={TOOLTIPS.WEAK_TIES.label}
              evidence={TOOLTIPS.WEAK_TIES.tooltip}
            />
            <RankingSlider
              label="🔄 Reciprocity Opportunity"
              hint="Can you help them?"
              value={formData.reciprocity || 1}
              onChange={(value) => handleRankingChange('reciprocity', value)}
              metric={TOOLTIPS.RECIPROCITY.label}
              evidence={TOOLTIPS.RECIPROCITY.tooltip}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
