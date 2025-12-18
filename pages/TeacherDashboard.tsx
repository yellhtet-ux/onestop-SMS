import React, { useState } from 'react';
import { User, School, AttendanceStatus } from '../types';
import { MOCK_CLASSES, MOCK_STUDENTS_IN_CLASS } from '../constants';
import { Check, X, Clock, Calendar, ChevronRight } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  school: School;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, school }) => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});

  const handleMarkAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Good Morning, {user.name}</h2>
           <p className="text-gray-500">You have 4 classes scheduled today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200">
           <span className="text-sm font-medium text-gray-600 pl-2">Class:</span>
           <select 
             className="bg-transparent font-semibold text-gray-900 outline-none"
             value={selectedClass.id}
             onChange={(e) => {
               const c = MOCK_CLASSES.find(cl => cl.id === e.target.value);
               if(c) setSelectedClass(c);
             }}
           >
             {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name} (Grade {c.gradeLevel})</option>)}
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-indigo-500" />
              Mark Attendance - {new Date().toLocaleDateString()}
            </h3>
            <button className={`text-xs bg-${school.primaryColor}-100 text-${school.primaryColor}-700 px-3 py-1 rounded-full font-medium`}>
              Submit
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_STUDENTS_IN_CLASS.map((student) => (
              <div key={student.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                    {student.name.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-400">Roll No: {student.rollNo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   {[AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE].map((status) => {
                     const isSelected = attendance[student.id] === status;
                     let colorClass = 'bg-gray-50 text-gray-400 hover:bg-gray-100';
                     if (isSelected) {
                       if (status === AttendanceStatus.PRESENT) colorClass = 'bg-green-100 text-green-700 border-green-200';
                       if (status === AttendanceStatus.ABSENT) colorClass = 'bg-red-100 text-red-700 border-red-200';
                       if (status === AttendanceStatus.LATE) colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
                     }
                     
                     return (
                       <button
                         key={status}
                         onClick={() => handleMarkAttendance(student.id, status)}
                         className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${colorClass}`}
                         title={status}
                       >
                         {status === AttendanceStatus.PRESENT && <Check size={16} />}
                         {status === AttendanceStatus.ABSENT && <X size={16} />}
                         {status === AttendanceStatus.LATE && <Clock size={16} />}
                       </button>
                     );
                   })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Widget */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Upcoming Schedule</h3>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', subject: 'Math', class: '10-A', room: '101' },
                { time: '10:00 AM', subject: 'Physics', class: '10-B', room: 'Lab 2' },
                { time: '11:30 AM', subject: 'Free Period', class: '-', room: 'Staff Room' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full z-10"></div>
                    {idx !== 2 && <div className="w-0.5 h-full bg-gray-100 -mt-1 absolute top-2"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-semibold text-gray-500">{item.time}</p>
                    <p className="font-medium text-gray-900">{item.subject}</p>
                    <p className="text-xs text-gray-400">{item.class} • {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
             <h3 className="font-bold text-lg mb-2">Create Assignment</h3>
             <p className="text-indigo-100 text-sm mb-4">Post homework for your classes quickly.</p>
             <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
               Create Now <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
