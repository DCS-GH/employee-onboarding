import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { GraduationCap, Award, Clock, ArrowRight, PlayCircle, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';

interface TrainingProps {
  onNext: () => void;
  onBack: () => void;
}

export const TrainingModule: React.FC<TrainingProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, courses, completeCourse } = empContextData() || useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empCourses = courses.filter(c => c.employeeId === emp.id);

  // Focus module state
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [slide, setSlide] = useState(1);

  function empContextData() {
    try { return useOnboarding(); } catch { return null; }
  }

  const handleLaunchCourse = (course: any) => {
    setActiveCourse(course);
    setSlide(1);
  };

  const handleCompleteSlideCourse = (courseId: string) => {
    completeCourse(courseId);
    setActiveCourse(null);
  };

  // Badges count
  const earnedBadges = empCourses.filter(c => c.status === 'Completed' && c.badge).map(c => c.badge);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-500 font-bold">Phase 3: Learning & Standards</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Custom Academic Onboarding Map</h2>
          <p className="text-slate-500 text-sm mt-1">
            Pass critical compliance certifications and role-based topics to authorize your active production queue access keys.
          </p>
        </div>
        
        {/* Badges Box */}
        {earnedBadges.length > 0 && (
          <div className="bg-purple-550/15 bg-purple-10s0 text-purple-700 font-bold text-xs px-3 py-1 bg-purple-50 rounded-xl border border-purple-100 flex items-center space-x-1 self-start select-none">
            <Award className="w-4 h-4 text-purple-600 mr-0.5" />
            <span>{earnedBadges.length} Badge Earned</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Training List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase">
              Assigned Compliance & Technical Curriculum
            </h3>

            {empCourses.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                No courses assigned. Enjoy your day!
              </div>
            ) : (
              <div className="space-y-3.5">
                {empCourses.map((course) => (
                  <div key={course.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3 max-w-md">
                      <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600">
                        <GraduationCap className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-800">{course.title}</h4>
                          <span className={`text-[9px] font-bold px-1.5 rounded uppercase font-mono ${
                            course.category === 'compliance' ? 'bg-red-50 text-red-700' :
                            course.category === 'role' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {course.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">
                          Duration: {course.duration} • Instructor: {course.instructor}
                        </p>

                        {/* Progress bar */}
                        <div className="flex items-center space-x-2 mt-3 w-40">
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-500">{course.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2.5 self-end sm:self-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        course.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                        course.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border-amber-100 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {course.status}
                      </span>

                      {course.status !== 'Completed' && (
                        <button
                          onClick={() => handleLaunchCourse(course)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-1.5 text-[11px] font-semibold flex items-center space-x-1 transition cursor-pointer"
                        >
                          <PlayCircle className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Start Learning</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Unlocked Badges shelf */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-sm text-left">
            <h3 className="text-sm font-extrabold tracking-tight uppercase flex items-center mb-3">
              <Award className="w-4 h-4 mr-1 text-cyan-300" />
              <span>Assessment Badges Showcase</span>
            </h3>
            <p className="text-xs text-slate-400 leading-normal mb-5">
              Stand out inside the employee directory tree by completing optional courses and unlocking performance badging metrics.
            </p>

            {earnedBadges.length === 0 ? (
              <div className="border border-dashed border-slate-800 rounded-xl p-5 text-center mt-3 text-slate-500 text-xs">
                Certificates and badges will populate here upon finishing course quizzes.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {empCourses.filter(c => c.status === 'Completed' && c.badge).map((c, idx) => (
                  <div key={idx} className="bg-slate-850 p-3 rounded-xl border border-slate-700/60 text-center flex flex-col items-center">
                    <Award className="w-8 h-8 text-yellow-400 animate-bounce mb-1.5" />
                    <span className="text-[10px] text-yellow-400 font-bold font-mono uppercase block">{c.badge}</span>
                    <span className="text-[9px] text-slate-400 block truncate w-full mt-0.5">{c.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Reader Simulator modal */}
      {activeCourse && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl text-left border border-slate-100 flex flex-col justify-between h-[500px]">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-black text-purple-700 font-mono uppercase tracking-widest flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>Module: {activeCourse.title}</span>
                </span>
                <button onClick={() => setActiveCourse(null)} className="text-slate-400 hover:text-slate-600 font-mono font-bold">✕</button>
              </div>

              {/* Slider content */}
              <div className="mt-8 space-y-4">
                {slide === 1 && (
                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-slate-900">Slide 1: Vision Statement & Legal Boundaries</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Our enterprise operates under strict confidentiality protocols. You are forbidden to paste proprietary source code, internal wireframe schemas, or customer records in public AI channels or external repositories.
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Standard data localization standards (GDPR, SOC2 Type II, and local security baselines) require active multi-factor verification. Lock laptops whenever departing your workspace.
                    </p>
                  </div>
                )}

                {slide === 2 && (
                  <div className="space-y-3 font-sans">
                    <h3 className="text-base font-extrabold text-slate-900">Slide 2: Security Assessment Quiz</h3>
                    <p className="text-xs text-slate-700 font-bold">
                      Question: What constitutes clean cryptographic logging standards?
                    </p>
                    <div className="space-y-2 mt-4 text-xs font-semibold">
                      {[
                        'A) Encrypting client keys at rest with bcrypt and rotating configurations weekly.',
                        'B) Saving database access keys directly in public Git files.',
                        'C) Leaving systems running without active firewall gates.'
                      ].map((ans, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 cursor-pointer">
                          {ans}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stepper controls */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">SLIDE {slide} OF 2</span>
              <div className="flex space-x-2">
                {slide === 1 ? (
                  <button onClick={() => setSlide(2)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center space-x-1">
                    <span>Next slide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => handleCompleteSlideCourse(activeCourse.id)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-cyan-300" />
                    <span>Pass and Close Module</span>
                  </button>
                )}
              </div>
            </div>
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
          <span>Policies & Compliance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
