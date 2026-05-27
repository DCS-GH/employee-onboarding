import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Smile, HelpCircle, Send, MessageCircle, ArrowLeft, ArrowRight, CheckCircle2, Heart, ClipboardCheck } from 'lucide-react';

interface FeedbackProps {
  onNext: () => void;
  onBack: () => void;
}

export const FeedbackSupport: React.FC<FeedbackProps> = ({ onNext, onBack }) => {
  const { submitSupportTicket, tickets, submitFeedback } = useOnboarding();

  // Emoji scale selection
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Tickets creator states
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('HR Operations');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketAdded, setTicketAdded] = useState(false);

  // Bot State
  const [botMessages, setBotMessages] = useState<any[]>([
    { sender: 'bot', text: 'Hello! I am OnboardEase Virtual Assistant. Ask me anything about VPN credentials, laptop setups, direct deposits, or onboarding buddy details!' }
  ]);
  const [botInput, setBotInput] = useState('');

  const emojis = [
    { rating: 1, char: '😡', label: 'Very Poor' },
    { rating: 2, char: '😔', label: 'Imperfect' },
    { rating: 3, char: '😐', label: 'Satisfactory' },
    { rating: 4, char: '🙂', label: 'Great experience' },
    { rating: 5, char: '😍', label: 'Outstanding!' }
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmoji) return;
    
    // In our context, we register the feedback under local simulation ticket
    submitFeedback(`fdb-${Date.now()}`, selectedEmoji, feedbackText);
    setFeedbackSubmitted(true);
    setFeedbackText('');
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDesc) return;
    
    submitSupportTicket(ticketCategory, ticketSubject, ticketDesc);
    setTicketAdded(true);
    setTicketSubject('');
    setTicketDesc('');
    setTimeout(() => setTicketAdded(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;

    const userMsg = botInput.trim();
    setBotMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setBotInput('');

    // Simulated responsive intelligence dictionary
    setTimeout(() => {
      let botResponse = 'Thank you for asking! I have queued that request with corporate IT support supervisor. They are active from 09:00 AM to 05:00 PM PST.';
      
      const text = userMsg.toLowerCase();
      if (text.includes('vpn') || text.includes('credentials')) {
        botResponse = 'Corporate Global VPN Server configuration requires MFA. You must study Phase 2: "IT Setup & Access" to trigger credential dispatch! Direct links can be toggled there.';
      } else if (text.includes('laptop') || text.includes('mac') || text.includes('hardware')) {
        botResponse = 'Work MacBook Pro laptops are dispatched from SF central inventory to your registered residential address. Tracking records indicate Fedex serial MB-2026-X912 is shipped!';
      } else if (text.includes('deposit') || text.includes('bank') || text.includes('payroll')) {
        botResponse = 'Salary direct deposits are verified within 48 hours of banking routing submission. You can update details anytime in Phase 1: "Benefits & Payroll" module before First Month runs!';
      } else if (text.includes('buddy') || text.includes('mentor')) {
        botResponse = 'Your assigned peer Buddy is Claire Redfield. She is ready to connect over coffees. Meet her directly under Module 6: "Meet Your Team" and trigger intro messages!';
      } else if (text.includes('hello') || text.includes('hi')) {
        botResponse = 'Hello! Splendid to assist. Feel free to request details regarding laptop, direct deposits, or credentials.';
      }

      setBotMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 450);
  };

  const faqs = [
    { q: 'How do I obtain security badge credentials?', a: 'You must achieve 100% completion in "Information Security Basics" compliance training. Badges automatically unlock inside Module 7 Showcase!' },
    { q: 'Can I change my direct deposit details mid-cycle?', a: 'Yes. Update payroll fields before the 15th checklist run. Finance teams verify routing numbers before dispatching salary wires.' },
    { q: 'Where should I report for Day 1 induction?', a: 'Induction conference details are outlined under Module 4: "First Day Schedule". Digital Teams link and physical Apollo Room level 4 coordinates are listed there.' }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-bold">Phase 4: Ongoing Support</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Feedback & Resolution ticketing</h2>
          <p className="text-slate-500 text-sm mt-1">
            Submit emoji experience ratings, raise helpdesk support tickets, or chat with our automated onboarding virtual assistant.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="lg:col-span-2 space-y-6">
          {/* Onboarding experience pulse score */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <Smile className="w-4.5 h-4.5 mr-1 text-yellow-400" />
              <span>We value your feedback pulse!</span>
            </h3>

            {feedbackSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-100/50 p-4 rounded-xl text-center text-emerald-800 space-y-2">
                <Heart className="w-8 h-8 text-pink-500 mx-auto animate-pulse" />
                <span className="text-xs font-bold font-sans block">Onboarding Pulse Registered Successfully!</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Thank you for contributing your experience criteria. These data points help us constantly refine compliance induction workflows.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">RATE ONBOARDING SYSTEM SO FAR:</span>
                
                {/* Elastic emoji selector block */}
                <div className="flex justify-between max-w-lg mt-2 py-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji.rating}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji.rating)}
                      className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition hover:scale-105 cursor-pointer ${
                        selectedEmoji === emoji.rating ? 'border-amber-400 bg-amber-50/20 shadow-sm' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{emoji.char}</span>
                      <span className="text-[9px] text-slate-500 font-medium font-sans mt-1.5">{emoji.label}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Additional Comments / Bottlenecks</label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="SSO setup was smooth, but I need explicit instructions for hardware tracking."
                    rows={3}
                    className="w-full border border-slate-205 border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-yellow-400 mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedEmoji}
                  className="bg-slate-900 override text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-850 cursor-pointer disabled:opacity-40"
                >
                  Submit Onboarding Pulse
                </button>
              </form>
            )}
          </div>

          {/* Helpdesk ticket generator support */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <ClipboardCheck className="w-4.5 h-4.5 mr-1 text-indigo-500" />
              <span>Raise priority support ticket</span>
            </h3>

            <form onSubmit={handleTicketSubmit} className="space-y-4.5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Ticket Category Key</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 cursor-pointer"
                  >
                    <option>HR Operations Support</option>
                    <option>IT hardware Delivery</option>
                    <option>Finance Routing & Bank Checks</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Helpdesk Issue Subject</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. W-4 document processing failure"
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold text-slate-800"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Detailed Issue Explanation</label>
                  <textarea
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    placeholder="Describe issue parameters in depth for systems integration coordinators."
                    rows={4}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800"
                    required
                  />
                </div>
              </div>

              {ticketAdded && (
                <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg text-xs font-mono font-semibold">
                  ✓ Priority support ticket dispatched to HR Queue. Ticket ID: #TKT-{Date.now().toString().slice(-4)}
                </div>
              )}

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow cursor-pointer"
              >
                Launch Helpdesk Ticket
              </button>
            </form>
          </div>
        </div>

        {/* virtual AI assistant Chatbot panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-xl flex flex-col h-[520px] overflow-hidden">
            {/* Header */}
            <div className="bg-slate-850 p-4 border-b border-slate-805 flex items-center space-x-2 shrink-0">
              <MessageCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-slate-100">Onboarding AI Helpdesk</h4>
                <p className="text-[9px] text-cyan-400 font-mono tracking-wide uppercase">Interactive Assistant Active</p>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs max-h-[350px]">
              {botMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-left leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-semibold rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-750'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Inputs footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-850 border-t border-slate-800 flex gap-2 shrink-0">
              <input
                type="text"
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                placeholder="Ask about laptop status, VPN, bank..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 text-slate-950 p-2 rounded-xl transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
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
          <span>System Notifications</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
