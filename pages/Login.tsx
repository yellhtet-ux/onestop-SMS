import React, { useState } from 'react';
import { School, User } from '../types';
import { verifySchoolCode, loginUser } from '../services/authService';
import { Building2, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User, school: School) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [schoolCode, setSchoolCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Mock password
  const [school, setSchool] = useState<School | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifySchool = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate network delay
    setTimeout(() => {
      const foundSchool = verifySchoolCode(schoolCode);
      if (foundSchool) {
        setSchool(foundSchool);
        setStep(2);
      } else {
        setError('Invalid school code. Try "TOWN01" or "ELITE99".');
      }
      setLoading(false);
    }, 600);
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (school) {
        const user = loginUser(email, school.id);
        if (user) {
          onLogin(user, school);
        } else {
          setError('Invalid credentials. Try "admin@town.com" or "student@town.com".');
        }
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              {school?.logoUrl ? (
                <img src={school.logoUrl} alt="Logo" className="w-full h-full rounded-full object-cover" />
              ) : (
                <Building2 size={32} />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'Find Your School' : `Welcome to ${school?.name}`}
            </h1>
            <p className="text-gray-500 mt-2">
              {step === 1 
                ? 'Enter the code provided by your administration.' 
                : 'Please sign in to continue.'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleVerifySchool} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Code</label>
                <input
                  type="text"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                  placeholder="e.g. TOWN01"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Next <ArrowRight size={18} /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleUserLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-${school?.primaryColor || 'indigo'}-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2`}
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep(1); setSchool(null); }}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Change School
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
          EduNexus v1.0 • Secure Student Portal
        </div>
      </div>
    </div>
  );
};

export default Login;