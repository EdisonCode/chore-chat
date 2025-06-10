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
        <section className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-card border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-sm">
              <svg className="icon-responsive text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Create a New Chore</h2>
          </div>
          
          <form onSubmit={handleSubmit(createChore)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chore Name</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="Enter chore name"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  {...register('dueDate', { required: true })}
                  type="date"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register('description')}
                placeholder="Describe the chore (optional)"
                rows={3}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <select
                  {...register('schedule', { required: true })}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                >
                  <option value="one-time">One-Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reward Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    {...register('value', { required: true })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full p-4 pl-8 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg transform hover:scale-[1.02]"
            >
              Create Chore
            </button>
          </form>
        </section>

        {/* Existing Chores Section */}
        <section className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-card border border-white/30">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-sm">
              <svg className="icon-responsive text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Existing Chores</h2>
          </div>
          
          {chores.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chores yet</h3>
              <p className="text-gray-600">Create your first chore to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chores.map((chore) => (
                <div key={chore.id} className="bg-gray-50/50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{chore.name}</h3>
                      {chore.description && (
                        <p className="text-gray-600 mb-3">{chore.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {new Date(chore.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {chore.schedule}
                        </div>
                        <div className="flex items-center text-emerald-600 font-medium">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          ${chore.value}
                        </div>
                      </div>
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
