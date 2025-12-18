import React from 'react';
import { School } from '../types';
import { Users, DollarSign, BookOpen, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  school: School;
}

const dataAttendance = [
  { name: 'Mon', present: 95 },
  { name: 'Tue', present: 93 },
  { name: 'Wed', present: 96 },
  { name: 'Thu', present: 88 },
  { name: 'Fri', present: 92 },
];

const dataRevenue = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ school }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Administrator Overview</h2>
        <button className={`bg-${school.primaryColor}-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90`}>
          Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '1,240', icon: Users, color: 'blue' },
          { label: 'Total Teachers', value: '86', icon: BookOpen, color: 'emerald' },
          { label: 'Fee Collection', value: '$45,200', icon: DollarSign, color: 'amber' },
          { label: 'Avg Attendance', value: '94%', icon: TrendingUp, color: 'purple' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-${stat.color}-50 text-${stat.color}-600`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="present" fill={`#4f46e5`} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Collection (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Quick Actions List (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-100">
            {[1,2,3].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm text-gray-700">New student enrollment application received.</p>
                    </div>
                    <span className="text-xs text-gray-400">2h ago</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
