import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import AddMemberForm from '../components/AddMemberForm';
import TransactionModal from '../components/TransactionModal';
import { LoadingState } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { useFamilyData } from '../hooks/useFamilyData';

const FamilyManagement = () => {
  const router = useRouter();
  const { familyId } = router.query;

  const {
    family,
    balances,
    transactions,
    selectedMember,
    isLoading,
    error,
    addMember,
    removeMember,
    fetchTransactions,
    addTransaction,
    refreshData,
    clearSelectedMember,
  } = useFamilyData(familyId);

  const handleAddMember = async (memberName: string) => {
    await addMember(memberName);
  };

  const handleRemoveMember = async (memberId: number) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      await removeMember(memberId);
    }
  };

  const handleViewTransactions = async (memberId: number) => {
    await fetchTransactions(memberId);
  };

  const handleAddTransaction = async (amount: number, description: string) => {
    if (selectedMember) {
      await addTransaction(selectedMember, amount, description);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <Layout title={`${family?.name || 'Family'} - Chore Chat`}>
        <LoadingState message="Loading family data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error - Chore Chat">
        <ErrorState
          title="Failed to load family data"
          message={error}
          onRetry={refreshData}
        />
      </Layout>
    );
  }

  if (!family) {
    return (
      <Layout title="Family Not Found - Chore Chat">
        <ErrorState
          title="Family not found"
          message="The family you're looking for doesn't exist or has been removed."
          onRetry={() => router.push('/')}
        />
      </Layout>
    );
  }

  const selectedMemberData = family.members.find(m => m.id === selectedMember);

  return (
    <Layout title={`${family.name} - Chore Chat`}>
      <Header 
        familyName={family.name}
        onBack={handleBackToHome}
      />

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Members</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{family.members.length}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="icon-responsive text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Balance</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">
                ${balances.reduce((sum, b) => sum + Math.max(0, b.balance), 0).toFixed(2)}
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg className="icon-responsive text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Outstanding</p>
              <p className="text-3xl font-black text-red-500 mt-1">
                ${balances.reduce((sum, b) => sum + Math.max(0, -b.balance), 0).toFixed(2)}
              </p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="icon-responsive text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">Family Members</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {family.members.length} member{family.members.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {family.members.map((member) => {
            const memberBalance = balances.find(b => b.memberId === member.id);
            return (
              <MemberCard
                key={member.id}
                member={member}
                balance={memberBalance}
                onViewTransactions={handleViewTransactions}
                onRemove={handleRemoveMember}
              />
            );
          })}
        </div>

        {/* Add Member Section */}
        <div className="mt-8">
          <AddMemberForm
            onAddMember={handleAddMember}
            isLoading={isLoading}
          />
        </div>

        {/* Empty State */}
        {family.members.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No family members yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Add your first family member to get started with chore management and start tracking balances.</p>
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={selectedMember !== null}
        onClose={clearSelectedMember}
        memberName={selectedMemberData?.name || ''}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default FamilyManagement;
