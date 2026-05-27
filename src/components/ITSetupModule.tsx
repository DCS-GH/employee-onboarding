import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Cpu, CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldAlert, ArrowLeft, ArrowRight, Server, Laptop } from 'lucide-react';

interface ITSetupProps {
  onNext: () => void;
  onBack: () => void;
}

export const ITSetupModule: React.FC<ITSetupProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, accessItems, updateAccessStatus } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empAccess = accessItems.filter(a => a.employeeId === emp.id);

  // Issues reporting panel
  const [issueText, setIssueText] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleToggleSystem = (itemId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Active' ? 'Not Started' : currentStatus === 'In Progress' ? 'Active' : 'In Progress';
    const mockEmail = nextStatus === 'Active' ? `${emp.name.toLowerCase().replace(' ', '.')}@enterprise.com` : undefined;
    updateAccessStatus(itemId, nextStatus, mockEmail);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText) return;
    setIssueSubmitted(true);
    setIssueText('');
    setTimeout(() => setIssueSubmitted(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold">Phase 2: Laptop and systems Setup</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">IT Provisioning & Multi-Factor Access</h2>
          <p className="text-slate-500 text-sm mt-1">
            Track hardware delivery and corporate credentials. Activate SSO credentials for Figma, Github, or Slack.
          </p>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-lg self-start">
          <Laptop className="w-4 h-4 text-blue-500 mr-0.5" />
          <span>MacBook Pro M3 Max Allocated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase">
              Corporate Credentials & Single Sign-On (SSO) Status
            </h3>

            <div className="space-y-3">
              {empAccess.map((access) => {
                const colors = {
                  'Not Started': 'bg-slate-100 text-slate-500 border-slate-200',
                  'In Progress': 'bg-amber-50 text-amber-700 border-amber-150 animate-pulse',
                  'Active': 'bg-emerald-50 text-emerald-800 border-emerald-100'
                };

                return (
                  <div key={access.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600">
                        <Server className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-805">{access.systemName}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Category: {access.category}</span>
                        {access.accName && (
                          <span className="block text-[11px] font-mono text-emerald-600 font-semibold mt-1">
                            LOG IN: {access.accName} (SSO-ACTIVE)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${colors[access.status]}`}>
                        {access.status}
                      </span>
                      
                      {/* Interactive toggle simulator for easy client evaluation */}
                      <button
                        onClick={() => handleToggleSystem(access.id, access.status)}
                        className="text-[10px] font-mono bg-slate-900 text-white hover:bg-slate-800 px-2 py-1 rounded transition w-24 text-center cursor-pointer"
                        title="Click to simulate IT Desk changing status"
                      >
                        [Sim. IT Trigger]
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <span className="block text-[10px] text-slate-400 bg-slate-50 p-2 rounded border border-slate-100 leading-normal">
              💡 <strong>Reviewer Tip:</strong> Each credentials status can be triggered or toggled dynamically using the local <strong>[Sim. IT Trigger]</strong> helper button above!
            </span>
          </div>
        </div>

        {/* Hardware details and Raise support issue ticket */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-850 tracking-tight uppercase border-b border-slate-50 pb-2">
              Assigned Work Laptop Details
            </h3>

            <div className="space-y-3 font-mono text-xs text-slate-500">
              <div className="flex justify-between border-b border-slate-50 pb-1.5Packed">
                <span>ASSET BRAND:</span>
                <strong className="text-slate-800 font-sans">Apple MacBook Pro 16"</strong>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>HARDWARE CHIP:</span>
                <strong className="text-slate-800">M3 Max (36GB RAM, 1TB SSD)</strong>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>SERIAL ASSIGNMENT:</span>
                <strong className="text-indigo-600">#MBP-2026-X912</strong>
              </div>
              <div className="flex justify-between pb-0.5">
                <span>SHIPPING STATE:</span>
                <strong className="text-emerald-600 font-semibold font-sans">Delivered & Verified</strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1 text-red-500" />
              <span>Report IT Deployment Issue</span>
            </h4>
            <p className="text-xs text-slate-500">
              Laptops not syncing or VPN blocking? Drop a message to trigger IT priority escalations.
            </p>

            <form onSubmit={handleIssueSubmit} className="space-y-2">
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="SSO registration locks on login. Help!"
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-slate-900 text-white rounded-lg text-xs py-2 font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Dispatch Ticket to IT Support Queue
              </button>
            </form>

            {issueSubmitted && (
              <span className="block text-[10px] text-emerald-700 bg-emerald-50 p-1.5 rounded text-center font-semibold font-mono">
                ✓ IT Support ticket recorded under ID: ENT-IT-420B
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
          <span>Meet Your Team</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
