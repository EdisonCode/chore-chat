import React, { useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  createdAt: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  transactions: Transaction[];
  onAddTransaction: (amount: number, description: string) => void;
  isLoading?: boolean;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  memberName,
  transactions,
  onAddTransaction,
  isLoading = false
}) => {
  const [newTransaction, setNewTransaction] = useState({ amount: '', description: '' });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  if (!isOpen) return null;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTransaction.amount && newTransaction.description.trim()) {
      onAddTransaction(
        parseFloat(newTransaction.amount),
        newTransaction.description.trim()
      );
      setNewTransaction({ amount: '', description: '' });
      setIsAddingTransaction(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    const isPositive = amount >= 0;
    return {
      amount: Math.abs(amount).toFixed(2),
      isPositive,
      sign: isPositive ? '+' : '-'
    };
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="glass-premium rounded-3xl shadow-financial border border-white/20 max-w-md w-full max-h-[90vh] overflow-hidden transform animate-scale-in">
        {/* Header */}
        <div className="p-8 pb-6 border-b border-white/20 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-premium">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{memberName}'s Earnings</h2>
                <p className="text-sm text-gray-600">Track financial progress and transactions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {/* Add Transaction Form */}
          {!isAddingTransaction ? (
            <div className="p-6 border-b border-white/20">
              <button
                onClick={() => setIsAddingTransaction(true)}
                className="w-full glass-financial border-2 border-dashed border-emerald-200 text-emerald-700 py-6 px-6 rounded-2xl hover:border-emerald-400 hover:bg-emerald-50/30 transition-all font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span>Record New Transaction</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="p-6 border-b border-white/20 bg-gradient-to-r from-emerald-50/30 to-teal-50/30">
              {/* Educational tip */}
              <div className="financial-tip mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">💰 Money Management Tip</h4>
                    <p className="text-xs text-gray-600 mt-1">Use positive amounts for earnings and negative amounts for spending. This helps track both income and expenses!</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleAddTransaction} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-bold text-lg">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      placeholder="5.00 or -2.50"
                      className="input-premium pl-10 text-lg font-semibold"
                      autoFocus
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">💡 Use + for earnings, - for spending</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    placeholder="e.g., 'Completed chores' or 'Bought toy'"
                    className="input-premium"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    disabled={!newTransaction.amount || !newTransaction.description.trim() || isLoading}
                    className="btn-primary flex-1"
                  >
                    {isLoading ? 'Recording...' : 'Record Transaction'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTransaction(false);
                      setNewTransaction({ amount: '', description: '' });
                    }}
                    className="btn-secondary px-6"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Transaction List */}
          <div className="p-6">
            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Transaction History</h3>
                  <div className="achievement-badge bg-gradient-to-r from-emerald-500 to-teal-500">
                    <span className="text-white text-xs font-bold">{transactions.length}</span>
                  </div>
                </div>
                {transactions.map((transaction) => {
                  const { amount, isPositive, sign } = formatCurrency(transaction.amount);
                  return (
                    <div key={transaction.id} className="card-premium hover:shadow-md transition-all duration-200 group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                            <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">{transaction.description}</p>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-lg">{formatDate(transaction.createdAt)}</span>
                            <span className={`px-2 py-1 rounded-lg font-medium ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {isPositive ? 'Income' : 'Expense'}
                            </span>
                          </div>
                        </div>
                        <div className={`font-bold text-xl ${isPositive ? 'text-emerald-600' : 'text-red-500'} money-float`}>
                          {sign}${amount}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Financial summary */}
                <div className="mt-6 p-4 glass-financial rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Financial Learning Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                      <div className="text-emerald-600 font-bold text-lg">
                        +${transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                      </div>
                      <div className="text-gray-600">Total Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-500 font-bold text-lg">
                        -${Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
                      </div>
                      <div className="text-gray-600">Total Spending</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center shadow-inner">
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Start Tracking!</h3>
                <p className="text-gray-600 mb-4">Record your first transaction to begin building financial awareness.</p>
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Every transaction is a learning opportunity!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
