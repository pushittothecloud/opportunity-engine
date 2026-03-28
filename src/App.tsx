import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar, { Section } from './components/Sidebar';
import Content from './components/Content';
import Intro from './components/Intro';
import { Contact } from './components/Contacts';
import './index.css';

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    const saved = localStorage.getItem('hasSeenIntro');
    return saved === 'true';
  });
  const [activeSection, setActiveSection] = useState<Section>('braindump');
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleContactsCreated = (newContacts: Contact[]) => {
    setContacts((prevContacts) => [...prevContacts, ...newContacts]);
    // Automatically switch to Contacts section to show the newly created contacts
    setActiveSection('contacts');
  };

  const handleContactUpdate = (updatedContact: Contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const handleStartApp = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setHasSeenIntro(true);
  };

  if (!hasSeenIntro) {
    return <Intro onStart={handleStartApp} />;
  }

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="main-content">
        <Header title="Opportunity Engine" />
        <Content 
          section={activeSection} 
          contacts={contacts}
          onContactsCreated={handleContactsCreated}
          onContactUpdate={handleContactUpdate}
        />
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeX-bDZMEZOLJx9XvKFlh7GvBAxRqQFChgAsARAVjh8n_hrMw/viewform?usp=publish-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="feedback-button"
        title="Send feedback"
      >
        &#x1F4A1; Feedback
      </a>
    </div>
  );
}

export default App;
