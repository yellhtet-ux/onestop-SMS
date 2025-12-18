import React from 'react';
import { MOCK_USERS, MOCK_CLASSES, MOCK_FEES, MOCK_TIMETABLE, MOCK_ASSIGNMENTS } from '../constants';
import { User, School } from '../types';
import { Users, BookOpen, CreditCard, BarChart2, Mail, CheckCircle, FileText, Calendar, Clock } from 'lucide-react';

// --- Shared Components ---
const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-500">{subtitle}</p>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

// --- ADMIN MODULES ---
export const AdminUsers: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="User Management" subtitle="Manage students, teachers, and staff" />
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                    {u.name.substring(0,2)}
                  </div>
                  <span className="font-medium text-gray-900">{u.name}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{u.role}</span>
                </td>
                <td className="p-4 text-gray-500 text-sm">{u.email}</td>
                <td className="p-4"><span className="text-green-600 text-sm font-medium">Active</span></td>
                <td className="p-4 text-gray-400 hover:text-indigo-600 cursor-pointer text-sm">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export const AdminAcademics: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Academic Structure" subtitle="Classes and Subjects" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MOCK_CLASSES.map((c) => (
        <Card key={c.id}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
              <p className="text-gray-500">Grade {c.gradeLevel}</p>
            </div>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600"><span className="font-semibold">32</span> Students Enrolled</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">6</span> Subjects</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const AdminFees: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Financial Records" subtitle="Invoices and Payments" />
    <Card>
      <div className="space-y-4">
        {MOCK_FEES.map((fee) => (
          <div key={fee.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
             <div>
                <p className="font-medium text-gray-900">{fee.title}</p>
                <p className="text-sm text-gray-500">Student ID: {fee.studentId}</p>
             </div>
             <div className="text-right">
                <p className="font-bold text-gray-900">${fee.amount}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                   fee.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>{fee.status}</span>
             </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export const AdminReports: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Reports & Analytics" subtitle="System wide performance" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {['Attendance Report', 'Financial Statement', 'Academic Performance'].map((r, i) => (
         <Card key={i} className="flex flex-col items-center justify-center py-12 cursor-pointer hover:border-indigo-300 transition-colors">
            <BarChart2 size={48} className="text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-700">{r}</h3>
            <span className="text-xs text-indigo-600 mt-2 font-medium">Download PDF</span>
         </Card>
       ))}
    </div>
  </div>
);

// --- TEACHER MODULES ---
export const TeacherClasses: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="My Classes" subtitle="Manage your assigned classes" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {MOCK_CLASSES.map(c => (
         <Card key={c.id} className="border-l-4 border-l-indigo-500">
            <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
            <p className="text-gray-500 mb-4">Grade {c.gradeLevel} • Room 101</p>
            <div className="flex gap-2">
               <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium">Students</button>
               <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium">Syllabus</button>
            </div>
         </Card>
       ))}
    </div>
  </div>
);

export const TeacherExams: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Exams & Grading" subtitle="Record student marks" />
    <Card>
       <div className="flex justify-between mb-4 gap-4">
         <select className="border border-gray-300 p-2 rounded bg-white text-gray-900 text-sm outline-none focus:border-indigo-500"><option>Mid-Term Exam</option><option>Finals</option></select>
         <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium">Save Grades</button>
       </div>
       <table className="w-full">
         <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
           <tr><th className="p-3 text-left">Student</th><th className="p-3 text-center">Marks / 100</th><th className="p-3 text-left">Remarks</th></tr>
         </thead>
         <tbody className="divide-y divide-gray-100">
            <tr className="bg-white"><td className="p-3 font-medium text-gray-900">Johnny Doe</td><td className="p-3 text-center"><input type="number" defaultValue={85} className="w-16 border border-gray-300 rounded p-1 text-center bg-white text-gray-900 outline-none focus:border-indigo-500" /></td><td className="p-3"><input type="text" className="w-full border-b border-gray-200 outline-none text-sm bg-white text-gray-900 focus:border-indigo-500" placeholder="Good effort" /></td></tr>
            <tr className="bg-white"><td className="p-3 font-medium text-gray-900">Sarah Connor</td><td className="p-3 text-center"><input type="number" defaultValue={92} className="w-16 border border-gray-300 rounded p-1 text-center bg-white text-gray-900 outline-none focus:border-indigo-500" /></td><td className="p-3"><input type="text" className="w-full border-b border-gray-200 outline-none text-sm bg-white text-gray-900 focus:border-indigo-500" placeholder="Excellent" /></td></tr>
         </tbody>
       </table>
    </Card>
  </div>
);

// --- STUDENT MODULES ---
export const StudentTimetable: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Weekly Timetable" subtitle="Class schedule" />
    <Card>
      <div className="space-y-2">
        {MOCK_TIMETABLE.map(t => (
          <div key={t.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
             <div className="w-24 font-bold text-indigo-600">{t.day}</div>
             <div className="flex-1">
                <p className="font-semibold text-gray-900">{t.subject}</p>
                <p className="text-xs text-gray-500">{t.startTime} - {t.endTime} • Room {t.room}</p>
             </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export const StudentExams: React.FC = () => (
  <div className="space-y-6">
     <PageHeader title="My Grades" subtitle="Examination results" />
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { subject: 'Mathematics', score: 92, grade: 'A' },
          { subject: 'Physics', score: 85, grade: 'B+' },
          { subject: 'English', score: 88, grade: 'A-' },
          { subject: 'History', score: 76, grade: 'C+' },
        ].map((res, i) => (
          <Card key={i} className="flex justify-between items-center">
             <div>
               <h3 className="font-bold text-gray-800">{res.subject}</h3>
               <p className="text-gray-500 text-sm">Final Exam</p>
             </div>
             <div className="text-right">
               <span className="text-2xl font-bold text-indigo-600">{res.grade}</span>
               <p className="text-xs text-gray-400">{res.score}/100</p>
             </div>
          </Card>
        ))}
     </div>
  </div>
);

// --- PARENT MODULES ---
export const ParentMessages: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Messages" subtitle="Communication with teachers" />
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[500px] flex flex-col">
       <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">Mr</div>
             <div className="bg-gray-100 p-3 rounded-r-lg rounded-bl-lg max-w-[80%]">
                <p className="text-sm text-gray-800">Hello, I wanted to let you know Johnny is doing great in Math!</p>
                <span className="text-[10px] text-gray-400">10:00 AM</span>
             </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600">Me</div>
             <div className="bg-indigo-50 p-3 rounded-l-lg rounded-br-lg max-w-[80%]">
                <p className="text-sm text-indigo-900">Thank you Mr. Smith! We are very proud.</p>
                <span className="text-[10px] text-indigo-400">10:05 AM</span>
             </div>
          </div>
       </div>
       <div className="p-4 border-t border-gray-100 flex gap-2">
          <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500 bg-white text-gray-900" />
          <button className="bg-indigo-600 text-white p-2 rounded-lg"><Mail size={20} /></button>
       </div>
    </div>
  </div>
);

export const ParentChildren: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="My Children" subtitle="Student profiles" />
    <Card className="flex items-start gap-4">
       <img src="https://picsum.photos/id/103/100/100" className="w-20 h-20 rounded-lg object-cover bg-gray-200" alt="Student" />
       <div>
          <h3 className="text-xl font-bold text-gray-900">Johnny Doe</h3>
          <p className="text-gray-500">Class 10-A • Townsville International</p>
          <div className="flex gap-2 mt-4">
             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Attendance: 96%</span>
             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">GPA: 3.8</span>
          </div>
       </div>
    </Card>
  </div>
);
