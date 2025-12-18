import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
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
    // Simplified routing based on Active Tab and Role
    // For Dashboard View
    if (activeTab === 'dashboard') {
      switch (user.role) {
        case UserRole.ADMIN:
          return <AdminDashboard school={school} />;
        case UserRole.TEACHER:
          return <TeacherDashboard user={user} school={school} />;
        case UserRole.STUDENT:
          return <StudentDashboard user={user} school={school} />;
        case UserRole.PARENT:
          return <ParentDashboard user={user} school={school} />;
        default:
          return <div>Unknown Role</div>;
      }
    }

    // Placeholder for other tabs (Mock Implementation for navigation demonstration)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="text-6xl font-thin mb-4">WIP</div>
        <p className="text-lg">The "{activeTab}" module is under development for {user.role}.</p>
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
