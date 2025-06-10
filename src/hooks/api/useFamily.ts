import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Member {
  id: string;
  name: string;
  role?: string;
  phone?: string;
  earnedAmount?: number;
  choreBank?: number;
  recurringExpenses?: number;
  chores?: any[];
}

export interface Family {
  id: string;
  name: string;
  shortCode?: string;
  members: Member[];
}

export function useFamily(familyId: string | string[] | undefined) {
  return useQuery<Family, Error>({
    queryKey: ['family', familyId],
    queryFn: async () => {
      if (!familyId) throw new Error('Missing familyId');
      const res = await fetch(`/api/family?familyId=${familyId}`);
      if (!res.ok) throw new Error('Failed to fetch family');
      return res.json();
    },
    enabled: Boolean(familyId),
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation<
    any, // mutation result type (adjust as needed)
    Error, // error type
    { familyId: string; name: string } // variables type
  >(
    async ({ familyId, name }) => {
      const res = await fetch('/api/family', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyId, newMember: name }),
      });
      if (!res.ok) throw new Error('Failed to add member');
      return res.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['family'] });
      },
    }
  );
}
