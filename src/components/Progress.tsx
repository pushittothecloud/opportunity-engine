import React, { useState, useMemo } from 'react';
import { Contact } from './Contacts';
import { calculateProgressStats, generateInsight, getProgressPercent, getInsightTooltip, getProgressPhraseTooltip } from '../utils/progress';
import { calculateNetworkStrength, generateNetworkInsight } from '../utils/networkStrength';

interface ProgressProps {
  contacts: Contact[];
}

const Progress: React.FC<ProgressProps> = ({ contacts }) => {
  // In a real app, this would come from persistent state
  // For now, we'll track it locally
  const [completedIds] = useState<Set<string>>(new Set());

  const stats = useMemo(() => {
    return calculateProgressStats(contacts, completedIds);
  }, [contacts, completedIds]);

  const networkStrength = useMemo(() => {
    return calculateNetworkStrength(contacts);
  }, [contacts]);

  const insight = useMemo(() => {
    return generateInsight(stats);
  }, [stats]);

  const networkInsight = useMemo(() => {
    return generateNetworkInsight(networkStrength);
  }, [networkStrength]);

  const progressPercent = getProgressPercent(stats.completedActions, 5);

  return (
    <div className="content-area">
      <div className="section-title">
        <span>📈</span>
        <span>Progress</span>
      </div>
      <p className="section-description">
        Track your network building and outreach activity
      </p>

      {/* Progress Section */}
      <div className="progress-section">
        <h3 className="progress-title">This Week's Outreach</h3>
        <div className="progress-container">
          <div className="progress-bar-wrapper">
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="progress-text" title={getProgressPhraseTooltip()}>
              {stats.completedActions} of 5 completed
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-1">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalContacts}</div>
            <div className="stat-label">Total Contacts</div>
          </div>
        </div>

        <div className="stat-card stat-card-2">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.highPriorityContacts}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>

        <div className="stat-card stat-card-3">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedActions}</div>
            <div className="stat-label">Contacts Reached</div>
          </div>
        </div>

        <div className="stat-card stat-card-4">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-number">{stats.avgScore}</div>
            <div className="stat-label">Avg Score</div>
          </div>
        </div>
      </div>

      {/* Tie Breakdown */}
      <div className="ties-section">
        <h3 className="ties-title">Network Composition</h3>
        <div className="ties-grid">
          <div className="tie-card tie-strong">
            <div className="tie-icon">🔗</div>
            <div className="tie-number">{stats.strongTies}</div>
            <div className="tie-label">Strong Ties</div>
            <div className="tie-percent">
              {stats.totalContacts > 0 ? Math.round((stats.strongTies / stats.totalContacts) * 100) : 0}%
            </div>
          </div>

          <div className="tie-card tie-medium">
            <div className="tie-icon">🔀</div>
            <div className="tie-number">{stats.mediumTies}</div>
            <div className="tie-label">Medium Ties</div>
            <div className="tie-percent">
              {stats.totalContacts > 0 ? Math.round((stats.mediumTies / stats.totalContacts) * 100) : 0}%
            </div>
          </div>

          <div className="tie-card tie-weak">
            <div className="tie-icon">💫</div>
            <div className="tie-number">{stats.weakTies}</div>
            <div className="tie-label">Weak Ties</div>
            <div className="tie-percent">
              {stats.totalContacts > 0 ? Math.round((stats.weakTies / stats.totalContacts) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div className="insight-box" title={getInsightTooltip(insight) || undefined}>
        <div className="insight-icon">💡</div>
        <div className="insight-content">
          <h3 className="insight-title">Outreach Insight</h3>
          <p className="insight-text">{insight}</p>
        </div>
      </div>

      {/* Network Strength Score */}
      <div className="network-strength-section">
        <h3 className="strength-title">📊 Network Strength Score</h3>
        <div className="strength-score-container">
          <div className="strength-score-display">
            <div className="strength-score-number">{networkStrength.overallScore}</div>
            <div className="strength-score-label">/ 100</div>
          </div>
          <div className="strength-dimensions">
            <div className="dimension-item">
              <span className="dimension-label">Strong Ties:</span>
              <span className="dimension-value">{networkStrength.strongTieCount}</span>
            </div>
            <div className="dimension-item">
              <span className="dimension-label">Weak Ties:</span>
              <span className="dimension-value">{networkStrength.weakTieCount}</span>
            </div>
            <div className="dimension-item">
              <span className="dimension-label">Referral Potential:</span>
              <span className="dimension-value">{networkStrength.referralPotentialCount}</span>
            </div>
            <div className="dimension-item">
              <span className="dimension-label">Target Company:</span>
              <span className="dimension-value">{networkStrength.targetCompanyCount}</span>
            </div>
            <div className="dimension-item">
              <span className="dimension-label">High Reciprocity:</span>
              <span className="dimension-value">{networkStrength.reciprocityCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Insight Box */}
      <div className="insight-box network-insight">
        <div className="insight-icon">🧠</div>
        <div className="insight-content">
          <h3 className="insight-title">Network Insight</h3>
          <p className="insight-text">{networkInsight}</p>
        </div>
      </div>

      {/* Empty Contact Message */}
      {stats.totalContacts === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h3>No data yet</h3>
          <p>Add contacts in Brain Dump to see your progress</p>
        </div>
      )}
    </div>
  );
};

export default Progress;
