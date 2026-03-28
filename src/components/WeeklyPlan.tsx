import React, { useState } from 'react';
import { Contact } from './Contacts';
import { calculateContactScore } from '../utils/scoring';
import { determineActionType, getActionTypeLabel, getActionTypeColor, getActionTypeEmoji, getActionTypeTooltip, getReasonForContact } from '../utils/weeklyPlan';

interface WeeklyPlanProps {
  contacts: Contact[];
}

const WeeklyPlan: React.FC<WeeklyPlanProps> = ({ contacts }) => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [snoozedIds, setSnoozedIds] = useState<Set<string>>(new Set());

  // Get top 5 contacts by score, excluding completed and snoozed
  const topContacts = contacts
    .filter((c) => !completedIds.has(c.id) && !snoozedIds.has(c.id))
    .sort((a, b) => calculateContactScore(b) - calculateContactScore(a))
    .slice(0, 5);

  const handleMarkDone = (contactId: string) => {
    const newCompleted = new Set(completedIds);
    newCompleted.add(contactId);
    setCompletedIds(newCompleted);
  };

  const handleSnooze = (contactId: string) => {
    const newSnoozed = new Set(snoozedIds);
    newSnoozed.add(contactId);
    setSnoozedIds(newSnoozed);
  };

  if (topContacts.length === 0) {
    return (
      <div className="content-area">
        <div className="section-title">
          <span>📅</span>
          <span>Weekly Plan</span>
        </div>
        <p className="section-description">
          Your top 5 contacts to reach out to this week
        </p>
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No contacts to reach out to yet</h3>
          <p>Start by adding contacts in Brain Dump and rating them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="section-title">
        <span>📅</span>
        <span>Weekly Plan</span>
      </div>
      <p className="section-description">
        Top {topContacts.length} contacts to reach out to this week
      </p>

      <div className="weekly-plan-container">
        {topContacts.map((contact, index) => {
          const score = calculateContactScore(contact);
          const actionType = determineActionType(contact);
          const reason = getReasonForContact(contact);

          return (
            <div key={contact.id} className="weekly-plan-card">
              <div className="plan-card-header">
                <div className="plan-card-number">{index + 1}</div>
                <div className="plan-card-title-section">
                  <h3>{contact.name}</h3>
                  {contact.role && (
                    <span className="plan-card-role">{contact.role}</span>
                  )}
                </div>
                <div className="plan-card-score">{score}</div>
              </div>

              <div className="plan-card-body">
                <div className="plan-card-reason">{reason}</div>
                <div
                  className="plan-card-action-type"
                  style={{
                    borderLeftColor: getActionTypeColor(actionType),
                  }}
                  title={getActionTypeTooltip(actionType)}
                >
                  <span>{getActionTypeEmoji(actionType)}</span>
                  <span>{getActionTypeLabel(actionType)}</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <button
                  className="plan-button plan-button-done"
                  onClick={() => handleMarkDone(contact.id)}
                >
                  ✓ Done
                </button>
                <button
                  className="plan-button plan-button-snooze"
                  onClick={() => handleSnooze(contact.id)}
                >
                  ⏭ Snooze
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {completedIds.size > 0 && (
        <div className="weekly-plan-summary">
          <p>✅ {completedIds.size} contact{completedIds.size !== 1 ? 's' : ''} marked as done</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlan;
