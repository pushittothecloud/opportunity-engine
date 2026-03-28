import React from 'react';
import { Section } from './Sidebar';
import BrainDump from './BrainDump';
import Contacts, { Contact } from './Contacts';
import WeeklyPlan from './WeeklyPlan';
import Progress from './Progress';

interface ContentProps {
  section: Section;
  contacts: Contact[];
  onContactsCreated: (contacts: Contact[]) => void;
  onContactUpdate: (contact: Contact) => void;
}

const contentConfig: Record<Section, { title: string; description: string; items: string[] }> = {
  braindump: {
    title: '🧠 Brain Dump',
    description: 'Quick notes and ideas about your job search journey',
    items: ['Job search goals', 'Interview prep notes', 'Career insights', 'Skill improvements'],
  },
  contacts: {
    title: '👥 Contacts',
    description: 'Manage your professional connections and referral sources',
    items: ['Recruiters', 'Former colleagues', 'Mentors', 'Networking connections'],
  },
  opportunities: {
    title: '💼 Opportunities',
    description: 'Track and manage job opportunities you\'re interested in',
    items: ['Saved positions', 'Applied roles', 'Interview stages', 'Offer negotiations'],
  },
  weeklyplan: {
    title: '📅 Weekly Plan',
    description: 'Your weekly job search action plan and priorities',
    items: ['Applications to submit', 'Networking calls', 'Interview prep', 'Follow-ups'],
  },
  progress: {
    title: '📈 Progress',
    description: 'Track your job search metrics and milestones',
    items: ['Total applications sent', 'Interviews scheduled', 'Offers received', 'Conversion rate'],
  },
};

const iconColorMap: Record<string, 'green' | 'purple' | 'blue' | 'amber'> = {
  'Job search goals': 'green',
  'Interview prep notes': 'purple',
  'Career insights': 'blue',
  'Skill improvements': 'amber',
  'Recruiters': 'blue',
  'Former colleagues': 'green',
  'Mentors': 'purple',
  'Networking connections': 'amber',
  'Saved positions': 'green',
  'Applied roles': 'blue',
  'Interview stages': 'purple',
  'Offer negotiations': 'amber',
  'Applications to submit': 'blue',
  'Networking calls': 'green',
  'Interview prep': 'purple',
  'Follow-ups': 'amber',
  'Total applications sent': 'amber',
  'Interviews scheduled': 'blue',
  'Offers received': 'green',
  'Conversion rate': 'purple',
};

const Content: React.FC<ContentProps> = ({ section, contacts, onContactsCreated, onContactUpdate }) => {
  // Handle Brain Dump section specially
  if (section === 'braindump') {
    return <BrainDump onContactsCreated={onContactsCreated} />;
  }

  // Handle Contacts section
  if (section === 'contacts') {
    return <Contacts contacts={contacts} onContactUpdate={onContactUpdate} />;
  }

  // Handle Weekly Plan section
  if (section === 'weeklyplan') {
    return <WeeklyPlan contacts={contacts} />;
  }

  // Handle Progress section
  if (section === 'progress') {
    return <Progress contacts={contacts} />;
  }

  const config = contentConfig[section];

  return (
    <div className="content-area">
      <div className="section-title">
        <span>{config.title.split(' ')[0]}</span>
        <span>{config.title.split(' ').slice(1).join(' ')}</span>
      </div>
      <p className="section-description">{config.description}</p>
      <div className="placeholder-content">
        {config.items.map((item, index) => {
          const iconColor = iconColorMap[item] || 'blue';
          return (
            <div key={index} className="placeholder-card">
              <div className={`card-icon ${iconColor}`}>
                {['🎯', '📝', '💡', '✅'][index % 4]}
              </div>
              <h3>{item}</h3>
              <p>Click to add your {item.toLowerCase()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
