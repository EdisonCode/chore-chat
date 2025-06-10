import React, { useState } from 'react';

interface AddMemberFormProps {
  onAddMember: (memberName: string) => void;
  isLoading?: boolean;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAddMember, isLoading = false }) => {
  const [newMember, setNewMember] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim()) {
      onAddMember(newMember.trim());
      setNewMember('');
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full glass-financial rounded-2xl border-2 border-dashed border-emerald-200 p-8 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 group shadow-premium hover:shadow-financial"
        disabled={isLoading}
      >
        <div className="flex items-center justify-center space-x-4 text-gray-600 group-hover:text-emerald-700">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 shadow-inner">
            <svg className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block font-bold text-lg lg:text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-700">Add Family Member</span>
            <span className="block text-sm text-gray-500 group-hover:text-emerald-600 transition-colors">Build financial literacy together as a family</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="trust-indicator">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium">Click to get started</span>
        </div>
      </button>
    );
  }

  return (
    <div className="glass-premium rounded-2xl shadow-premium border border-white/20 p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full translate-y-16 -translate-x-16"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Add New Member</h3>
              <p className="text-sm text-gray-600">Welcome them to the financial literacy journey</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setNewMember('');
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Educational tip */}
        <div className="financial-tip mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">💡 Family Financial Education</h4>
              <p className="text-xs text-gray-600 mt-1">Adding family members creates opportunities for collaborative learning about money management and shared financial goals.</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="memberName" className="block text-sm font-bold text-gray-700 mb-3">
              Family Member Name
            </label>
            <input
              type="text"
              id="memberName"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Enter their name"
              className="input-premium text-lg"
              autoFocus
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">👥 Each member will have their own earning goals and progress tracking</p>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!newMember.trim() || isLoading}
              className="btn-primary flex-1"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>{isLoading ? 'Adding Member...' : 'Add to Family'}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setNewMember('');
              }}
              className="btn-secondary px-6"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
