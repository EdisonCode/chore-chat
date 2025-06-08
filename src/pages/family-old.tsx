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

  useEffect(() => {
    if (familyId) {
      fetch(`/api/family?familyId=${familyId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch family data');
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response for family:', data);
          if (data && data.members && Array.isArray(data.members)) {
            if (data.members.length === 0) {
              console.warn('Family members array is empty');
            }
            setFamily(data);
          } else {
            console.warn('Family data is missing members property or members is not an array');
            setFamily({ ...data, members: [] });
          }
        })
        .catch((error) => console.error('Failed to fetch family:', error));
    }
  }, [familyId]);

  useEffect(() => {
    if (familyId) {
      fetch(`/api/family?familyId=${familyId}&type=balances`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch balances');
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response for balances:', data);
          if (Array.isArray(data)) {
            setBalances(data);
          } else {
            console.error('Balances response is not an array:', data);
            setBalances([]);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch balances:', error);
          setBalances([]);
        });
    }
  }, [familyId]);

  const addMember = async () => {
    try {
      const response = await fetch(`/api/family`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId, newMember }),
      });
      if (response.ok) {
        const updatedFamily = await response.json();
        setFamily(updatedFamily);
        setNewMember('');
        // Refresh balances after adding member
        await fetchBalances();
      } else {
        console.error('Failed to add member');
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const removeMember = async (memberId) => {
    try {
      const response = await fetch(`/api/family`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId, memberId }),
      });
      if (response.ok) {
        const updatedFamily = await response.json();
        setFamily(updatedFamily);
        // Refresh balances after removing member
        await fetchBalances();
      } else {
        console.error('Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const fetchBalances = async () => {
    if (familyId) {
      try {
        const response = await fetch(`/api/family?familyId=${familyId}&type=balances`);
        if (!response.ok) {
          throw new Error('Failed to fetch balances');
        }
        const data = await response.json();
        console.log('API response for balances:', data);
        if (Array.isArray(data)) {
          setBalances(data);
        } else {
          console.error('Balances response is not an array:', data);
          setBalances([]);
        }
      } catch (error) {
        console.error('Failed to fetch balances:', error);
        setBalances([]);
      }
    }
  };

  const fetchTransactions = async (memberId) => {
    try {
      const response = await fetch(`/api/family?type=member-transactions&memberId=${memberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      console.log('API response for transactions:', data);
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error('Transactions response is not an array:', data);
        setTransactions([]);
      }
      setSelectedMember(memberId);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    }
  };

  const addTransaction = async () => {
    try {
      const response = await fetch(`/api/family`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'one-time-entry',
          memberId: selectedMember,
          amount: parseFloat(newTransaction.amount),
          description: newTransaction.description,
        }),
      });
      if (response.ok) {
        fetchTransactions(selectedMember);
        setNewTransaction({ amount: '', description: '' });
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  console.log('Family members:', family?.members);

  return (
    <div>
      <h1>Manage Family {familyId}</h1>
      {family && (
        <div>
          <h2>Members</h2>
          <ul>
            {family.members && family.members.length > 0 ? (
              family.members.map((member, index) => (
                <li key={member.id ? `member-${member.id}` : `member-index-${index}`}>
                  {member.name || 'Unnamed Member'}
                  <button onClick={() => removeMember(member.id)}>Remove</button>
                  <button onClick={() => fetchTransactions(member.id)}>View Transactions</button>
                </li>
              ))
            ) : (
              <li key="no-members">No members found</li>
            )}
          </ul>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="New member name"
          />
          <button onClick={addMember}>Add Member</button>
          <h2>Member Balances</h2>
          <ul>
            {balances && Array.isArray(balances) && balances.length > 0 ? (
              balances.map((balance) => (
                <li key={balance.memberId}>
                  {balance.name}: ${balance.balance ? balance.balance.toFixed(2) : '0.00'}
                </li>
              ))
            ) : (
              <li key="no-balances">No balance data available</li>
            )}
          </ul>
          <h2>Transactions</h2>
          {selectedMember && (
            <div>
              <ul>
                {transactions && Array.isArray(transactions) && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <li key={transaction.id}>
                      {transaction.description}: ${transaction.amount.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li key="no-transactions">No transactions found</li>
                )}
              </ul>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                placeholder="Amount"
              />
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                placeholder="Description"
              />
              <button onClick={addTransaction}>Add Transaction</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyManagement;
