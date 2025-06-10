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
    <div className="bg-white/90 rounded-xl shadow-card hover:shadow-card-hover border border-gray-100/80 p-4 lg:p-5 hover-lift transition-all duration-200 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-4 translate-x-4"></div>
      
      <div className="relative">
        {/* Header with Avatar and Remove Button */}
        <div className="flex items-start justify-between mb-3 lg:mb-4">
          <div className="flex items-center space-x-3">
            <div className="avatar-responsive bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm lg:text-base">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base lg:text-lg leading-tight">{member.name}</h3>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(member.id)}
            className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
            aria-label="Remove member"
          >
            <svg className="icon-responsive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Balance Section */}
        <div className="bg-gray-50/80 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Current Balance</p>
              <div className="flex items-baseline space-x-1">
                <span className={`font-bold text-xl lg:text-2xl ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                  ${Math.abs(balanceAmount).toFixed(2)}
                </span>
                {!isPositive && <span className="text-red-400 text-xs font-medium">owed</span>}
              </div>
            </div>
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${isPositive ? 'bg-emerald-100' : 'bg-red-100'}`}>
              <svg className={`icon-responsive ${isPositive ? 'text-emerald-600' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 lg:py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
