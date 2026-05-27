import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { HelpCircle, Save, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface PreboardingProps {
  onNext: () => void;
  onBack: () => void;
}

export const Preboarding: React.FC<PreboardingProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, updateEmployeeProfile } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Forms state
  const [formData, setFormData] = useState({
    phoneNumber: emp.phoneNumber || '',
    dateOfBirth: emp.dateOfBirth || '',
    addressLines: emp.addressLines || '',
    city: emp.city || '',
    state: emp.state || '',
    postalCode: emp.postalCode || '',
    emergencyContactName: emp.emergencyContactName || '',
    emergencyContactPhone: emp.emergencyContactPhone || '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccess(false);
    setErrorMsg('');
  };

  const validate = () => {
    if (!formData.phoneNumber) return 'PhoneNumber cannot be empty.';
    if (!formData.dateOfBirth) return 'Date of Birth is required.';
    if (!formData.addressLines) return 'Address is required.';
    if (!formData.city) return 'City is required.';
    if (!formData.state) return 'State is required.';
    if (!formData.postalCode) return 'Postal code is required.';
    if (!formData.emergencyContactName) return 'Emergency Contact Name cannot be empty.';
    if (!formData.emergencyContactPhone) return 'Emergency Contact Phone cannot be empty.';
    return '';
  };

  const handleSave = (silent = false) => {
    const err = validate();
    if (err) {
      setErrorMsg(err);
      return false;
    }

    setSaving(true);
    updateEmployeeProfile(emp.id, formData);
    
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 400);

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleSave()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-teal-500 font-bold">Phase 1: Pre-boarding</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Verification & Emergency Record</h2>
          <p className="text-slate-500 text-sm mt-1">Please confirm or update your employee records below. Completed datasets advance your corporate identity profile.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg w-max select-none">
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span>SSN Data Verified Client-Side</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section: Basic Identity (Read-only corporate allocations) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase border-b border-slate-50 pb-2.5">
              Read-Only Corporate Identity
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Full Legal Name</label>
                <div className="mt-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
                  {emp.name}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Employee serial number ID</label>
                <div className="mt-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-mono font-bold text-slate-600">
                  {emp.id}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Assigned Business Email</label>
                <div className="mt-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
                  {emp.email}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Department Group</label>
                <div className="mt-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs text-slate-600 font-medium">
                  {emp.department}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Assigned Designation Role</label>
                <div className="mt-1 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs text-slate-600 font-medium">
                  {emp.role}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-50 leading-normal">
              *If assigned designation is incorrect, contact your HR Operations Coordinator to re-allocate core profile parameters.
            </p>
          </div>

          {/* Section: Contact & KYC inputs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase border-b border-slate-50 pb-2.5">
              Contact & Date details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Phone Contact Number <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Date of Birth <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Residential Street Address <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="addressLines"
                  value={formData.addressLines}
                  onChange={handleChange}
                  placeholder="Street and Apt number"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">City <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">State <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="CA"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">ZIP Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="94103"
                    className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Emergency Contacts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-left lg:col-span-2">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase border-b border-slate-50 pb-2.5">
              Emergency Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Emergency Contact Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Relationship - Name"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block font-bold">Emergency Contact Phone <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 987-6543"
                  className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Box Validation */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs px-4 py-3 rounded-xl text-left">
            {errorMsg}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs px-4 py-3 rounded-xl flex items-center space-x-2 text-left">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Success: Draft profiles synchronized dynamically with local datastores.</span>
          </div>
        )}

        {/* Footer controls: Back, Save, Next */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center space-x-1 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 border border-slate-200 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition duration-150 flex items-center justify-center space-x-1 shadow-md cursor-pointer"
            >
              <span>Submit & Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
