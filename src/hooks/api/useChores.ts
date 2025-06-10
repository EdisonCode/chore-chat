import { useQuery } from '@tanstack/react-query';

export interface Chore { id: string; name: string; description?: string; dueDate: string; schedule: string; value: number; }

export function useChores(familyId: string | string[] | undefined) {
  return useQuery<Chore[], Error>(
    ['chores', familyId],
    async () => {
      if (!familyId) throw new Error('Missing familyId');
      const res = await fetch(`/api/chores?familyId=${familyId}`);
      if (!res.ok) throw new Error('Failed to fetch chores');
      return res.json();
    },
    { enabled: Boolean(familyId) }
  );
}
