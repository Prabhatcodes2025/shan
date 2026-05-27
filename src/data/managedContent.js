import { announcements, careerBenefits, openRoles } from './siteContent';

export const MANAGED_CONTENT_STORAGE_KEY = 'sg-managed-content';
export const MANAGED_CONTENT_BACKUP_VERSION = 1;

const cloneAnnouncements = (items) =>
  items.map((item) => ({
    date: item.date ?? '',
    category: item.category ?? '',
    title: item.title ?? '',
    summary: item.summary ?? '',
  }));

const cloneRoles = (items) =>
  items.map((item) => ({
    title: item.title ?? '',
    type: item.type ?? '',
    location: item.location ?? '',
    summary: item.summary ?? '',
  }));

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function createDefaultManagedContent() {
  return {
    announcements: cloneAnnouncements(announcements),
    careers: {
      heroTitle: 'Join a team building multilingual operations.',
      heroDescription: 'Work across translation, QA, and AI data projects.',
      workingStyle: 'We value clarity, ownership, and steady execution.',
      growthEyebrow: 'Growth',
      growthTitle: 'Small team, clear responsibility.',
      growthDescription: 'Build practical skills through real client work.',
      cultureEyebrow: 'Culture',
      cultureTitle: 'Calm, focused, accountable.',
      cultureDescription: 'We care about quality, teamwork, and consistency.',
      rolesEyebrow: 'Open Roles',
      rolesTitle: 'Current openings.',
      rolesDescription: 'Explore active roles across operations and language support.',
      benefits: [...careerBenefits],
      roles: cloneRoles(openRoles),
    },
  };
}

export function normalizeManagedContent(storedContent) {
  const defaults = createDefaultManagedContent();
  const careers = storedContent?.careers ?? {};

  return {
    announcements: Array.isArray(storedContent?.announcements)
      ? cloneAnnouncements(storedContent.announcements)
      : defaults.announcements,
    careers: {
      ...defaults.careers,
      ...careers,
      benefits: Array.isArray(careers.benefits)
        ? careers.benefits.filter((item) => typeof item === 'string' && item.trim())
        : defaults.careers.benefits,
      roles: Array.isArray(careers.roles) ? cloneRoles(careers.roles) : defaults.careers.roles,
    },
  };
}

export function createManagedContentBackup(managedContent) {
  return {
    version: MANAGED_CONTENT_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    managedContent: normalizeManagedContent(managedContent),
  };
}

export function parseManagedContentBackup(payload) {
  if (!isRecord(payload)) {
    throw new Error('Invalid content backup file.');
  }

  const candidateContent = isRecord(payload.managedContent) ? payload.managedContent : payload;

  if (!('announcements' in candidateContent) && !('careers' in candidateContent)) {
    throw new Error('Invalid content backup file.');
  }

  return normalizeManagedContent(candidateContent);
}
