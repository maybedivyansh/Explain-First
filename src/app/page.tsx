"use client";

import React, { useState } from 'react';
import { Home, FlaskConical, LayoutDashboard } from 'lucide-react';
import { LandingPage } from '@/components/LandingPage';
import { ConsentFlow } from '@/components/ConsentFlow';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function HomeApp() {
  const [activeTab, setActiveTab] = useState<'landing' | 'demo' | 'dashboard'>('landing');

  const tabs = [
    { id: 'landing', label: 'Overview', icon: Home },
    { id: 'demo', label: 'Live Demo', icon: FlaskConical },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-primary-navy font-semibold text-lg">ExplainFirst</span>
            </div>

            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${activeTab === tab.id
                      ? 'bg-indigo-50 text-primary-blue'
                      : 'text-text-secondary hover:bg-slate-50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'demo' && (
          <div className="py-12">
            <ConsentFlow />
          </div>
        )}
        {activeTab === 'dashboard' && (
          <div className="py-8">
            <AdminDashboard />
          </div>
        )}
      </main>

      <footer className="bg-primary-navy text-slate-400 py-8 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            ExplainFirst · Understanding before consent
          </p>
          <p className="text-xs mt-2">
            Voice-first consent verification for India
          </p>
        </div>
      </footer>
    </div>
  );
}
