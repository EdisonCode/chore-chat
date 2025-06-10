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
        className="w-full bg-white/80 backdrop-blur-lg rounded-2xl border-2 border-dashed border-gray-200 p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 group shadow-lg hover:shadow-xl"
        disabled={isLoading}
      >
        <div className="flex items-center justify-center space-x-3 text-gray-500 group-hover:text-blue-600">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg className="icon-responsive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block font-semibold text-base lg:text-lg">Add Family Member</span>
            <span className="block text-sm text-gray-500 group-hover:text-blue-600">Click to add a new member to your family</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Add New Member</h3>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setNewMember('');
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="memberName" className="block text-sm font-bold text-gray-700 mb-3">
              Member Name
            </label>
            <input
              type="text"
              id="memberName"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Enter family member's name"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium bg-gray-50 focus:bg-white"
              autoFocus
              disabled={isLoading}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={!newMember.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? 'Adding...' : 'Add Member'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setNewMember('');
              }}
              className="px-6 py-4 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold"
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
