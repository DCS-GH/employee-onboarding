/**
 * Employee Onboarding Portal Types
 */

export type OnboardingPhase = 'Pre-boarding' | 'First Day' | 'First Month' | 'Support';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Verified' | 'Completed' | 'Rejected' | 'Pending Approval';

export type TaskOwner = 'Employee' | 'HR' | 'Manager' | 'IT' | 'Payroll';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: string;
  photoUrl: string;
  completionPercentage: number;
  currentPhase: OnboardingPhase;
  location: string;
  reportingTime: string;
  managerName: string;
  managerEmail: string;
  buddyName: string;
  buddyEmail: string;
  mentorName: string;
  phoneNumber: string;
  dateOfBirth: string;
  addressLines: string;
  city: string;
  state: string;
  postalCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bankName: string;
  bankAccount: string;
  bankRouting: string;
  taxId: string;
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  phase: OnboardingPhase;
  status: TaskStatus;
  owner: TaskOwner;
  dueDate: string;
  isRequired: boolean;
  remarks?: string;
}

export interface DocumentEntity {
  id: string;
  employeeId: string;
  name: string;
  category: string;
  status: 'Not Started' | 'Submitted' | 'Verified' | 'Rejected';
  isRequired: boolean;
  uploadedAt?: string;
  fileSize?: string;
  remarks?: string;
  fileBlobUrl?: string; // local temporary placeholder
}

export interface ScheduleItem {
  id: string;
  employeeId: string;
  title: string;
  time: string;
  duration: string;
  description: string;
  host: string;
  type: 'induction' | 'manager' | 'team' | 'it' | 'lunch' | 'checkpoint';
  joinUrl: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photoUrl: string;
  email: string;
  phone: string;
  isBuddy?: boolean;
  isManager?: boolean;
  isCoordinator?: boolean;
  intro: string;
}

export interface Course {
  id: string;
  employeeId: string;
  title: string;
  category: 'compliance' | 'role' | 'technical';
  dueDate: string;
  progress: number; // 0 to 100
  status: 'Not Started' | 'In Progress' | 'Completed';
  instructor: string;
  duration: string;
  badge?: string;
}

export interface PolicyEntity {
  id: string;
  title: string;
  category: string;
  description: string;
  isAcknowledged: boolean;
  acknowledgedAt?: string;
  fileSize: string;
}

export interface ITAccessItem {
  id: string;
  employeeId: string;
  systemName: string;
  category: string;
  status: 'Not Started' | 'In Progress' | 'Active';
  accName?: string;
  credentialsNotes?: string;
}

export interface SupportTicket {
  id: string;
  employeeId: string;
  category: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
  emojiRating?: number;
  feedbackText?: string;
}

export interface SystemNotification {
  id: string;
  employeeId: string;
  title: string;
  message: string;
  category: 'alert' | 'success' | 'info' | 'warning';
  date: string;
  read: boolean;
}

export interface AuditLogItem {
  id: string;
  employeeId: string;
  employeeName: string;
  action: string;
  details: string;
  timestamp: string;
  performedBy: string;
}
