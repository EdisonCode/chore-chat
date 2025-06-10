import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Header from '../components/Header';

export default function Chores() {
  const router = useRouter();
  const { familyId } = router.query; // Extract familyId from URL
  const [chores, setChores] = useState([]); // Ensure chores is initialized as an empty array
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (familyId) {
      fetch(`/api/chores?familyId=${familyId}`)
        .then((response) => response.json())
        .then((data) => setChores(Array.isArray(data) ? data : [])) // Ensure data is an array
        .catch((error) => console.error('Failed to fetch chores:', error));
    } else {
      console.error('familyId is missing in the URL');
    }
  }, [familyId]);

  const createChore = async (data) => {
    try {
      const response = await fetch('/api/chores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, familyId, memberId: data.memberId || null }),
      });
      if (response.ok) {
        const newChore = await response.json();
        setChores((prev) => [...prev, newChore]);
        reset();
      } else {
        console.error('Failed to create chore');
      }
    } catch (error) {
      console.error('Error creating chore:', error);
    }
  };

  return (
    <Layout title="Manage Chores - Chore Chat">
      <Header familyName="Manage Chores" onBack={() => router.back()} />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Create New Chore Section */}
        <section className="glass-premium rounded-2xl p-6 lg:p-8 shadow-premium border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-sm">
                <svg className="icon-responsive text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Create Earning Opportunity</h2>
                <p className="text-sm text-gray-600">Build financial responsibility through task-based rewards</p>
              </div>
            </div>
            <div className="trust-indicator">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Educational Tip */}
          <div className="financial-tip mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">💡 Teaching Moment</h4>
                <p className="text-xs text-gray-600 mt-1">Setting fair reward values helps children understand the relationship between effort and earnings - a key financial literacy skill!</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(createChore)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Name</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="e.g., Make bed, Take out trash"
                  className="input-premium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Completion Deadline</label>
                <input
                  {...register('dueDate', { required: true })}
                  type="date"
                  className="input-premium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Task Description</label>
              <textarea
                {...register('description')}
                placeholder="Detailed instructions or expectations (optional)"
                rows={3}
                className="input-premium resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                <select
                  {...register('schedule', { required: true })}
                  className="input-premium"
                >
                  <option value="one-time">One-Time Task</option>
                  <option value="daily">Daily Routine</option>
                  <option value="weekly">Weekly Responsibility</option>
                  <option value="monthly">Monthly Goal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Earnings Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold">$</span>
                  <input
                    {...register('value', { required: true })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="input-premium pl-8"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">💰 Consider age-appropriate amounts ($0.50-$5.00)</p>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Create Earning Opportunity</span>
              </span>
            </button>
          </form>
        </section>

        {/* Existing Chores Section */}
        <section className="glass-premium rounded-2xl p-6 lg:p-8 shadow-premium border border-white/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-sm">
                <svg className="icon-responsive text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Active Earning Opportunities</h2>
                <p className="text-sm text-gray-600">Track progress and build financial responsibility</p>
              </div>
            </div>
            <div className="achievement-badge bg-gradient-to-r from-purple-500 to-indigo-500">
              <span className="text-white text-xs font-bold">{chores.length}</span>
            </div>
          </div>
          
          {chores.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Start Earning!</h3>
              <p className="text-gray-600 mb-4">Create your first earning opportunity to begin building financial responsibility.</p>
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Start building financial literacy today!
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chores.map((chore) => (
                <div key={chore.id} className="card-premium hover:shadow-premium transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">{chore.name}</h3>
                        <div className="achievement-badge bg-gradient-to-r from-emerald-500 to-teal-500">
                          <span className="text-white text-xs font-bold">${chore.value}</span>
                        </div>
                      </div>
                      {chore.description && (
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{chore.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">Due: {new Date(chore.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium capitalize">{chore.schedule.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="btn-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </button>
                    </div>
                  </div>
                  {/* Progress indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Financial Learning Progress</span>
                      <span className="font-semibold">Building responsibility</span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
