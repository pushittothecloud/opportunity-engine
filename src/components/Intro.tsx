import React, { useState } from 'react';

interface IntroProps {
  onStart: () => void;
}

const highReturnTooltips: Record<string, string> = {
  'Targeted outreach': 'Focus on people in relevant roles at target companies—quality over quantity dramatically increases response rates. Networking effectiveness depends on network quality and relevance, not just activity (Van Hoye et al., 2009).',
  'Referrals first': 'Referred candidates are evaluated more favorably and have 15% longer tenure, indicating better job matches and stronger hiring outcomes (Lalanne & Levati, 2020).',
  'Strategic connections': 'Strong ties are most effective for converting opportunities to offers—people you know well and who know your work provide the most reliable support (Porter et al., 2022).',
  'Focused effort': 'Systematic networking over time is more effective than sporadic high-volume effort. Many roles are filled before or early in formal hiring processes through network channels (Castilla et al., 2013).',
  'Measure progress': 'Track where opportunities come from, referral sources, and conversion rates. In one intervention, activating weak ties led to 41% of participants finding jobs (Sharabi & Simonovich, 2017).',
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  const [hoveredReturnItem, setHoveredReturnItem] = useState<string | null>(null);

  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="intro-header">
          <h1 className="intro-title">Opportunity Engine</h1>
          <p className="intro-subtitle">
            Transform your job search with strategic networking
          </p>
        </div>

        <div className="comparison-grid">
          {/* Low-Return Column */}
          <div className="comparison-card low-return">
            <div className="comparison-icon">❌</div>
            <h2 className="comparison-title">Low-Return Approach</h2>
            <ul className="comparison-list">
              <li>
                <span className="list-icon">📧</span>
                <span className="list-text">Mass applying</span>
              </li>
              <li>
                <span className="list-icon">👻</span>
                <span className="list-text">Passive browsing</span>
              </li>
              <li>
                <span className="list-icon">🎲</span>
                <span className="list-text">Random networking</span>
              </li>
              <li>
                <span className="list-icon">⏰</span>
                <span className="list-text">Unfocused effort</span>
              </li>
              <li>
                <span className="list-icon">📉</span>
                <span className="list-text">No tracking</span>
              </li>
            </ul>
          </div>

          {/* High-Return Column */}
          <div className="comparison-card high-return">
            <div className="comparison-icon">✅</div>
            <h2 className="comparison-title">High-Return Approach</h2>
            <ul className="comparison-list">
              <li
                onMouseEnter={() => setHoveredReturnItem('Targeted outreach')}
                onMouseLeave={() => setHoveredReturnItem(null)}
                className="comparison-list-item-with-tooltip"
              >
                <span className="list-icon">🎯</span>
                <div className="list-text-wrapper">
                  <span className="list-text">Targeted outreach</span>
                  <span className="tooltip-indicator">?</span>
                  {hoveredReturnItem === 'Targeted outreach' && (
                    <div className="comparison-tooltip">{highReturnTooltips['Targeted outreach']}</div>
                  )}
                </div>
              </li>
              <li
                onMouseEnter={() => setHoveredReturnItem('Referrals first')}
                onMouseLeave={() => setHoveredReturnItem(null)}
                className="comparison-list-item-with-tooltip"
              >
                <span className="list-icon">🤝</span>
                <div className="list-text-wrapper">
                  <span className="list-text">Referrals first</span>
                  <span className="tooltip-indicator">?</span>
                  {hoveredReturnItem === 'Referrals first' && (
                    <div className="comparison-tooltip">{highReturnTooltips['Referrals first']}</div>
                  )}
                </div>
              </li>
              <li
                onMouseEnter={() => setHoveredReturnItem('Strategic connections')}
                onMouseLeave={() => setHoveredReturnItem(null)}
                className="comparison-list-item-with-tooltip"
              >
                <span className="list-icon">🧠</span>
                <div className="list-text-wrapper">
                  <span className="list-text">Strategic connections</span>
                  <span className="tooltip-indicator">?</span>
                  {hoveredReturnItem === 'Strategic connections' && (
                    <div className="comparison-tooltip">{highReturnTooltips['Strategic connections']}</div>
                  )}
                </div>
              </li>
              <li
                onMouseEnter={() => setHoveredReturnItem('Focused effort')}
                onMouseLeave={() => setHoveredReturnItem(null)}
                className="comparison-list-item-with-tooltip"
              >
                <span className="list-icon">⚡</span>
                <div className="list-text-wrapper">
                  <span className="list-text">Focused effort</span>
                  <span className="tooltip-indicator">?</span>
                  {hoveredReturnItem === 'Focused effort' && (
                    <div className="comparison-tooltip">{highReturnTooltips['Focused effort']}</div>
                  )}
                </div>
              </li>
              <li
                onMouseEnter={() => setHoveredReturnItem('Measure progress')}
                onMouseLeave={() => setHoveredReturnItem(null)}
                className="comparison-list-item-with-tooltip"
              >
                <span className="list-icon">📊</span>
                <div className="list-text-wrapper">
                  <span className="list-text">Measure progress</span>
                  <span className="tooltip-indicator">?</span>
                  {hoveredReturnItem === 'Measure progress' && (
                    <div className="comparison-tooltip">{highReturnTooltips['Measure progress']}</div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="intro-footer">
          <button className="start-button" onClick={onStart}>
            Start
          </button>
          <p className="intro-note">
            You'll build your network systematically and track every connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
