import { Contact } from '../components/Contacts';

export const generateLinkedInSearchUrl = (company: string): string => {
  const query = `site:linkedin.com/in "${company}"`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

export const generateCompanySearchUrl = (company: string): string => {
  const query = `"${company}" LinkedIn`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

export const generateCalendarUrl = (contact: Contact): string => {
  const title = `Reach out to ${contact.name}`;
  const details = [contact.notes, contact.linkedinUrl]
    .filter(Boolean)
    .join('\n\n');
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details || 'Follow up with this contact',
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const openUrl = (url: string, target: string = '_blank'): void => {
  if (url) {
    window.open(url, target);
  }
};
