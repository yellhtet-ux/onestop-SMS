import React, { useState } from 'react';
import { User, School, UserRole } from '../types';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Users, 
  LogOut, 
  Bell,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  school: School;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, school, activeTab, onNavigate, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define navigation items based on role
  const getNavItems = () => {
    const common = [{ id: 'dashboard', label: 'Dashboard', icon: Home }];
    
    switch (user.role) {
      case UserRole.ADMIN:
        return [
          ...common,
          { id: 'users', label: 'Users', icon: Users },
          { id: 'academics', label: 'Academics', icon: BookOpen },
          { id: 'fees', label: 'Finance', icon: CreditCard },
          { id: 'reports', label: 'Reports', icon: Calendar },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { id: 'attendance', label: 'Attendance', icon: Users },
          { id: 'classes', label: 'My Classes', icon: BookOpen },
          { id: 'exams', label: 'Exams & Grades', icon: GraduationCap },
        ];
      case UserRole.STUDENT:
        return [
          ...common,
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'homework', label: 'Homework', icon: BookOpen },
          { id: 'exams', label: 'Grades', icon: GraduationCap },
        ];
      case UserRole.PARENT:
        return [
          ...common,
          { id: 'children', label: 'My Children', icon: Users },
          { id: 'fees', label: 'Fees', icon: CreditCard },
          { id: 'messages', label: 'Messages', icon: Bell },
        ];
      default:
        return common;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <div className={`w-8 h-8 rounded bg-${school.primaryColor}-600 flex items-center justify-center text-white font-bold`}>
             {school.name.substring(0,1)}
           </div>
           <span className="font-semibold text-gray-800">{school.name}</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100 hidden md:flex items-center gap-3">
           <img src={school.logoUrl} alt="Logo" className="w-10 h-10 rounded-full bg-gray-100" />
           <div>
             <h1 className="font-bold text-gray-900 text-sm leading-tight">{school.name}</h1>
             <p className="text-xs text-gray-500 uppercase tracking-wider">{user.role}</p>
           </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? `bg-${school.primaryColor}-50 text-${school.primaryColor}-700 font-medium` 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation (Optional - using Sidebar for now for consistency, but sticking to PRD 'mobile-first' could mean bottom nav. 
          The provided layout uses a drawer which is standard for admin/complex apps. 
          To strictly follow mobile app feel, sticky bottom nav is better for core actions, but Drawer handles the "Admin" density better.
          I will stick to Drawer for consistency across roles for this MVP version.) 
      */}
    </div>
  );
};

export default Layout;
