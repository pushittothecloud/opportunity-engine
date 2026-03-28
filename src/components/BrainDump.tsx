import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  category?: string;
  company?: string;
  linkedinUrl?: string;
  notes?: string;
}

interface BrainDumpProps {
  onContactsCreated: (contacts: Contact[]) => void;
}

const promptChips = [
  { label: 'Best bosses', emoji: '👔' },
  { label: 'Coworkers', emoji: '🤝' },
  { label: 'People who left for better jobs', emoji: '🚀' },
  { label: 'Recruiters', emoji: '💼' },
  { label: 'Clients / vendors', emoji: '🏢' },
  { label: 'Alumni', emoji: '🎓' },
  { label: 'Adjacent industries', emoji: '🌐' },
];

const BrainDump: React.FC<BrainDumpProps> = ({ onContactsCreated }) => {
  const [input, setInput] = useState('');

  const handleAddPrompt = (prompt: string) => {
    const newInput = input + (input ? '\n\n' : '') + `# ${prompt}\n`;
    setInput(newInput);
  };

  const handleConvertToContacts = () => {
    // Split input by newlines and commas, filter out empty lines and headers
    const lines = input.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    
    const contacts = lines
      .flatMap(line => 
        line.split(',').map(name => name.trim()).filter(name => name)
      )
      .filter(name => name) // Remove empty strings
      .map((name, index) => ({
        id: `contact-${Date.now()}-${index}`,
        name,
        category: 'General',
      }));

    if (contacts.length > 0) {
      onContactsCreated(contacts);
      setInput(''); // Clear input after conversion
    } else {
      alert('Please enter at least one name');
    }
  };

  const contactCount = input
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .flatMap(line => line.split(','))
    .filter(name => name.trim()).length;

  return (
    <div className="content-area">
      <div className="section-title">
        <span>🧠</span>
        <span>Brain Dump</span>
      </div>
      <p className="section-description">Write every person you can think of—use categories to organize your thoughts</p>

      {/* Prompt Chips */}
      <div className="prompt-chips-container">
        <p className="chips-label">Quick categories:</p>
        <div className="prompt-chips">
          {promptChips.map((chip, index) => (
            <button
              key={index}
              className="prompt-chip"
              onClick={() => handleAddPrompt(chip.label)}
              title={`Add "${chip.label}" category`}
            >
              <span className="chip-emoji">{chip.emoji}</span>
              <span className="chip-label">{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="brain-dump-form">
        <div className="textarea-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Example format:\n\n# Best bosses\nJohn Smith\nSarah Johnson\n\n# Coworkers\nMike, Lisa, David\n\nJust write names—one per line or separated by commas!`}
            className="brain-dump-textarea"
          />
          <div className="textarea-footer">
            <span className="contact-count">{contactCount} names detected</span>
          </div>
        </div>

        {/* Convert Button */}
        <button className="convert-button" onClick={handleConvertToContacts}>
          ✨ Convert to Contacts
        </button>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h4>💡 Tips:</h4>
        <ul>
          <li>Use # to create category headers (e.g., # Best bosses)</li>
          <li>One name per line, or separate by commas: "John, Sarah, Mike"</li>
          <li>Names will be extracted automatically</li>
          <li>You can edit and organize in the Contacts section</li>
        </ul>
      </div>
    </div>
  );
};

export default BrainDump;
