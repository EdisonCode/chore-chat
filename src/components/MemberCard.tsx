import React from 'react';

interface Member {
  id: number;
  name: string;
  role: string;
  choreBank: number;
}

interface Balance {
  memberId: number;
  name: string;
  balance: number;
}

interface MemberCardProps {
  member: Member;
  balance?: Balance;
  onViewTransactions: (memberId: number) => void;
  onRemove: (memberId: number) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ 
  member, 
  balance, 
  onViewTransactions, 
  onRemove 
}) => {
  const balanceAmount = balance?.balance ?? member.choreBank ?? 0;
  const isPositive = balanceAmount >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-6 translate-x-6"></div>
      
      <div className="relative">
        {/* Header with Avatar and Remove Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{member.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(member.id)}
            className="text-gray-300 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-50"
            aria-label="Remove member"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Balance Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Current Balance</p>
              <div className="flex items-baseline space-x-1">
                <span className={`font-black text-2xl ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                  ${Math.abs(balanceAmount).toFixed(2)}
                </span>
                {!isPositive && <span className="text-red-400 text-sm font-medium">owed</span>}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isPositive ? 'bg-emerald-100' : 'bg-red-100'}`}>
              <svg className={`w-6 h-6 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewTransactions(member.id)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          View Transaction History
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
