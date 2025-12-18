import React, { useState } from 'react';
import { User, School, AttendanceStatus } from '../types';
import { MOCK_CLASSES, MOCK_STUDENTS_IN_CLASS } from '../constants';
import { Check, X, Clock, Calendar, ChevronRight, Sparkles, Loader2, Plus } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface TeacherDashboardProps {
  user: User;
  school: School;
}

interface AssignmentIdea {
  title: string;
  description: string;
  estimatedTime: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, school }) => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  
  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<AssignmentIdea[]>([]);

  const handleMarkAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const generateAssignments = async () => {
    if (!topic.trim()) return;
    
    // Access API Key safely. In browser via process polyfill or env variable.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      alert("API Key is missing. Please check .env.local file or internet connection.");
      return;
    }

    setIsGenerating(true);
    setGeneratedIdeas([]);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create 3 distinct, engaging homework assignment ideas for a high school class on the topic: '${topic}'.`,
        config: {
          systemInstruction: "You are an expert teacher's assistant known for creating creative and educational assignments.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedTime: { type: Type.STRING, description: "e.g., '30 mins' or '1 hour'" },
              },
              required: ["title", "description", "estimatedTime"],
            },
          },
        },
      });

      if (response.text) {
        const ideas = JSON.parse(response.text);
        setGeneratedIdeas(ideas);
      }
    } catch (error) {
      console.error("Failed to generate assignments", error);
      alert("Failed to generate assignments. API Key may be invalid or quota exceeded.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 relative">
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

        {/* Schedule & Actions Widget */}
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

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={64} />
             </div>
             <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
               <Sparkles size={18} className="text-yellow-300" />
               AI Assistant
             </h3>
             <p className="text-indigo-100 text-sm mb-4">Generate engaging homework assignments instantly using Gemini.</p>
             <button 
               onClick={() => setIsAiModalOpen(true)}
               className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
             >
               Create Assignment <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </div>

      {/* AI Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="text-indigo-600" size={24} />
                  AI Assignment Creator
                </h3>
                <p className="text-sm text-gray-500">Powered by Gemini 3 Flash</p>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., Quadratic Equations, The Cold War)"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && generateAssignments()}
                />
                <button
                  onClick={generateAssignments}
                  disabled={isGenerating || !topic.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate'}
                </button>
              </div>

              {generatedIdeas.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Generated Ideas</h4>
                  {generatedIdeas.map((idea, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-900 text-lg">{idea.title}</h5>
                        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium flex items-center gap-1">
                          <Clock size={12} /> {idea.estimatedTime}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{idea.description}</p>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <Plus size={16} /> Use this assignment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-indigo-500" size={32} />
                      <p>Dreaming up assignments...</p>
                    </div>
                  ) : (
                    <p>Enter a topic above to generate creative assignment ideas.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;