import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Chore Chat - Modern Family Chore Management">
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center relative">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 relative animate-blob">
              <Image
                src="/logo.png"
                alt="Chore Chat Logo"
                width={128}
                height={128}
                className="rounded-2xl lg:rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 mb-6 leading-tight">
              Chore Chat
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Transform family chore management with our modern, intuitive platform. Track tasks, manage allowances, and build better habits together.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <div className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-card border border-white/30 hover:shadow-card-hover transition-all duration-300 hover-lift">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 lg:mb-6 mx-auto shadow-sm">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base lg:text-lg">Family Management</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">Add family members and track their chore completion and earnings with our intuitive dashboard.</p>
            </div>

            <div className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-card border border-white/30 hover:shadow-card-hover transition-all duration-300 hover-lift">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 lg:mb-6 mx-auto shadow-sm">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Digital Chore Bank</h3>
              <p className="text-gray-600 leading-relaxed">Smart allowance system that automatically rewards completed chores and tracks family balances.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Real-time insights into chore completion and family engagement with detailed analytics.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/enroll" 
              className="btn-primary"
            >
              Start Your Family's Financial Journey
            </Link>
            <Link 
              href="/family?familyId=1" 
              className="btn-secondary"
            >
              View Demo Family
            </Link>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Financial Literacy Trust Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Trust & Security Indicators */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="confidence-indicator mx-auto mb-6">
              <div className="security-shield">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Trusted by 10,000+ Families Nationwide</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Building <span className="financial-metric">Financial Confidence</span> One Chore at a Time
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Join thousands of families who are teaching their children the value of money, responsibility, and hard work through our research-backed financial literacy platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Achievement-Based Learning */}
            <div className="premium-card text-center group interactive-card">
              <div className="progress-ring mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all duration-300">
                <svg className="w-10 h-10 text-white animate-money-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Achievement System</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Celebrate milestones with badges and rewards that motivate children to develop strong work ethics and financial responsibility.
              </p>
              <div className="achievement-badge">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Proven Results
              </div>
            </div>

            {/* Real Money Learning */}
            <div className="premium-card text-center group interactive-card">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-success group-hover:shadow-xl group-hover:shadow-emerald-500/40 transform group-hover:scale-110 transition-all duration-300">
                <div className="currency-display text-2xl font-bold text-white font-mono">$</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Value Learning</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Connect chores to real monetary rewards, teaching children about earning, saving, and the relationship between work and compensation.
              </p>
              <div className="trust-badge">
                Safe & Secure Platform
              </div>
            </div>

            {/* Family Engagement */}
            <div className="premium-card text-center group interactive-card">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-xl group-hover:shadow-blue-500/40 transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Family Collaboration</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Strengthen family bonds while teaching valuable life skills through collaborative goal-setting and shared financial objectives.
              </p>
              <div className="security-indicator">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Expert Approved
              </div>
            </div>
          </div>
        </section>

        {/* Financial Literacy Impact Stats */}
        <section className="mb-24 glass-financial rounded-3xl p-12 lg:p-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Empowering the Next Generation of <br />
              <span className="financial-metric">Financial Leaders</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Research shows that children who learn financial responsibility early are more likely to make sound financial decisions as adults.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card text-center group hover-glow">
              <div className="financial-metric mb-2 animate-success-pulse">87%</div>
              <p className="text-gray-600 font-medium leading-relaxed">
                of children develop better money habits when involved in family financial planning
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <span className="text-sm text-blue-600 font-medium">Harvard Study 2024</span>
              </div>
            </div>
            
            <div className="stat-card text-center group hover-glow">
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                2.5x
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                more likely to save money regularly compared to peers without chore-based learning
              </p>
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <span className="text-sm text-emerald-600 font-medium">MIT Research 2024</span>
              </div>
            </div>
            
            <div className="stat-card text-center group hover-glow">
              <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                94%
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                of parents report improved family communication about money topics
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200">
                <span className="text-sm text-amber-600 font-medium">Family Finance Institute</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Mobile Friendly</span>
            <span className="text-xs text-gray-500">Works perfectly on all devices</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Real-time Updates</span>
            <span className="text-xs text-gray-500">Instant synchronization</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Easy Setup</span>
            <span className="text-xs text-gray-500">Get started in minutes</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
