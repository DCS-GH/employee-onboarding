import { useState } from 'react';
import { OnboardingProvider } from './store';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WelcomeDashboard } from './components/WelcomeDashboard';
import { Preboarding } from './components/Preboarding';
import { DocumentsFolder } from './components/DocumentsFolder';
import { ScheduleModule } from './components/ScheduleModule';
import { ITSetupModule } from './components/ITSetupModule';
import { MeetTeamModule } from './components/MeetTeamModule';
import { TrainingModule } from './components/TrainingModule';
import { PoliciesModule } from './components/PoliciesModule';
import { PayrollModule } from './components/PayrollModule';
import { RoleModule } from './components/RoleModule';
import { ProjectOnboardingModule } from './components/ProjectOnboardingModule';
import { ChecklistModule } from './components/ChecklistModule';
import { FeedbackSupport } from './components/FeedbackSupport';
import { NotificationsModule } from './components/NotificationsModule';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalyticsModule } from './components/AnalyticsModule';

function DashboardShell() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Render active module screen
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <WelcomeDashboard onNavigate={setActiveModule} />;
      case 'preboarding':
        return <Preboarding onNext={() => setActiveModule('documents')} onBack={() => setActiveModule('dashboard')} />;
      case 'documents':
        return <DocumentsFolder onNext={() => setActiveModule('schedule')} onBack={() => setActiveModule('preboarding')} />;
      case 'schedule':
        return <ScheduleModule onNext={() => setActiveModule('itsetup')} onBack={() => setActiveModule('documents')} />;
      case 'itsetup':
        return <ITSetupModule onNext={() => setActiveModule('team')} onBack={() => setActiveModule('schedule')} />;
      case 'team':
        return <MeetTeamModule onNext={() => setActiveModule('training')} onBack={() => setActiveModule('itsetup')} />;
      case 'training':
        return <TrainingModule onNext={() => setActiveModule('policies')} onBack={() => setActiveModule('team')} />;
      case 'policies':
        return <PoliciesModule onNext={() => setActiveModule('payroll')} onBack={() => setActiveModule('training')} />;
      case 'payroll':
        return <PayrollModule onNext={() => setActiveModule('role')} onBack={() => setActiveModule('policies')} />;
      case 'role':
        return <RoleModule onNext={() => setActiveModule('project')} onBack={() => setActiveModule('payroll')} />;
      case 'project':
        return <ProjectOnboardingModule onNext={() => setActiveModule('checklist')} onBack={() => setActiveModule('role')} />;
      case 'checklist':
        return <ChecklistModule onNext={() => setActiveModule('feedback')} onBack={() => setActiveModule('project')} />;
      case 'feedback':
        return <FeedbackSupport onNext={() => setActiveModule('notifications')} onBack={() => setActiveModule('checklist')} />;
      case 'notifications':
        return <NotificationsModule onNext={() => setActiveModule('admin')} onBack={() => setActiveModule('feedback')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'analytics':
        return <AnalyticsModule />;
      default:
        return <WelcomeDashboard onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" id="app-root">
      {/* Top Navigation Control bar */}
      <Header />

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Side Menu directory */}
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Scrollable Main Action desk */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]">
            {renderModuleContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OnboardingProvider>
      <DashboardShell />
    </OnboardingProvider>
  );
}
