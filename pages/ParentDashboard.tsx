import React, { useState } from 'react';
import { User, School } from '../types';
import { MOCK_USERS, MOCK_FEES } from '../constants';
import { User as UserIcon, CreditCard, ChevronDown, Download, AlertTriangle } from 'lucide-react';
import StudentDashboard from './StudentDashboard';

interface ParentDashboardProps {
  user: User;
  school: School;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, school }) => {
  // Find children for this parent
  const children = MOCK_USERS.filter(u => user.childrenIds?.includes(u.id));
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id);
  const selectedChild = children.find(c => c.id === selectedChildId);

  if (!selectedChild) return <div>No children linked.</div>;

  return (
    <div className="space-y-8">
      {/* Child Switcher Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Parent Portal</h2>
          <p className="text-gray-500 text-sm">Monitoring academic progress</p>
        </div>
        
        <div className="relative group">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
               {selectedChild.name[0]}
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Viewing profile of</p>
              <p className="font-semibold text-gray-900 leading-tight">{selectedChild.name}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
          
          {/* Dropdown for multiple children */}
          {children.length > 1 && (
             <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
               {children.map(child => (
                 <div 
                   key={child.id} 
                   onClick={() => setSelectedChildId(child.id)}
                   className="p-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700"
                 >
                   {child.name}
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Fee Status Card - Important for Parents */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-indigo-500" />
                Fee Status
              </h3>
              
              <div className="space-y-4">
                {MOCK_FEES.filter(f => f.studentId === selectedChild.id).map(fee => (
                  <div key={fee.id} className="border border-gray-100 rounded-lg p-4">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <p className="font-medium text-gray-900">{fee.title}</p>
                           <p className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          fee.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                          fee.status === 'OVERDUE' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {fee.status}
                        </span>
                     </div>
                     <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-gray-800">${fee.amount}</span>
                        {fee.status !== 'PAID' && (
                          <button className={`text-xs bg-${school.primaryColor}-600 text-white px-3 py-1.5 rounded hover:opacity-90 transition-opacity`}>
                            Pay Now
                          </button>
                        )}
                        {fee.status === 'PAID' && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download size={16} />
                          </button>
                        )}
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <UserIcon className="text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Homeroom Teacher Note</p>
                <p className="text-xs text-blue-600 mt-1">Johnny has been doing excellent work in Mathematics this week. - Mr. Smith</p>
              </div>
            </div>
         </div>

         {/* Reuse Student Dashboard Components for Academic View */}
         <div className="lg:col-span-2">
            <div className="relative">
              {/* Overlay to indicate this is a read-only view of the student's dashboard */}
              <div className="absolute -top-3 left-0 bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                Student View Mirror
              </div>
              <StudentDashboard user={selectedChild} school={school} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
