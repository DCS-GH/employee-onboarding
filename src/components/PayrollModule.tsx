import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { CreditCard, DollarSign, CheckCircle2, Save, HelpCircle, ArrowLeft, ArrowRight, ClipboardCheck } from 'lucide-react';

interface PayrollProps {
  onNext: () => void;
  onBack: () => void;
}

export const PayrollModule: React.FC<PayrollProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, updateEmployeeProfile, currentRole, verifyBankDetails } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Forms states
  const [bankName, setBankName] = useState(emp.bankName || '');
  const [bankAccount, setBankAccount] = useState(emp.bankAccount || '');
  const [bankRouting, setBankRouting] = useState(emp.bankRouting || '');
  const [taxId, setTaxId] = useState(emp.taxId || '');

  // Benefits choice checking
  const [medPlan, setMedPlan] = useState('Standard PPO');
  const [dentalSecured, setDentalSecured] = useState(true);
  const [contrib45, setContrib45] = useState('3% Contrib');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    updateEmployeeProfile(emp.id, {
      bankName,
      bankAccount,
      bankRouting,
      taxId
    });
    
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-rose-500 font-bold">Phase 1: Financial onboarding</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Benefits Integration & Salary Accounts</h2>
          <p className="text-slate-500 text-sm mt-1">
            Input direct deposit bank routing information and withholding tax configurations to prevent First Month payroll delays.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs font-mono font-bold flex items-center space-x-1 self-start select-none">
          <DollarSign className="w-4 h-4 text-emerald-500 mr-0.5" />
          <span>Salary Account Inbound Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        {/* Salary Account Bank Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center mb-1">
            <CreditCard className="w-4 h-4 mr-1 text-emerald-500" />
            <span>Direct Deposit routing settings</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Official Bank Brand Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => { setBankName(e.target.value); setSuccess(false); }}
                  placeholder="e.g. Chase Bank, NA"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Account Number <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => { setBankAccount(e.target.value); setSuccess(false); }}
                  placeholder="e.g. •••• •••• ••89 12"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">9-Digit Routing Code <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={bankRouting}
                  onChange={(e) => { setBankRouting(e.target.value); setSuccess(false); }}
                  placeholder="e.g. 121000248"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Tax Identification Number (SSN / EIN) <span className="text-rose-500">*</span></label>
                <input
                  type="password"
                  value={taxId}
                  onChange={(e) => { setTaxId(e.target.value); setSuccess(false); }}
                  placeholder="e.g. XXX-XX-XXXX"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                  required
                />
              </div>
            </div>

            {success && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-lg text-xs flex items-center space-x-1.5 animate-fade-in text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Success: Deposit credentials locked and submitted to Finance Desk.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition duration-150 inline-flex items-center justify-center space-x-1.5 cursor-pointer shadow"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Authorizing...' : 'Save Financial Parameters'}</span>
            </button>
          </form>
        </div>

        {/* Health Benefits choice dashboard */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center mb-1">
            <ClipboardCheck className="w-4 h-4 mr-1 text-teal-500" />
            <span>Health & Retires Benefits Options</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Enterprise Medical Health Plans</span>
              <div className="grid grid-cols-2 gap-2 mt-1.5 font-semibold">
                {['Standard PPO', 'Core HDHP (HSA Eligible)'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setMedPlan(opt)}
                    className={`p-3 border rounded-xl text-center cursor-pointer transition ${
                      medPlan === opt ? 'border-rose-400 bg-rose-50/20 text-rose-800' : 'border-slate-100 bg-slate-50/25 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">401(k) Retires Comp Match Allocation</span>
              <div className="grid grid-cols-3 gap-2 mt-1.5 font-semibold">
                {['3% Contrib', '6% Contrib', 'Do Not Enroll'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setContrib45(opt)}
                    className={`p-2.5 border rounded-xl text-center text-[11px] cursor-pointer transition ${
                      contrib45 === opt ? 'border-rose-400 bg-rose-50/20 text-rose-800' : 'border-slate-100 bg-slate-50/25 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5 leading-relaxed text-[11px] text-slate-500">
              <span className="font-bold text-slate-800">Direct Deposit validation checkpoint:</span>
              <p>
                Financial operators cross-verify routing codes with registered state clearinghouses. Status metrics populate inside your Onboarding Checklist instantly upon submit.
              </p>
            </div>
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
          <span>Role & Responsibilities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
