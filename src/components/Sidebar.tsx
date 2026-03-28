import React from 'react';

export type Section = 'braindump' | 'contacts' | 'opportunities' | 'weeklyplan' | 'progress';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sectionConfig: Record<Section, { label: string; icon: string }> = {
  braindump: { label: 'Brain Dump', icon: '🧠' },
  contacts: { label: 'Contacts', icon: '👥' },
  opportunities: { label: 'Opportunities', icon: '💼' },
  weeklyplan: { label: 'Weekly Plan', icon: '📅' },
  progress: { label: 'Progress', icon: '📈' },
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <nav className="sidebar-nav">
        {(Object.keys(sectionConfig) as Section[]).map((section) => (
          <button
            key={section}
            className={`nav-item ${activeSection === section ? 'active' : ''}`}
            onClick={() => onSectionChange(section)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <span className="nav-icon">{sectionConfig[section].icon}</span>
            <span>{sectionConfig[section].label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
