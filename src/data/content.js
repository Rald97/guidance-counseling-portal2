/**
 * All site content lives here so text can be edited in one place.
 * Keep every statement accurate: no invented statistics, features, or screenshots.
 */

/** The one and only official portal used across the whole website. */
export const PORTAL_URL = 'https://portal.cdmconnect.online/'

export const school = {
  name: 'Colegio de Montalban',
  office: 'Guidance and Counseling Office',
  location: 'Rodriguez, Rizal, Philippines',
  portalName: 'CDM OneServe',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'System Preview', href: '#preview' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const features = [
  {
    icon: 'calendar',
    title: 'Appointment Booking',
    description:
      'Students can request a guidance counseling appointment online — no paper forms and no waiting in line at the office.',
  },
  {
    icon: 'clock',
    title: 'Counselor Availability',
    description:
      'See when guidance counselors are available and choose a schedule that fits your classes and daily routine.',
  },
  {
    icon: 'bell',
    title: 'Notifications',
    description:
      'Receive updates about your appointment requests so you always know what is happening and what to do next.',
  },
  {
    icon: 'shield',
    title: 'Secure Role-Based Access',
    description:
      'Students, faculty, counselors, and guidance admins each sign in to their own role, so people only see what concerns them.',
  },
]

export const steps = [
  {
    title: 'Open the portal',
    description:
      'Go to portal.cdmconnect.online using the browser on your phone, tablet, or computer.',
  },
  {
    title: 'Sign in to your account',
    description:
      'Log in with your CDM OneServe account. Your account determines which tools you can use.',
  },
  {
    title: 'Open Guidance Counseling',
    description:
      'From your dashboard, open the Guidance Counseling module to reach the guidance office online.',
  },
  {
    title: 'Request your appointment',
    description:
      'Send your appointment request and keep an eye on your dashboard for confirmation and updates.',
  },
]

export const roles = [
  {
    icon: 'chat',
    name: 'Counselor',
    description:
      'Manage counseling schedules, review appointment requests, and keep track of your sessions.',
    action: 'Open portal as Counselor',
    desktopOnly: false,
  },
  {
    icon: 'student',
    name: 'Student',
    description:
      'Book a guidance appointment, check available counselors, and follow the status of your requests.',
    action: 'Open portal as Student',
    desktopOnly: false,
  },
  {
    icon: 'faculty',
    name: 'Faculty Members',
    description:
      'Coordinate with the guidance office and support the students you advise through the portal.',
    action: 'Open portal as Faculty',
    desktopOnly: false,
  },
  {
    icon: 'admin',
    name: 'Guidance Admin',
    description:
      'Oversee the guidance office workflow, records, and accounts. Best used on a desktop or laptop.',
    action: 'Open portal as Guidance Admin',
    desktopOnly: true,
  },
]

export const aboutBenefits = [
  'Convenient — request an appointment from any internet-connected device.',
  'Transparent — follow your requests and see what is happening next.',
  'Connected — one CDM OneServe account for multiple campus services.',
  'Confidential — guidance conversations remain private and respectful.',
]

/** Other modules that exist inside the CDM OneServe portal. */
export const portalModules = [
  'Guidance Counseling',
  'Clinic',
  'Library',
  'Lost & Found',
  'Marketplace',
]
