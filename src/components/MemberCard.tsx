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
    <div className="premium-card interactive-card group">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-4 translate-x-4"></div>
      
      <div className="relative">
        {/* Header with Avatar and Remove Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="avatar-responsive bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
              <span className="text-white font-semibold text-sm lg:text-base">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight group-hover:text-blue-600 transition-colors">{member.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="trust-badge">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {member.role}
                </div>
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
        <div className="stat-card mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Current Balance</p>
              <div className="flex items-baseline space-x-1">
                <span className={`${isPositive ? 'currency-display' : 'text-2xl font-bold text-red-500'} animate-money-float`}>
                  ${Math.abs(balanceAmount).toFixed(2)}
                </span>
                {!isPositive && <span className="text-red-400 text-xs font-medium">owed</span>}
              </div>
            </div>
            {isPositive && balanceAmount > 5 && (
              <div className="achievement-badge text-xs py-1 px-2">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Earning
              </div>
            )}
          </div>
          <div className="mt-2">
            <div className="learning-progress">
              <div 
                className="learning-progress-bar"
                style={{ width: `${Math.min(100, Math.abs(balanceAmount) * 5)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {isPositive ? 'Building savings' : 'Working towards balance'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewTransactions(member.id)}
          className="btn-primary w-full py-3 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Financial History
        </button>

        {/* Financial Learning Tip */}
        {isPositive && balanceAmount > 10 && (
          <div className="tip-box mt-4">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <p className="text-xs font-medium text-amber-800 mb-1">Financial Tip</p>
                <p className="text-xs text-amber-700">Consider setting aside 20% for savings goals!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
