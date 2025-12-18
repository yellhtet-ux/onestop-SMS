import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import * as Modules from './pages/Modules';
import { User, School, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Hydrate state from local storage or check session (Mock)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // In a real app, we check for tokens here
  }, []);

  const handleLogin = (loggedInUser: User, loggedInSchool: School) => {
    setUser(loggedInUser);
    setSchool(loggedInSchool);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSchool(null);
  };

  if (!user || !school) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Main Dashboard Routing
    if (activeTab === 'dashboard') {
      switch (user.role) {
        case UserRole.ADMIN: return <AdminDashboard school={school} />;
        case UserRole.TEACHER: return <TeacherDashboard user={user} school={school} />;
        case UserRole.STUDENT: return <StudentDashboard user={user} school={school} />;
        case UserRole.PARENT: return <ParentDashboard user={user} school={school} />;
        default: return <div>Unknown Role</div>;
      }
    }

    // Module Routing based on Tab ID and Role
    switch (user.role) {
      case UserRole.ADMIN:
        if (activeTab === 'users') return <Modules.AdminUsers />;
        if (activeTab === 'academics') return <Modules.AdminAcademics />;
        if (activeTab === 'fees') return <Modules.AdminFees />;
        if (activeTab === 'reports') return <Modules.AdminReports />;
        break;
      case UserRole.TEACHER:
        if (activeTab === 'attendance') return <TeacherDashboard user={user} school={school} />; // Reuse dashboard or dedicated
        if (activeTab === 'classes') return <Modules.TeacherClasses />;
        if (activeTab === 'exams') return <Modules.TeacherExams />;
        break;
      case UserRole.STUDENT:
        if (activeTab === 'timetable') return <Modules.StudentTimetable />;
        if (activeTab === 'homework') return <StudentDashboard user={user} school={school} />; // Reuse logic or dedicated
        if (activeTab === 'exams') return <Modules.StudentExams />;
        break;
      case UserRole.PARENT:
        if (activeTab === 'children') return <Modules.ParentChildren />;
        if (activeTab === 'fees') return <Modules.AdminFees />; // Reusing generic fee view logic for simplicity in sample
        if (activeTab === 'messages') return <Modules.ParentMessages />;
        break;
    }

    // Fallback
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="text-6xl font-thin mb-4">404</div>
        <p className="text-lg">Module "{activeTab}" not found.</p>
      </div>
    );
  };

  return (
    <Layout 
      user={user} 
      school={school} 
      activeTab={activeTab} 
      onNavigate={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;