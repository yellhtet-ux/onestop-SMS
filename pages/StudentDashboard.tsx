import React from 'react';
import { User, School } from '../types';
import { MOCK_ASSIGNMENTS, MOCK_TIMETABLE, MOCK_ANNOUNCEMENTS } from '../constants';
import { Clock, Book, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  school: School;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, school }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Learning Hub</h2>
      
      {/* Announcements Banner */}
      {MOCK_ANNOUNCEMENTS.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
          <AlertCircle className="text-amber-600 mt-1 shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-amber-800">{MOCK_ANNOUNCEMENTS[0].title}</h4>
            <p className="text-sm text-amber-700 mt-1">{MOCK_ANNOUNCEMENTS[0].content}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Timetable */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-indigo-500" />
              Today's Timetable
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TIMETABLE.map((slot) => (
                <div key={slot.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{slot.subject}</span>
                    <span className="text-xs text-gray-500">{slot.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Book size={20} className="text-emerald-500" />
              Homework & Assignments
            </h3>
            <div className="space-y-3">
              {MOCK_ASSIGNMENTS.map((hw) => (
                <div key={hw.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${hw.status === 'PENDING' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                    <div>
                       <p className="font-medium text-gray-900">{hw.title}</p>
                       <p className="text-xs text-gray-500">{hw.subject} • Due: {new Date(hw.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    hw.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {hw.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Grades Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-semibold text-gray-800 mb-4">Academic Progress</h3>
             <div className="space-y-4">
                {[
                  { subject: 'Mathematics', grade: 'A', score: 92 },
                  { subject: 'Science', grade: 'B+', score: 88 },
                  { subject: 'History', grade: 'A-', score: 90 },
                ].map((sub, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{sub.subject}</span>
                      <span className="font-bold text-gray-900">{sub.grade}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${sub.score}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
             <div className="flex items-start justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Overall Attendance</p>
                  <h3 className="text-3xl font-bold mt-1">96%</h3>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
             </div>
             <p className="text-xs text-emerald-100 mt-4">Keep it up! You are doing great.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
