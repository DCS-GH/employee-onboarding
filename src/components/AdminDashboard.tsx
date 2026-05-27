import React, { useState } from 'react';
import { useOnboarding } from '../store';
import {
  Users,
  CheckCircle,
  XCircle,
  FileCheck,
  Cpu,
  DollarSign,
  Plus,
  Compass,
  AlertCircle,
  Bookmark,
  ChevronRight,
  Filter,
  UserCheck,
  RefreshCw,
  Clock,
  ClipboardList
} from 'lucide-react';
import { OnboardingPhase, Employee } from '../types';
import { avatarDataUri, useAvatarFallback } from '../avatar';

export const AdminDashboard: React.FC = () => {
  const {
    employees,
    currentRole,
    setCurrentRole,
    selectedAdminEmployeeId,
    setSelectedAdminEmployeeId,
    documents,
    verifyDocument,
    verifyBankDetails,
    updateEmployeeProfile,
    accessItems,
    updateAccessStatus,
    auditLogs,
    resetToDefault
  } = useOnboarding();

  // Selected filter states
  const [phaseFilter, setPhaseFilter] = useState<OnboardingPhase | 'All'>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');

  // New Employee entry form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    role: '',
    department: 'Engineering',
    startDate: '2026-06-01',
    location: 'Corporate HQ, SF - Floor 3',
    managerName: 'Robert Vance'
  });

  const [addSuccess, setAddSuccess] = useState(false);

  // Trigger Remarks state
  const [remarksInput, setRemarksInput] = useState<Record<string, string>>({});

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email || !newEmp.role) return;

    const id = `EMP-2026-0${employees.length + 1}`;
    const generated: Employee = {
      id,
      name: newEmp.name,
      email: newEmp.email,
      role: newEmp.role,
      department: newEmp.department,
      startDate: newEmp.startDate,
      photoUrl: avatarDataUri(newEmp.name, employees.length + 1),
      completionPercentage: 10,
      currentPhase: 'Pre-boarding',
      location: newEmp.location,
      reportingTime: '09:00 AM',
      managerName: newEmp.managerName,
      managerEmail: 'm.lead@enterprise.com',
      buddyName: 'Claire Redfield',
      buddyEmail: 'c.red@enterprise.com',
      mentorName: 'David Mercer',
      phoneNumber: '+1 (555) 999-8888',
      dateOfBirth: '1995-12-10',
      addressLines: '99 Mission Road',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      emergencyContactName: 'John Doe Sr.',
      emergencyContactPhone: '+1 (555) 333-2222',
      bankName: 'Silicon Valley Bank',
      bankAccount: '•••• •••• ••00 99',
      bankRouting: '121000248',
      taxId: '999-XX-0000'
    };

    // Save
    const stored = localStorage.getItem('onboard_employees');
    const list = stored ? JSON.parse(stored) : employees;
    const newList = [...list, generated];
    localStorage.setItem('onboard_employees', JSON.stringify(newList));
    window.location.reload(); // Synchronize simple reload triggers
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const phaseMatch = phaseFilter === 'All' || emp.currentPhase === phaseFilter;
    const deptMatch = deptFilter === 'All' || emp.department === deptFilter;
    return phaseMatch && deptMatch;
  });

  const selectedEmp = employees.find(e => e.id === selectedAdminEmployeeId) || employees[0];
  const selectedEmpDocs = documents.filter(d => d.employeeId === selectedEmp?.id);
  const selectedEmpAccess = accessItems.filter(a => a.employeeId === selectedEmp?.id);

  const handleRemarkChange = (docId: string, text: string) => {
    setRemarksInput(prev => ({ ...prev, [docId]: text }));
  };

  return (
    <div className="space-y-6">
      {/* Upper Welcome and Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-50/10 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">MANAGEMENT & HR ENGINE</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight font-sans">Enterprise Onboarding Controller Console</h2>
          <p className="text-slate-500 text-sm mt-1">
            Oversee corporate compliance. Active Role: <strong className="text-indigo-600 uppercase font-bold">{currentRole} Dashboard Panel</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow inline-flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Employee</span>
          </button>
        </div>
      </div>

      {/* Add Employee Form overlay widget */}
      {showAddForm && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left leading-normal animate-fade-in space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center justify-between">
            <span>Corporate Joiner Enrollment Entry</span>
            <button onClick={() => setShowAddForm(false)} className="text-slate-400 font-mono hover:text-slate-600">✕</button>
          </h3>
          
          <form onSubmit={handleCreateEmployee} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">Legal Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                placeholder="Aria Thompson"
                value={newEmp.name}
                onChange={(e) => setNewEmp(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">Personal Email <span className="text-rose-500">*</span></label>
              <input
                type="email"
                placeholder="aria.t@gmail.com"
                value={newEmp.email}
                onChange={(e) => setNewEmp(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">Assigned Designation <span className="text-rose-500">*</span></label>
              <input
                type="text"
                placeholder="Staff Analytics Dev"
                value={newEmp.role}
                onChange={(e) => setNewEmp(prev => ({ ...prev, role: e.target.value }))}
                className="mt-1 w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">Department</label>
              <select
                value={newEmp.department}
                onChange={(e) => setNewEmp(prev => ({ ...prev, department: e.target.value }))}
                className="mt-1 w-full bg-white border border-slate-200 p-2 rounded-lg"
              >
                <option>Engineering</option>
                <option>Product & Design</option>
                <option>Cyber Security</option>
                <option>HR Operations</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-bold">Joining Date</label>
              <input
                type="date"
                value={newEmp.startDate}
                onChange={(e) => setNewEmp(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 w-full bg-white border border-slate-200 rounded-lg p-2"
              />
            </div>
            
            <div className="flex flex-col justify-end pt-1.5 sm:col-span-1 md:col-span-1">
              <button
                type="submit"
                className="bg-slate-900 border hover:bg-slate-800 text-white rounded-xl py-2.5 font-bold cursor-pointer"
              >
                Launch Account Onboarding
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Left Side: Employees Cohort selector */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <Users className="w-5 h-5 mr-1 text-indigo-500" />
              <span>Incoming Staff Cohort lists</span>
            </h3>

            {/* Quick selectors filters */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value as OnboardingPhase | 'All')}
                className="bg-slate-50 border border-slate-205 p-2 rounded-lg font-semibold"
              >
                <option value="All">All Phases</option>
                <option value="Pre-boarding">Pre-boarding</option>
                <option value="First Day">First Day</option>
                <option value="First Month">First Month</option>
                <option value="Support">Ongoing Support</option>
              </select>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-slate-50 border border-slate-205 p-2 rounded-lg font-semibold"
              >
                <option value="All">All Depts</option>
                <option value="Engineering">Engineering</option>
                <option value="Product & Design">Product & Design</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>

            <div className="space-y-2 mt-4">
              {filteredEmployees.map((emp) => {
                const isSelected = emp.id === selectedAdminEmployeeId;
                return (
                  <div
                    key={emp.id}
                    onClick={() => setSelectedAdminEmployeeId(emp.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected ? 'border-indigo-550 bg-indigo-50/15 font-semibold ring-1 ring-indigo-400/20' : 'border-slate-100 bg-slate-50/10 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={emp.photoUrl}
                        alt={emp.name}
                        referrerPolicy="no-referrer"
                        onError={useAvatarFallback(emp.name, 1)}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-805 truncate">{emp.name}</h4>
                        <span className="text-[10px] text-slate-450 text-slate-400 truncate block">{emp.role}</span>
                        <span className="text-[9px] text-indigo-600 font-mono mt-0.5 inline-block">{emp.currentPhase}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-800">{emp.completionPercentage}%</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-350 mx-auto mt-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Admin View depending on active Role */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sub-Panel: HR operations verifying documents */}
          {currentRole === 'HR' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
                <FileCheck className="w-4.5 h-4.5 mr-1 text-emerald-500" />
                <span>Submitted Documents Verification for: {selectedEmp.name}</span>
              </h3>

              <div className="space-y-4">
                {selectedEmpDocs.length === 0 ? (
                  <div className="text-center py-6 text-slate-405 font-medium">
                    No active documents for this employee account profile.
                  </div>
                ) : (
                  selectedEmpDocs.map((doc) => {
                    const remarks = remarksInput[doc.id] || '';
                    return (
                      <div key={doc.id} className="p-4 rounded-xl border border-slate-10s bg-slate-50/10 space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-normal">
                          <div>
                            <span className="font-bold text-slate-800 block text-sm">{doc.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">Category: {doc.category} • Uploaded: {doc.uploadedAt || 'Not Uploaded'}</span>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full ${
                              doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                              doc.status === 'Submitted' ? 'bg-blue-50 text-blue-700 font-semibold' : 'bg-rose-50 text-rose-700'
                            }`}>{doc.status}</span>
                          </div>
                        </div>

                        {doc.status === 'Submitted' && (
                          <div className="pt-2 border-t border-slate-50/80 flex flex-col sm:flex-row items-center gap-2">
                            <input
                              type="text"
                              value={remarks}
                              onChange={(e) => handleRemarkChange(doc.id, e.target.value)}
                              placeholder="Reason if rejecting..."
                              className="bg-white border text-xs px-2.5 py-1.5 rounded-lg flex-1 min-w-0"
                            />
                            
                            <div className="flex gap-1">
                              <button
                                onClick={() => verifyDocument(doc.id, 'Rejected', remarks || 'Incomplete details')}
                                className="bg-red-500 hover:bg-red-650 text-white rounded-lg text-[11px] font-bold px-3 py-1.5 cursor-pointer"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => verifyDocument(doc.id, 'Verified')}
                                className="bg-emerald-550 bg-emerald-600 hover:bg-emerald-650 text-white rounded-lg text-[11px] font-bold px-3 py-1.5 cursor-pointer"
                              >
                                Approve Verify
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Sub-Panel: IT support dashboard checklist */}
          {currentRole === 'IT' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
                <Cpu className="w-4.5 h-4.5 mr-1 text-blue-500" />
                <span>IT Access credentials deployment: {selectedEmp.name}</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                {selectedEmpAccess.map((access) => (
                  <div key={access.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{access.systemName}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Category: {access.category} • Status: {access.status}</p>
                    </div>

                    <button
                      onClick={() => {
                        const next = access.status === 'Active' ? 'Not Started' : 'Active';
                        updateAccessStatus(access.id, next, next === 'Active' ? `${selectedEmp.name.toLowerCase().replace(' ', '.')}@enterprise.com` : undefined);
                      }}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg border ${
                        access.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {access.status === 'Active' ? 'Activated' : 'Click to Deploy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Panel: Payroll specialists authorizing deposit wires */}
          {currentRole === 'Payroll' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
                <DollarSign className="w-4.5 h-4.5 mr-1 text-emerald-500" />
                <span>Salary bank and tax configs verification: {selectedEmp.name}</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-slate-50/15 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">RECIPIENT OFFICIAL BANK BRAND:</span>
                    <strong className="text-slate-800 font-semibold">{selectedEmp.bankName || 'NOT DECLARED'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">ACCOUNT WIRE NUMBER:</span>
                    <strong className="text-slate-800 font-semibold">{selectedEmp.bankAccount || 'NOT DECLARED'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">9-DIGIT STATE ROUTING VALUE:</span>
                    <strong className="text-slate-800 font-semibold">{selectedEmp.bankRouting || 'NOT DECLARED'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">SOCIAL TAX IDENTIFICATION (SSN):</span>
                    <strong className="text-indigo-600 font-semibold">{selectedEmp.taxId || 'NOT DECLARED'}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2 justify-end pt-3 border-t border-slate-50">
                  <button
                    onClick={() => verifyBankDetails(selectedEmp.id, 'Rejected')}
                    className="bg-red-500 hover:bg-red-650 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Flag Direct Deposit
                  </button>
                  <button
                    onClick={() => verifyBankDetails(selectedEmp.id, 'Verified')}
                    className="bg-emerald-600 hover:bg-emerald-650 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg cursor-pointer"
                  >
                    Authorize Direct Deposit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Non-conforming system administrator modes */}
          {(currentRole === 'Employee' || currentRole === 'Manager' || currentRole === 'Coordinator') && (
            <div className="bg-indigo-50/15 border border-indigo-50/30 p-5 rounded-2xl flex flex-col justify-center items-center h-48 text-center space-y-1">
              <AlertCircle className="w-8 h-8 text-indigo-500 animate-bounce" />
              <h3 className="text-sm font-bold text-slate-800">Operational Selection Key</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Administrative controllers override tools are protected. Select <strong>"HR Administrator"</strong>, <strong>"IT Operations"</strong>, or <strong>"Payroll"</strong> inside the top-header switcher to test document clearances!
              </p>
            </div>
          )}

          {/* Direct System-wide Audit trail timeline (Accessible to All Admin viewpoints) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 pt-5">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <ClipboardList className="w-4.5 h-4.5 mr-1 text-slate-600" />
              <span>System-Wide Security Audit Trails Logs</span>
            </h3>

            <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 space-y-2 text-xs font-mono">
              {auditLogs.map((log) => (
                <div key={log.id} className="pt-2 leading-relaxed">
                  <div className="flex justify-between text-[11px] text-slate-405 text-slate-400">
                    <span>ACTION: <strong className="text-slate-700 font-bold">{log.action}</strong></span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 font-sans mt-0.5">{log.details}</p>
                  <span className="text-[10px] text-indigo-600 block mt-0.5">PERFORMED BY: {log.performedBy} (Target: {log.employeeName})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
