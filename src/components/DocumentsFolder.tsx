import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { FileText, Upload, Trash, CheckCircle2, AlertTriangle, Clock, ArrowLeft, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

interface DocumentsFolderProps {
  onNext: () => void;
  onBack: () => void;
}

export const DocumentsFolder: React.FC<DocumentsFolderProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, documents, uploadDocument, acknowledgePolicy, policies } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empDocs = documents.filter(d => d.employeeId === emp.id);

  // Digital Contract signature simulated state
  const [signedName, setSignedName] = useState('');
  const [eSigned, setESigned] = useState(false);
  const [signingDate, setSigningDate] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);

  const handleMockUpload = (docId: string, docName: string) => {
    // Generate mock details
    const fileSize = `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`;
    const randomUrl = `/v2/mock/doc-${docId}.pdf`;
    uploadDocument(docId, randomUrl, fileSize);
  };

  const handleSignContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signedName) return;
    setESigned(true);
    setSigningDate(new Date().toLocaleString());
    setShowSignModal(false);
    
    // Also mark handbook or agreement tasks as completed if needed
    // In our context, we log the sign off
  };

  // Check if all mandatory documents are verified
  const mandatoryDocs = empDocs.filter(d => d.isRequired);
  const allMandatoryVerified = mandatoryDocs.length > 0 && mandatoryDocs.every(d => d.status === 'Verified');

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold">Phase 1: Legal & Compliance</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Required Documentation folders</h2>
          <p className="text-slate-500 text-sm mt-1">
            Standard regulatory framework requires direct verification of identities and legal contract structures before your First Day.
          </p>
        </div>
        
        {allMandatoryVerified ? (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center space-x-1.5 self-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>All Core Docs Verified</span>
          </div>
        ) : (
          <div className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-100 flex items-center space-x-1.5 self-start">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Verification Pending</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Folders List */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase">
              Compliance Folders & Verifications
            </h3>

            <div className="space-y-3.5">
              {empDocs.map((doc) => {
                const isUploaded = doc.status !== 'Not Started';
                const statusColors = {
                  'Not Started': 'bg-slate-100 text-slate-500 border-slate-200',
                  'Submitted': 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse',
                  'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-100',
                  'Rejected': 'bg-rose-50 text-rose-700 border-rose-100'
                };

                return (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-xl border transition-all ${
                      doc.status === 'Verified' ? 'bg-slate-50/40 border-slate-100' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600">
                          <FileText className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-800">{doc.name}</span>
                            {doc.isRequired ? (
                              <span className="text-[9px] font-bold text-rose-500 px-1 bg-rose-50 rounded">MANDATORY</span>
                            ) : (
                              <span className="text-[9px] text-slate-400 px-1 bg-slate-100 rounded">OPTIONAL</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            Category: {doc.category} {doc.fileSize ? `• Size: ${doc.fileSize}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Right Hand: Status Tag and Mock Upload trigger */}
                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[doc.status]}`}>
                          {doc.status}
                        </span>

                        {doc.status !== 'Verified' && (
                          <button
                            onClick={() => handleMockUpload(doc.id, doc.name)}
                            className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-[11px] font-semibold hover:bg-slate-800 transition flex items-center space-x-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploaded ? 'Replace' : 'Upload Mock'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* HR rejection feedback alerts */}
                    {doc.status === 'Rejected' && doc.remarks && (
                      <div className="mt-3 bg-rose-50 border border-rose-100/30 text-rose-700 p-2.5 rounded-lg text-xs flex items-start space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold">HR Operational Rejection Remark:</span>
                          <p className="mt-0.5 text-slate-600">{doc.remarks}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <p className="text-[11px] text-slate-400 italic">
              *The platform automatically simulates background processing. Submitting a mock document moves it directly into HR Action queue for verification under the "HR Console" role tab.
            </p>
          </div>
        </div>

        {/* Legal Contract Signing Panel Widget */}
        <div className="space-y-4 text-left">
          <div className="bg-gradient-to-br from-indigo-550 to-indigo-900 bg-indigo-950 text-white p-5 rounded-2xl shadow-md border border-indigo-500/30">
            <h3 className="text-sm font-extrabold tracking-tight uppercase flex items-center mb-3">
              <ShieldCheck className="w-4 h-4 mr-1 text-cyan-300" />
              <span>C-Suite Direct Contract Portal</span>
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed mb-4">
              All incoming staff are requested to digitally sign the Intellectual Property Assignment & Code of Business Standards statement.
            </p>

            {eSigned ? (
              <div className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/20 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-300">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-100">Digitally Authenticated</span>
                </div>
                <div className="text-[11px] space-y-1 font-mono text-slate-300">
                  <p>SIGNATURE: <span className="text-white font-bold tracking-wider">{signedName}</span></p>
                  <p>STAMP DATE: {signingDate}</p>
                  <p>CERT: MD5-EC-IP-9281</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <button
                  onClick={() => setShowSignModal(true)}
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Launch Digital E-Sign Contract</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signing Modal simulation */}
      {showSignModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 text-left">
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
              <span className="text-xs font-black text-indigo-600 font-mono tracking-widest uppercase">NDA INTEGRITY CORE</span>
              <button onClick={() => setShowSignModal(false)} className="text-slate-400 hover:text-slate-600 font-mono">✕</button>
            </div>
            
            <form onSubmit={handleSignContractSubmit} className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-slate-900">Sign Intellectual Property Acknowledgement</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                By entering your full legal name below, you certify that you have read and accepted the Intellectual Property, Non-Disclosure, and Conduct clauses listed in the corporate index directories.
              </p>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Full Legal Name</label>
                <input
                  type="text"
                  value={signedName}
                  onChange={(e) => setSignedName(e.target.value)}
                  placeholder={emp.name}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-1 focus:ring-indigo-500 mt-1"
                  required
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] font-mono text-slate-500 text-left">
                AUTHORIZED TIMESTAMP: 2026-05-26 23:15
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="text-xs font-semibold text-slate-500 px-3 py-2 border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!signedName}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Authorize & Sign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          <span>Continue to Schedule</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
