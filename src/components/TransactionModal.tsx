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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{memberName}'s Transactions</h2>
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
            <div className="p-6 border-b border-gray-100/50">
              <button
                onClick={() => setIsAddingTransaction(true)}
                className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 py-4 px-6 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all font-medium shadow-sm border border-blue-100 hover:shadow-md transform hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Transaction
              </button>
            </div>
          ) : (
            <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      placeholder="5.00 or -2.50"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                      autoFocus
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    placeholder="e.g., 'Completed dishes'"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    disabled={!newTransaction.amount || !newTransaction.description.trim() || isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all font-medium shadow-lg transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {isLoading ? 'Adding...' : 'Add Transaction'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTransaction(false);
                      setNewTransaction({ amount: '', description: '' });
                    }}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
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
                {transactions.map((transaction) => {
                  const { amount, isPositive, sign } = formatCurrency(transaction.amount);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl border border-gray-100 hover:shadow-sm transition-all">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(transaction.createdAt)}</p>
                      </div>
                      <div className={`font-bold text-lg ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                        {sign}${amount}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                <p className="text-gray-500">Add your first transaction to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
