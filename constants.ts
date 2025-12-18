import { UserRole, School, User, ClassSection, AttendanceStatus, Assignment, FeeInvoice, Announcement, TimeTableEntry } from './types';

// --- Schools ---
export const MOCK_SCHOOLS: School[] = [
  {
    id: 's1',
    code: 'TOWN01',
    name: 'Townsville International',
    address: '123 Education Lane, Townsville',
    primaryColor: 'indigo',
    logoUrl: 'https://picsum.photos/id/1/200/200'
  },
  {
    id: 's2',
    code: 'ELITE99',
    name: 'Elite Private Academy',
    address: '456 Prestige Ave, Metropolis',
    primaryColor: 'emerald',
    logoUrl: 'https://picsum.photos/id/2/200/200'
  }
];

// --- Users ---
export const MOCK_USERS: User[] = [
  // School 1 Users
  { id: 'u1', name: 'Alice Admin', email: 'admin@town.com', role: UserRole.ADMIN, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/101/100/100' },
  { id: 'u2', name: 'Mr. Smith', email: 'teacher@town.com', role: UserRole.TEACHER, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/102/100/100' },
  { id: 'u3', name: 'Johnny Doe', email: 'student@town.com', role: UserRole.STUDENT, schoolId: 's1', studentClassId: 'c1', avatarUrl: 'https://picsum.photos/id/103/100/100' },
  { id: 'u4', name: 'Jane Doe', email: 'parent@town.com', role: UserRole.PARENT, schoolId: 's1', childrenIds: ['u3'], avatarUrl: 'https://picsum.photos/id/104/100/100' },
  
  // School 2 Users
  { id: 'u5', name: 'Bob Principal', email: 'admin@elite.com', role: UserRole.ADMIN, schoolId: 's2', avatarUrl: 'https://picsum.photos/id/105/100/100' },
];

export const MOCK_CLASSES: ClassSection[] = [
  { id: 'c1', name: '10-A', gradeLevel: 10, schoolId: 's1' },
  { id: 'c2', name: '10-B', gradeLevel: 10, schoolId: 's1' },
];

// --- Dashboard Data ---
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'School Closed Tomorrow', content: 'Due to heavy rain forecast.', date: '2023-10-26', author: 'Principal', targetRoles: [UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER] },
  { id: 'a2', title: 'Exam Schedule Released', content: 'Please check the exam tab.', date: '2023-10-25', author: 'Admin', targetRoles: [UserRole.STUDENT] },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'as1', title: 'Algebra Worksheet', subject: 'Math', dueDate: '2023-10-30', classId: 'c1', status: 'PENDING' },
  { id: 'as2', title: 'History Essay', subject: 'History', dueDate: '2023-11-02', classId: 'c1', status: 'SUBMITTED' },
];

export const MOCK_FEES: FeeInvoice[] = [
  { id: 'f1', title: 'Term 1 Tuition', amount: 1500, dueDate: '2023-09-01', status: 'PAID', studentId: 'u3' },
  { id: 'f2', title: 'Bus Fee', amount: 300, dueDate: '2023-11-01', status: 'DUE', studentId: 'u3' },
];

export const MOCK_TIMETABLE: TimeTableEntry[] = [
  { id: 't1', day: 'Monday', startTime: '09:00', endTime: '10:00', subject: 'Mathematics', room: '101', classId: 'c1' },
  { id: 't2', day: 'Monday', startTime: '10:00', endTime: '11:00', subject: 'Physics', room: 'Lab A', classId: 'c1' },
  { id: 't3', day: 'Monday', startTime: '11:15', endTime: '12:15', subject: 'English', room: '101', classId: 'c1' },
  { id: 't4', day: 'Tuesday', startTime: '09:00', endTime: '10:00', subject: 'History', room: '204', classId: 'c1' },
];

export const MOCK_STUDENTS_IN_CLASS = [
  { id: 'u3', name: 'Johnny Doe', rollNo: 12 },
  { id: 'u99', name: 'Sarah Connor', rollNo: 13 },
  { id: 'u98', name: 'Kyle Reese', rollNo: 14 },
];
