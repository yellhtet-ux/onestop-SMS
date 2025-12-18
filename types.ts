export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
}

export interface School {
  id: string;
  code: string; // Unique code for login (e.g., "INTL01")
  name: string;
  logoUrl?: string;
  address: string;
  primaryColor: string; // Theme support
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  schoolId: string;
  // Role specific
  studentClassId?: string; // For Students
  childrenIds?: string[]; // For Parents
}

export interface ClassSection {
  id: string;
  name: string; // e.g. "10-A"
  gradeLevel: number;
  schoolId: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // ISO Date
  status: AttendanceStatus;
  subjectId?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  classId: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  totalMarks: number;
}

export interface Grade {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
}

export interface FeeInvoice {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'DUE' | 'OVERDUE';
  studentId: string;
}

export interface TimeTableEntry {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  classId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  targetRoles: UserRole[];
}
