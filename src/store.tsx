import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Employee,
  OnboardingTask,
  DocumentEntity,
  ScheduleItem,
  TeamMember,
  Course,
  PolicyEntity,
  ITAccessItem,
  SupportTicket,
  SystemNotification,
  AuditLogItem,
  OnboardingPhase,
  TaskStatus
} from './types';
import { avatarDataUri } from './avatar';

interface OnboardingContextProps {
  employees: Employee[];
  activeEmployeeId: string;
  setActiveEmployeeId: (id: string) => void;
  selectedAdminEmployeeId: string;
  setSelectedAdminEmployeeId: (id: string) => void;
  currentRole: string; // 'Employee' | 'HR' | 'Manager' | 'IT' | 'Payroll' | 'Coordinator'
  setCurrentRole: (role: string) => void;
  tasks: OnboardingTask[];
  documents: DocumentEntity[];
  schedule: ScheduleItem[];
  teamMembers: TeamMember[];
  courses: Course[];
  policies: PolicyEntity[];
  accessItems: ITAccessItem[];
  tickets: SupportTicket[];
  notifications: SystemNotification[];
  auditLogs: AuditLogItem[];
  
  // State mutations
  updateEmployeeProfile: (id: string, updates: Partial<Employee>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus, remarks?: string) => void;
  uploadDocument: (docId: string, fileBlobUrl: string, fileSize: string) => void;
  verifyDocument: (docId: string, status: 'Verified' | 'Rejected', remarks?: string) => void;
  verifyBankDetails: (employeeId: string, status: 'Verified' | 'Rejected') => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  completeCourse: (courseId: string) => void;
  acknowledgePolicy: (policyId: string) => void;
  updateAccessStatus: (accessId: string, status: 'Not Started' | 'In Progress' | 'Active', accName?: string) => void;
  submitSupportTicket: (category: string, subject: string, description: string) => void;
  submitFeedback: (ticketId: string, rating: number, text: string) => void;
  addNotification: (employeeId: string, title: string, message: string, category: 'alert' | 'success' | 'info' | 'warning') => void;
  clearNotification: (notificationId: string) => void;
  logAction: (employeeId: string, action: string, details: string, performedBy: string) => void;
  resetToDefault: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

// --- SEED SAMPLE DATA ---

const initialEmployees: Employee[] = [
  {
    id: 'EMP-2026-001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise.com',
    role: 'Senior UX Designer',
    department: 'Product & Design',
    startDate: '2026-06-01',
    photoUrl: avatarDataUri('Sarah Jenkins', 0),
    completionPercentage: 45,
    currentPhase: 'Pre-boarding',
    location: 'Corporate HQ, SF - Floor 4',
    reportingTime: '09:00 AM',
    managerName: 'Robert Vance',
    managerEmail: 'r.vance@enterprise.com',
    buddyName: 'Claire Redfield',
    buddyEmail: 'c.redfield@enterprise.com',
    mentorName: 'David Mercer',
    phoneNumber: '+1 (555) 321-4567',
    dateOfBirth: '1993-08-14',
    addressLines: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'California',
    postalCode: '94102',
    emergencyContactName: 'Marcus Jenkins',
    emergencyContactPhone: '+1 (555) 987-6543',
    bankName: 'Chase Bank',
    bankAccount: '•••• •••• ••89 12',
    bankRouting: '121000248',
    taxId: '321-XX-9876'
  },
  {
    id: 'EMP-2026-002',
    name: 'Michael Chen',
    email: 'michael.c@enterprise.com',
    role: 'Cloud Infrastructure Dev',
    department: 'Engineering',
    startDate: '2026-05-27', // Today/Tomorrow
    photoUrl: avatarDataUri('Michael Chen', 1),
    completionPercentage: 68,
    currentPhase: 'First Day',
    location: 'Corporate HQ, SF - Floor 3 (or Remote)',
    reportingTime: '10:00 AM',
    managerName: 'Sarah Jenkins (Ad-Interim)',
    managerEmail: 'dev.lead@enterprise.com',
    buddyName: 'Alex Stone',
    buddyEmail: 'a.stone@enterprise.com',
    mentorName: 'Fiona Gallagher',
    phoneNumber: '+1 (555) 789-1011',
    dateOfBirth: '1991-04-20',
    addressLines: '123 Pinecrest Avenue',
    city: 'San Mateo',
    state: 'California',
    postalCode: '94401',
    emergencyContactName: 'Susan Chen',
    emergencyContactPhone: '+1 (555) 234-5678',
    bankName: 'Wells Fargo',
    bankAccount: '•••• •••• ••43 56',
    bankRouting: '121000248',
    taxId: '456-XX-1122'
  },
  {
    id: 'EMP-2026-003',
    name: 'Liam Martinez',
    email: 'liam.m@enterprise.com',
    role: 'Security Consultant',
    department: 'Cyber Security',
    startDate: '2026-05-10',
    photoUrl: avatarDataUri('Liam Martinez', 2),
    completionPercentage: 90,
    currentPhase: 'First Month',
    location: 'Remote, US-West',
    reportingTime: '08:30 AM',
    managerName: 'Diana Prince',
    managerEmail: 'diana.p@enterprise.com',
    buddyName: 'Victor Stone',
    buddyEmail: 'v.stone@enterprise.com',
    mentorName: 'Arthur Curry',
    phoneNumber: '+1 (555) 456-7890',
    dateOfBirth: '1988-11-05',
    addressLines: '456 Shoreline Way',
    city: 'Seattle',
    state: 'Washington',
    postalCode: '98101',
    emergencyContactName: 'Nora Martinez',
    emergencyContactPhone: '+1 (555) 890-1234',
    bankName: 'Bank of America',
    bankAccount: '•••• •••• ••98 76',
    bankRouting: '026009593',
    taxId: '789-XX-5566'
  }
];

const initialTasks = (): OnboardingTask[] => {
  const list: OnboardingTask[] = [];
  
  initialEmployees.forEach(emp => {
    // Phase 1: Pre-boarding Tasks
    list.push(
      { id: `${emp.id}-t1`, employeeId: emp.id, title: 'Fill Personal Details Form', description: 'Enter phone, DOB, address, and emergency details', phase: 'Pre-boarding', status: emp.currentPhase === 'Pre-boarding' ? 'In Progress' : 'Completed', owner: 'Employee', dueDate: emp.startDate, isRequired: true },
      { id: `${emp.id}-t2`, employeeId: emp.id, title: 'Upload Signed Offer Letter', description: 'Complete & sign with e-sign, then submit', phase: 'Pre-boarding', status: emp.id === 'EMP-2026-001' ? 'Submitted' : 'Completed', owner: 'Employee', dueDate: emp.startDate, isRequired: true },
      { id: `${emp.id}-t3`, employeeId: emp.id, title: 'Direct Deposit & Tax Settings', description: 'Submit bank routing and W-4 withholding details', phase: 'Pre-boarding', status: emp.id === 'EMP-2026-001' ? 'Not Started' : 'Completed', owner: 'Employee', dueDate: emp.startDate, isRequired: true },
      { id: `${emp.id}-t4`, employeeId: emp.id, title: 'Company Handbook Signoff', description: 'Review company culture, mission, and benefits and acknowledge', phase: 'Pre-boarding', status: emp.id === 'EMP-2026-001' ? 'In Progress' : 'Completed', owner: 'Employee', dueDate: emp.startDate, isRequired: true }
    );

    // Phase 2: First Day Tasks
    list.push(
      { id: `${emp.id}-t5`, employeeId: emp.id, title: 'Attend HR Welcome Session', description: 'Meet the onboarding coordinators, peer introduction', phase: 'First Day', status: emp.id === 'EMP-2026-003' ? 'Completed' : 'Not Started', owner: 'Employee', dueDate: emp.startDate, isRequired: true },
      { id: `${emp.id}-t6`, employeeId: emp.id, title: 'Collect IT Hardware & Setup credentials', description: 'Meet IT desk, configure corporate laptop, SSO, and MFA', phase: 'First Day', status: emp.id === 'EMP-2026-002' ? 'In Progress' : emp.id === 'EMP-2026-003' ? 'Completed' : 'Not Started', owner: 'Employee', dueDate: emp.startDate, isRequired: true },
      { id: `${emp.id}-t7`, employeeId: emp.id, title: 'Hiring Manager 1-on-1 Connect', description: 'Briefing on immediate priorities and onboarding buddy pairing', phase: 'First Day', status: emp.id === 'EMP-2026-003' ? 'Completed' : 'Not Started', owner: 'Manager', dueDate: emp.startDate, isRequired: true }
    );

    // Phase 3: First Month Tasks
    list.push(
      { id: `${emp.id}-t8`, employeeId: emp.id, title: 'Complete Compliance Training', description: 'Pass security, fraud, and anti-harassment modules', phase: 'First Month', status: emp.id === 'EMP-2026-003' ? 'In Progress' : 'Not Started', owner: 'Employee', dueDate: '2026-06-15', isRequired: true },
      { id: `${emp.id}-t9`, employeeId: emp.id, title: 'Define 30-Day OKRs / Goals', description: 'Establish performance metrics and training plan targets', phase: 'First Month', status: emp.id === 'EMP-2026-003' ? 'In Progress' : 'Not Started', owner: 'Manager', dueDate: '2026-06-10', isRequired: true },
      { id: `${emp.id}-t10`, employeeId: emp.id, title: 'Pre-approved Project SLA Study', description: 'Review project files, repos, or recordings of meetings', phase: 'First Month', status: emp.id === 'EMP-2026-003' ? 'Completed' : 'Not Started', owner: 'Employee', dueDate: '2026-06-20', isRequired: false }
    );

    // Phase 4: Ongoing Support
    list.push(
      { id: `${emp.id}-t11`, employeeId: emp.id, title: '15-Day Milestone Pulse Check', description: 'Take feedback on onboarding experience and resolve doubts', phase: 'Support', status: 'Not Started', owner: 'HR', dueDate: '2026-06-15', isRequired: true }
    );
  });

  return list;
};

const initialDocuments = (): DocumentEntity[] => {
  const docs: DocumentEntity[] = [];
  initialEmployees.forEach(emp => {
    docs.push(
      { id: `${emp.id}-doc1`, employeeId: emp.id, name: 'Signed Employment Agreement', category: 'ID & Legal', status: emp.id === 'EMP-2026-001' ? 'Submitted' : 'Verified', isRequired: true, uploadedAt: '2026-05-25', fileSize: '1.4 MB' },
      { id: `${emp.id}-doc2`, employeeId: emp.id, name: 'Government ID Card (SSN/Passport)', category: 'ID & Legal', status: emp.id === 'EMP-2026-001' ? 'Submitted' : 'Verified', isRequired: true, uploadedAt: '12:40 PM', fileSize: '2.1 MB' },
      { id: `${emp.id}-doc3`, employeeId: emp.id, name: 'W-4 Tax Certificate Form', category: 'Tax & Payment', status: emp.id === 'EMP-2026-001' ? 'Not Started' : 'Verified', isRequired: true, uploadedAt: emp.id === 'EMP-2026-001' ? undefined : '2026-05-22', fileSize: '320 KB' },
      { id: `${emp.id}-doc4`, employeeId: emp.id, name: 'Pre-Joining Health Self-Declaration', category: 'Health & Safety', status: emp.id === 'EMP-2026-001' ? 'Not Started' : 'Verified', isRequired: false, uploadedAt: emp.id === 'EMP-2026-001' ? undefined : '2026-05-20', fileSize: '450 KB' }
    );
  });
  return docs;
};

const initialSchedule = (): ScheduleItem[] => {
  const list: ScheduleItem[] = [];
  initialEmployees.forEach(emp => {
    list.push(
      { id: `${emp.id}-sch1`, employeeId: emp.id, title: 'HR General Induction & Welcome Breakfast', time: '09:00 AM', duration: '60 min', description: 'Meet internal Onboarding operations team and fellow cohort joiners.', host: 'Sarah Parker (HR Ops Coordinator)', type: 'induction', joinUrl: 'https://teams.microsoft.com/l/meetup-join/1', status: 'upcoming' },
      { id: `${emp.id}-sch2`, employeeId: emp.id, title: 'Company Core Mission, Values & Culture Vision', time: '10:15 AM', duration: '45 min', description: 'A talk by our Chief People Officer on culture handbook, safety principles, and communication standards.', host: 'Melissa Albright (CPO)', type: 'induction', joinUrl: 'https://teams.microsoft.com/l/meetup-join/2', status: 'upcoming' },
      { id: `${emp.id}-sch3`, employeeId: emp.id, title: 'IT Setup Workspace Provisioning & MFA Guide', time: '11:15 AM', duration: '60 min', description: 'Configuring SSO, corporate email, VPN tunnels, corporate wiki, and local terminal setup.', host: 'Marcus Wright (Chief of IT Ops)', type: 'it', joinUrl: 'https://teams.microsoft.com/l/meetup-join/3', status: 'upcoming' },
      { id: `${emp.id}-sch4`, employeeId: emp.id, title: 'Department Welcoming lunch & Casual Breakout', time: '12:30 PM', duration: '90 min', description: 'Relaxed team lunch at the ground courtyard or shared virtual lounge.', host: 'Claire Redfield (Onboarding Buddy)', type: 'lunch', joinUrl: 'https://teams.microsoft.com/l/meetup-join/4', status: 'upcoming' },
      { id: `${emp.id}-sch5`, employeeId: emp.id, title: 'Hiring Manager Connect & Immediate Goals Briefing', time: '02:30 PM', duration: '45 min', description: 'Hiring manager overview of department structure, active client streams, and first week objectives.', host: emp.managerName, type: 'manager', joinUrl: 'https://teams.microsoft.com/l/meetup-join/5', status: 'upcoming' },
      { id: `${emp.id}-sch6`, employeeId: emp.id, title: 'Meet-Your-Buddy & Day 1 Recap Checkpoint', time: '04:00 PM', duration: '30 min', description: 'Check if corporate email and communication tools are active. Solve physical/access concerns.', host: emp.buddyName, type: 'team', joinUrl: 'https://teams.microsoft.com/l/meetup-join/6', status: 'upcoming' }
    );
  });
  return list;
};

const initialTeam: TeamMember[] = [
  { id: 't-1', name: 'Robert Vance', role: 'Director of Product Design', department: 'Product & Design', photoUrl: avatarDataUri('Robert Vance', 3), email: 'r.vance@enterprise.com', phone: '+1 (555) 712-4012', isManager: true, intro: 'Onboarding Lead & Senior Designer with 10 years in enterprise UI.' },
  { id: 't-2', name: 'Claire Redfield', role: 'Lead Product Designer', department: 'Product & Design', photoUrl: avatarDataUri('Claire Redfield', 4), email: 'c.redfield@enterprise.com', phone: '+1 (555) 833-2895', isBuddy: true, intro: 'I will be your Designated Onboarding Buddy! Reach out for anything, trivial or critical!' },
  { id: 't-3', name: 'David Mercer', role: 'Principal Designer', department: 'Product & Design', photoUrl: avatarDataUri('David Mercer', 5), email: 'd.mercer@enterprise.com', phone: '+1 (555) 594-3991', intro: 'Excited to have you on board! Let’s collaborate on our next UI refresh cycle.' },
  { id: 't-4', name: 'Diana Prince', role: 'Director of Cyber Defense', department: 'Cyber Security', photoUrl: avatarDataUri('Diana Prince', 1), email: 'diana.p@enterprise.com', phone: '+1 (555) 211-5099', isManager: true, intro: 'Ensures absolute protocol standards are maintained.' },
  { id: 't-5', name: 'Claire Jenkins', role: 'IT Support Supervisor', department: 'IT Operations', photoUrl: avatarDataUri('Claire Jenkins', 0), email: 'c.jenkins_ops@enterprise.com', phone: '+1 (555) 902-1144', isCoordinator: true, intro: 'Coordinates laptop allocations and access permissions.' }
];

const initialCourses = (): Course[] => {
  const list: Course[] = [];
  initialEmployees.forEach(emp => {
    list.push(
      { id: `${emp.id}-c1`, employeeId: emp.id, title: 'Corporate Code of Conduct & Integrity', category: 'compliance', dueDate: '2026-06-15', progress: emp.id === 'EMP-2026-003' ? 100 : 0, status: emp.id === 'EMP-2026-003' ? 'Completed' : 'Not Started', instructor: 'Marcus Aurelius (Ethics Coordinator)', duration: '45 mins', badge: 'Integrity Champion' },
      { id: `${emp.id}-c2`, employeeId: emp.id, title: 'Information & Mobile Security Basics', category: 'compliance', dueDate: '2026-06-10', progress: emp.id === 'EMP-2026-003' ? 100 : emp.id === 'EMP-2026-002' ? 50 : 0, status: emp.id === 'EMP-2026-003' ? 'Completed' : emp.id === 'EMP-2026-002' ? 'In Progress' : 'Not Started', instructor: 'Diana Prince (CISO)', duration: '60 mins', badge: 'Cyber Shield' },
      { id: `${emp.id}-c3`, employeeId: emp.id, title: 'Designing for Enterprise SLA Standards', category: 'role', dueDate: '2026-06-25', progress: 0, status: 'Not Started', instructor: 'David Mercer', duration: '90 mins' },
      { id: `${emp.id}-c4`, employeeId: emp.id, title: 'Introduction to Cloud Run Infrastructure & IaC', category: 'technical', dueDate: '2026-06-20', progress: emp.id === 'EMP-2026-002' ? 100 : 0, status: emp.id === 'EMP-2026-002' ? 'Completed' : 'Not Started', instructor: 'Fiona Gallagher', duration: '120 mins', badge: 'Cloud Novice' }
    );
  });
  return list;
};

const initialPolicies: PolicyEntity[] = [
  { id: 'pol-01', title: 'Code of Business Conduct & Ethics', category: 'General Ethics', description: 'Mandates standard professional interaction standards, bribery avoidance, and clear disclosure.', isAcknowledged: false, fileSize: '180 KB' },
  { id: 'pol-02', title: 'Data Privacy Policy & GDPR/CCPA Guidelines', category: 'Security & Compliance', description: 'Sets clear responsibilities regarding consumer data security, local storage protocol, and leak preventions.', isAcknowledged: false, fileSize: '240 KB' },
  { id: 'pol-03', title: 'Intellectual Property & Non-Disclosure Agreement', category: 'Legal Framework', description: 'Vests complete proprietary source codes, patterns, and design wireframes in the enterprise.', isAcknowledged: false, fileSize: '512 KB' },
  { id: 'pol-04', title: 'Remote Work Health, Infrastructure & Ergonomics Policy', category: 'Employee Health', description: 'Outlines standard equipment allocation protocols, ergonomics requirements, and visual breaks.', isAcknowledged: false, fileSize: '144 KB' }
];

const initialAccessItems = (): ITAccessItem[] => {
  const list: ITAccessItem[] = [];
  initialEmployees.forEach(emp => {
    list.push(
      { id: `${emp.id}-a1`, employeeId: emp.id, systemName: 'Corporate G-Suite Email Office account', category: 'Email & Identity', status: emp.id === 'EMP-2026-003' ? 'Active' : 'In Progress', accName: emp.id === 'EMP-2026-003' ? emp.email : undefined },
      { id: `${emp.id}-a2`, employeeId: emp.id, systemName: 'Global VPN Server Gateways Access', category: 'Secure Network', status: emp.id === 'EMP-2026-003' ? 'Active' : 'Not Started' },
      { id: `${emp.id}-a3`, employeeId: emp.id, systemName: 'Slack / MS Teams chat groups', category: 'Team Communications', status: emp.id === 'EMP-2026-003' ? 'Active' : 'In Progress' },
      { id: `${emp.id}-a4`, employeeId: emp.id, systemName: 'Figma Team Core Workspace Org', category: 'Production Tools', status: emp.id === 'EMP-2026-003' ? 'Active' : 'Not Started' },
      { id: `${emp.id}-a5`, employeeId: emp.id, systemName: 'Github Enterprise / AWS Developer Console', category: 'Production Tools', status: 'Not Started' }
    );
  });
  return list;
};

const initialNotifications = (): SystemNotification[] => [
  { id: 'n-1', employeeId: 'EMP-2026-001', title: 'Pre-boarding setup complete', message: 'Welcome Sarah Jenkins! Please review the document folder to submit your W-4 form.', category: 'info', date: '2026-05-26', read: false },
  { id: 'n-2', employeeId: 'EMP-2026-001', title: 'Offer Letter uploaded', message: 'You uploaded your Signed Agreement. HR is inspecting it.', category: 'success', date: '2026-05-26', read: false },
  { id: 'n-3', employeeId: 'EMP-2026-002', title: 'Day 1 onboarding started!', message: 'Please review your Day 1 schedule including the manager meet and lunch breakout.', category: 'alert', date: '2026-05-26', read: false }
];

const initialAuditLogs = (): AuditLogItem[] => [
  { id: 'audit-1', employeeId: 'EMP-2026-001', employeeName: 'Sarah Jenkins', action: 'Employee Account Created', details: 'Profile initialized in Pre-boarding state.', timestamp: '2026-05-25 10:00 AM', performedBy: 'System Automation' },
  { id: 'audit-2', employeeId: 'EMP-2026-001', employeeName: 'Sarah Jenkins', action: 'Document Upload', details: 'Uploaded Government ID Card.', timestamp: '2026-05-25 12:40 PM', performedBy: 'Sarah Jenkins (Employee)' },
  { id: 'audit-3', employeeId: 'EMP-2026-002', employeeName: 'Michael Chen', action: 'Phase Transited', details: 'Shifted from Pre-boarding to First Day based on scheduled date.', timestamp: '2026-05-26 08:00 AM', performedBy: 'IT System Cron' }
];

// --- CONTEXT PROVIDER ---

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const local = localStorage.getItem('onboard_employees');
    return local ? JSON.parse(local) : initialEmployees;
  });

  const [activeEmployeeId, setActiveEmployeeId] = useState<string>(() => {
    return localStorage.getItem('onboard_active_emp_id') || 'EMP-2026-001';
  });

  const [selectedAdminEmployeeId, setSelectedAdminEmployeeId] = useState<string>(() => {
    return localStorage.getItem('onboard_selected_admin_emp_id') || 'EMP-2026-001';
  });

  const [currentRole, setCurrentRole] = useState<string>(() => {
    return localStorage.getItem('onboard_current_role') || 'Employee';
  });

  const [tasks, setTasks] = useState<OnboardingTask[]>(() => {
    const local = localStorage.getItem('onboard_tasks');
    return local ? JSON.parse(local) : initialTasks();
  });

  const [documents, setDocuments] = useState<DocumentEntity[]>(() => {
    const local = localStorage.getItem('onboard_documents');
    return local ? JSON.parse(local) : initialDocuments();
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const local = localStorage.getItem('onboard_schedule');
    return local ? JSON.parse(local) : initialSchedule();
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const local = localStorage.getItem('onboard_courses');
    return local ? JSON.parse(local) : initialCourses();
  });

  const [policies, setPolicies] = useState<PolicyEntity[]>(() => {
    const local = localStorage.getItem('onboard_policies');
    return local ? JSON.parse(local) : initialPolicies;
  });

  const [accessItems, setAccessItems] = useState<ITAccessItem[]>(() => {
    const local = localStorage.getItem('onboard_access');
    return local ? JSON.parse(local) : initialAccessItems();
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const local = localStorage.getItem('onboard_tickets');
    return local ? JSON.parse(local) : [];
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const local = localStorage.getItem('onboard_notifications');
    return local ? JSON.parse(local) : initialNotifications();
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const local = localStorage.getItem('onboard_audits');
    return local ? JSON.parse(local) : initialAuditLogs();
  });

  // Keep Sync with Storage
  useEffect(() => {
    localStorage.setItem('onboard_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('onboard_active_emp_id', activeEmployeeId);
  }, [activeEmployeeId]);

  useEffect(() => {
    localStorage.setItem('onboard_selected_admin_emp_id', selectedAdminEmployeeId);
  }, [selectedAdminEmployeeId]);

  useEffect(() => {
    localStorage.setItem('onboard_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('onboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('onboard_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('onboard_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('onboard_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('onboard_policies', JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem('onboard_access', JSON.stringify(accessItems));
  }, [accessItems]);

  useEffect(() => {
    localStorage.setItem('onboard_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('onboard_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('onboard_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Recalculate employee completion status based on completed tasks & verified documents
  const recalculateCompletion = (employeeId: string, currentTasks: OnboardingTask[], currentDocs: DocumentEntity[], currentCourses: Course[]) => {
    const empTasks = currentTasks.filter(t => t.employeeId === employeeId);
    const empDocs = currentDocs.filter(d => d.employeeId === employeeId);
    const empCourses = currentCourses.filter(c => c.employeeId === employeeId);

    const totalCheckpoints = empTasks.length + empDocs.length + empCourses.length;
    if (totalCheckpoints === 0) return 0;

    const completedTasks = empTasks.filter(t => t.status === 'Completed' || t.status === 'Verified').length;
    const verifiedDocs = empDocs.filter(d => d.status === 'Verified').length;
    const completedCourses = empCourses.filter(c => c.status === 'Completed').length;

    const score = Math.round(((completedTasks + verifiedDocs + completedCourses) / totalCheckpoints) * 100);

    setEmployees(prev => prev.map(emp => {
      if (emp.id === employeeId) {
        // Automatically advance transition status based on percentage
        let phase: OnboardingPhase = emp.currentPhase;
        if (score >= 95) {
          phase = 'Support';
        } else if (score >= 60) {
          phase = 'First Month';
        } else if (score >= 40) {
          phase = 'First Day';
        }
        return { ...emp, completionPercentage: score, currentPhase: phase };
      }
      return emp;
    }));
  };

  const logAction = (employeeId: string, action: string, details: string, performedBy: string) => {
    const emp = employees.find(e => e.id === employeeId);
    const id = `audit-${Date.now()}`;
    const timestamp = new Date().toLocaleString();
    const newLog: AuditLogItem = {
      id,
      employeeId,
      employeeName: emp ? emp.name : 'Unknown Employee',
      action,
      details,
      timestamp,
      performedBy
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateEmployeeProfile = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        const updated = { ...emp, ...updates };
        return updated;
      }
      return emp;
    }));
    logAction(id, 'Profile Update', `Updated fields: ${Object.keys(updates).join(', ')}`, currentRole);
    addNotification(id, 'Profile Saved', 'Your personal onboarding information records were updated successfully.', 'success');
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus, remarks?: string) => {
    let empId = '';
    let updatedTasks: OnboardingTask[] = [];
    
    setTasks(prev => {
      updatedTasks = prev.map(task => {
        if (task.id === taskId) {
          empId = task.employeeId;
          return { ...task, status, remarks };
        }
        return task;
      });
      return updatedTasks;
    });

    if (empId) {
      logAction(empId, 'Task Status Changed', `Task: "${tasks.find(t => t.id === taskId)?.title}" set to ${status}. ${remarks ? `Remarks: ${remarks}` : ''}`, currentRole);
      
      // Auto triggers notification
      if (status === 'Completed') {
        addNotification(empId, 'Task Completed', `Checklist item updated to Completed!`, 'success');
      } else if (status === 'Rejected') {
        addNotification(empId, 'Task Rejected by Approver', `Checklist item requires revisions: ${remarks}`, 'alert');
      }

      // Recompute completion after state updates
      setTimeout(() => {
        recalculateCompletion(empId, updatedTasks, documents, courses);
      }, 50);
    }
  };

  const uploadDocument = (docId: string, fileBlobUrl: string, fileSize: string) => {
    let empId = '';
    let updatedDocs: DocumentEntity[] = [];

    setDocuments(prev => {
      updatedDocs = prev.map(doc => {
        if (doc.id === docId) {
          empId = doc.employeeId;
          return {
            ...doc,
            status: 'Submitted',
            fileBlobUrl,
            fileSize,
            uploadedAt: new Date().toLocaleDateString()
          };
        }
        return doc;
      });
      return updatedDocs;
    });

    if (empId) {
      logAction(empId, 'Document Uploaded', `Uploaded: ${documents.find(d => d.id === docId)?.name}`, currentRole);
      addNotification(empId, 'Document Uploaded Successfully', `Please wait as HR verifies ${documents.find(d => d.id === docId)?.name}`, 'info');

      // Sync and recalculate
      setTimeout(() => {
        recalculateCompletion(empId, tasks, updatedDocs, courses);
      }, 50);
    }
  };

  const verifyDocument = (docId: string, status: 'Verified' | 'Rejected', remarks?: string) => {
    let empId = '';
    let updatedDocs: DocumentEntity[] = [];

    setDocuments(prev => {
      updatedDocs = prev.map(doc => {
        if (doc.id === docId) {
          empId = doc.employeeId;
          return {
            ...doc,
            status,
            remarks: remarks || undefined
          };
        }
        return doc;
      });
      return updatedDocs;
    });

    if (empId) {
      const docName = documents.find(d => d.id === docId)?.name;
      logAction(empId, `Document ${status}`, `HR Ops reviewed "${docName}". Status: ${status}. Remarks: ${remarks || 'None'}`, currentRole);
      
      if (status === 'Verified') {
        addNotification(empId, 'Document Verified', `Corporate HR approved: "${docName}"`, 'success');
      } else {
        addNotification(empId, 'Document Rejected', `Action Required on "${docName}": ${remarks}`, 'alert');
      }

      setTimeout(() => {
        recalculateCompletion(empId, tasks, updatedDocs, courses);
      }, 50);
    }
  };

  const verifyBankDetails = (employeeId: string, status: 'Verified' | 'Rejected') => {
    logAction(employeeId, `Payroll Status ${status}`, `Finance Operations team reviewed bank account details. Status: ${status}`, currentRole);
    if (status === 'Verified') {
      addNotification(employeeId, 'Direct Deposit Authorized', 'Your direct payroll deposit bank and tax setups are verified.', 'success');
    } else {
      addNotification(employeeId, 'Direct Deposit Flagged', 'Your deposit bank details were flagged. Please update routing or account parameters.', 'alert');
    }
  };

  const addScheduleItem = (item: Omit<ScheduleItem, 'id'>) => {
    const id = `sch-${Date.now()}`;
    const scheduleWithId: ScheduleItem = { ...item, id };
    setSchedule(prev => [...prev, scheduleWithId]);
    logAction(item.employeeId, 'Schedule Item Appended', `New session scheduled: "${item.title}" with host ${item.host}.`, currentRole);
    addNotification(item.employeeId, 'New Appt Scheduled', `Added: "${item.title}" at ${item.time}.`, 'info');
  };

  const completeCourse = (courseId: string) => {
    let empId = '';
    let updatedCourses: Course[] = [];

    setCourses(prev => {
      updatedCourses = prev.map(course => {
        if (course.id === courseId) {
          empId = course.employeeId;
          return {
            ...course,
            progress: 100,
            status: 'Completed'
          };
        }
        return course;
      });
      return updatedCourses;
    });

    if (empId) {
      const courseTitle = courses.find(c => c.id === courseId)?.title;
      const c = courses.find(c => c.id === courseId);
      logAction(empId, 'Course Assessment Completed', `Successfully passed course "${courseTitle}".`, 'Employee');
      
      // Auto reward notification & badge
      const rewardMsg = c?.badge ? `Unlocked beautiful credential badge: "${c.badge}"!` : '';
      addNotification(empId, 'Compliance Completed', `Passed: "${courseTitle}". ${rewardMsg}`, 'success');

      setTimeout(() => {
        recalculateCompletion(empId, tasks, documents, updatedCourses);
      }, 50);
    }
  };

  const acknowledgePolicy = (policyId: string) => {
    let empId = activeEmployeeId;
    setPolicies(prev => prev.map(item => {
      if (item.id === policyId) {
        return {
          ...item,
          isAcknowledged: true,
          acknowledgedAt: new Date().toLocaleString()
        };
      }
      return item;
    }));

    logAction(empId, 'Policy Acknowledged', `Signed policy handbook: "${policies.find(p => p.id === policyId)?.title}"`, 'Employee');
    addNotification(empId, 'E-Sign Completed', `Handled: "${policies.find(p => p.id === policyId)?.title}"`, 'success');
  };

  const updateAccessStatus = (accessId: string, status: 'Not Started' | 'In Progress' | 'Active', accName?: string) => {
    let empId = '';
    setAccessItems(prev => prev.map(item => {
      if (item.id === accessId) {
        empId = item.employeeId;
        return {
          ...item,
          status,
          accName: accName || item.accName
        };
      }
      return item;
    }));

    if (empId) {
      const sysName = accessItems.find(a => a.id === accessId)?.systemName;
      logAction(empId, 'IT Access Update', `Systems engineering changed status of "${sysName}" to ${status}`, currentRole);
      
      if (status === 'Active') {
        addNotification(empId, 'System Key Activated', `Corporate access ready for "${sysName}"! Credentials mapped.`, 'success');
      } else {
        addNotification(empId, 'IT Provisioning In Progress', `IT Operations is initializing: "${sysName}"`, 'info');
      }
    }
  };

  const submitSupportTicket = (category: string, subject: string, description: string) => {
    const id = `tkt-${Date.now()}`;
    const newTicket: SupportTicket = {
      id,
      employeeId: activeEmployeeId,
      category,
      subject,
      description,
      status: 'Open',
      createdAt: new Date().toLocaleDateString()
    };
    
    setTickets(prev => [newTicket, ...prev]);
    logAction(activeEmployeeId, 'Support Ticket Created', `Raised help ticket: "${subject}" under ${category}.`, 'Employee');
    addNotification(activeEmployeeId, 'Onboarding Ticket Opened', `IT Ops registered help request: #${id.slice(-4)}. Escalation initiated.`, 'warning');
  };

  const submitFeedback = (ticketId: string, rating: number, text: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Closed',
          emojiRating: rating,
          feedbackText: text
        };
      }
      return t;
    }));
    logAction(activeEmployeeId, 'Onboarding Feedback Submitted', `Closed ticket/feedback context with score ${rating}/5`, 'Employee');
    addNotification(activeEmployeeId, 'Onboarding Pulse Completed', 'Thank you for documenting your feedback! Escalated directly to HR director.', 'success');
  };

  const addNotification = (employeeId: string, title: string, message: string, category: 'alert' | 'success' | 'info' | 'warning') => {
    const id = `n-${Date.now()}`;
    const date = new Date().toLocaleDateString();
    const newNotif: SystemNotification = { id, employeeId, title, message, category, date, read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === notificationId) return { ...n, read: true };
      return n;
    }));
  };

  const resetToDefault = () => {
    localStorage.removeItem('onboard_employees');
    localStorage.removeItem('onboard_active_emp_id');
    localStorage.removeItem('onboard_selected_admin_emp_id');
    localStorage.removeItem('onboard_current_role');
    localStorage.removeItem('onboard_tasks');
    localStorage.removeItem('onboard_documents');
    localStorage.removeItem('onboard_schedule');
    localStorage.removeItem('onboard_courses');
    localStorage.removeItem('onboard_policies');
    localStorage.removeItem('onboard_access');
    localStorage.removeItem('onboard_tickets');
    localStorage.removeItem('onboard_notifications');
    localStorage.removeItem('onboard_audits');
    
    setEmployees(initialEmployees);
    setActiveEmployeeId('EMP-2026-001');
    setSelectedAdminEmployeeId('EMP-2026-001');
    setCurrentRole('Employee');
    setTasks(initialTasks());
    setDocuments(initialDocuments());
    setSchedule(initialSchedule());
    setCourses(initialCourses());
    setPolicies(initialPolicies);
    setAccessItems(initialAccessItems());
    setTickets([]);
    setNotifications(initialNotifications());
    setAuditLogs(initialAuditLogs());
  };

  return (
    <OnboardingContext.Provider value={{
      employees,
      activeEmployeeId,
      setActiveEmployeeId,
      selectedAdminEmployeeId,
      setSelectedAdminEmployeeId,
      currentRole,
      setCurrentRole,
      tasks,
      documents,
      schedule,
      teamMembers: initialTeam,
      courses,
      policies,
      accessItems,
      tickets,
      notifications,
      auditLogs,
      updateEmployeeProfile,
      updateTaskStatus,
      uploadDocument,
      verifyDocument,
      verifyBankDetails,
      addScheduleItem,
      completeCourse,
      acknowledgePolicy,
      updateAccessStatus,
      submitSupportTicket,
      submitFeedback,
      addNotification,
      clearNotification,
      logAction,
      resetToDefault
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
};
