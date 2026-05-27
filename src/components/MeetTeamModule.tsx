import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Users, Mail, Phone, Heart, Search, Calendar, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAvatarFallback } from '../avatar';

interface TeamProps {
  onNext: () => void;
  onBack: () => void;
}

export const MeetTeamModule: React.FC<TeamProps> = ({ onNext, onBack }) => {
  const { teamMembers } = useOnboarding();
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const filteredTeam = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendIntro = (memberName: string) => {
    if (!chatMessage) return;
    setSentSuccess(true);
    setChatMessage('');
    setTimeout(() => {
      setSentSuccess(false);
      setSelectedMember(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-500 font-bold">Phase 2: Culture & Integration</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Meet Your Support Team & Buddy</h2>
          <p className="text-slate-500 text-sm mt-1 font-sans">
            Your custom-assigned manager, onboarding buddy, and delivery leaders are ready to help you thrive from Day 1.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teams / roles..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 text-left"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Active team grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase">
              Assigned Core Personnel Directory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTeam.map((member) => (
                <div key={member.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/15 flex flex-col justify-between hover:shadow-sm hover:border-indigo-400/20 transition duration-150">
                  <div>
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        onError={useAvatarFallback(member.name, 1)}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
                      />
                      <div>
                        {member.isBuddy && (
                          <span className="text-[8px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide mb-1 inline-block">
                            ★ Assigned Buddy
                          </span>
                        )}
                        {member.isManager && (
                          <span className="text-[8px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide mb-1 inline-block">
                            👔 Reporting Manager
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-800">{member.name}</h4>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-3 italic leading-relaxed">
                      "{member.intro}"
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-slate-400">{member.department}</span>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedMember(member.name)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                        title="Draft welcome email"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Coffee call appointment request sent directly to ${member.name}. Check Teams upcoming agendas!`)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
                        title="Schedule quick Coffee Chat connect"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messaging popup panel */}
        <div className="space-y-4">
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md border border-indigo-500/20 text-left">
            <h3 className="text-sm font-extrabold uppercase text-cyan-300">
              Onboarding Message Board
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Use this shortcut connection tool to state hello, share feedback, or resolve onboarding doubts with buddies.
            </p>

            {selectedMember ? (
              <div className="mt-4 space-y-3">
                <div className="text-xs bg-slate-850 p-2 text-indigo-200 rounded font-mono border border-slate-800">
                  RE: {selectedMember}
                </div>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Hey, looking forward to starting tomorrow! Let's connect."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  required
                />
                
                <div className="flex justify-between items-center bg-slate-900 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-800 rounded-lg hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendIntro(selectedMember)}
                    className="bg-cyan-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-cyan-500"
                  >
                    Dispatch Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center py-6 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <Heart className="w-8 h-8 mx-auto text-pink-500/40 mb-2" />
                <span className="text-xs">Select a team member icon to draft a welcoming intro notes.</span>
              </div>
            )}

            {sentSuccess && (
              <span className="block mt-3 text-xs text-emerald-300 font-semibold text-center font-mono">
                ✓ Delivered message to Slack channel.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center justify-center space-x-1 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition duration-150 flex items-center justify-center space-x-1 shadow-md cursor-pointer"
        >
          <span>Training & Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
