import { useState, useEffect, useCallback } from 'react';

interface Member {
  id: number;
  name: string;
  role: string;
  phone: string;
  familyId: number;
  earnedAmount: number;
  choreBank: number;
  recurringExpenses: number;
  chores: any[];
}

interface Family {
  id: number;
  name: string;
  shortCode: string;
  members: Member[];
}

interface Balance {
  memberId: number;
  name: string;
  balance: number;
}

interface Transaction {
  id: number;
  amount: number;
  description: string;
  createdAt: string;
}

interface UseFamilyDataResult {
  family: Family | null;
  balances: Balance[];
  transactions: Transaction[];
  selectedMember: number | null;
  isLoading: boolean;
  error: string | null;
  addMember: (memberName: string) => Promise<void>;
  removeMember: (memberId: number) => Promise<void>;
  fetchTransactions: (memberId: number) => Promise<void>;
  addTransaction: (memberId: number, amount: number, description: string) => Promise<void>;
  refreshData: () => Promise<void>;
  clearSelectedMember: () => void;
}

export const useFamilyData = (familyId: string | string[] | undefined): UseFamilyDataResult => {
  const [family, setFamily] = useState<Family | null>(null);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFamily = useCallback(async () => {
    if (!familyId) return;
    
    try {
      const response = await fetch(`/api/family?familyId=${familyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch family data');
      }
      const data = await response.json();
      
      if (data && data.members && Array.isArray(data.members)) {
        setFamily(data);
      } else {
        setFamily({ ...data, members: [] });
      }
    } catch (err) {
      console.error('Failed to fetch family:', err);
      setError('Failed to load family data');
    }
  }, [familyId]);

  const fetchBalances = useCallback(async () => {
    if (!familyId) return;
    
    try {
      const response = await fetch(`/api/family?familyId=${familyId}&type=balances`);
      if (!response.ok) {
        throw new Error('Failed to fetch balances');
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setBalances(data);
      } else {
        console.error('Balances response is not an array:', data);
        setBalances([]);
      }
    } catch (err) {
      console.error('Failed to fetch balances:', err);
      setBalances([]);
    }
  }, [familyId]);

  const fetchTransactions = useCallback(async (memberId: number) => {
    try {
      const response = await fetch(`/api/family?type=member-transactions&memberId=${memberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error('Transactions response is not an array:', data);
        setTransactions([]);
      }
      setSelectedMember(memberId);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setTransactions([]);
    }
  }, []);

  const addMember = useCallback(async (memberName: string) => {
    if (!familyId) return;
    
    try {
      const response = await fetch(`/api/family`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId, newMember: memberName }),
      });
      
      if (response.ok) {
        const updatedFamily = await response.json();
        setFamily(updatedFamily);
        await fetchBalances();
      } else {
        throw new Error('Failed to add member');
      }
    } catch (err) {
      console.error('Error adding member:', err);
      setError('Failed to add member');
    }
  }, [familyId, fetchBalances]);

  const removeMember = useCallback(async (memberId: number) => {
    if (!familyId) return;
    
    try {
      const response = await fetch(`/api/family`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId, memberId }),
      });
      
      if (response.ok) {
        const updatedFamily = await response.json();
        setFamily(updatedFamily);
        await fetchBalances();
        
        // Clear selected member if it was removed
        if (selectedMember === memberId) {
          setSelectedMember(null);
          setTransactions([]);
        }
      } else {
        throw new Error('Failed to remove member');
      }
    } catch (err) {
      console.error('Error removing member:', err);
      setError('Failed to remove member');
    }
  }, [familyId, fetchBalances, selectedMember]);

  const addTransaction = useCallback(async (memberId: number, amount: number, description: string) => {
    try {
      const response = await fetch(`/api/family`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'transaction',
          memberId, 
          amount, 
          description 
        }),
      });
      
      if (response.ok) {
        // Refresh transactions for the selected member
        if (selectedMember === memberId) {
          await fetchTransactions(memberId);
        }
        // Refresh balances
        await fetchBalances();
      } else {
        throw new Error('Failed to add transaction');
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction');
    }
  }, [selectedMember, fetchTransactions, fetchBalances]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([fetchFamily(), fetchBalances()]);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFamily, fetchBalances]);

  const clearSelectedMember = useCallback(() => {
    setSelectedMember(null);
    setTransactions([]);
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (familyId) {
      refreshData();
    }
  }, [familyId, refreshData]);

  return {
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
  };
};
