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
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link 
              href="/family?familyId=1" 
              className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold border border-gray-200"
            >
              View Demo Family
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 pt-12 border-t border-gray-200/50">
            <p className="text-sm text-gray-500 mb-8 font-medium">Trusted by families worldwide</p>
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
        </div>
      </div>
    </Layout>
  );
}
