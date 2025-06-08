import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { LoadingState } from '../components/LoadingSpinner';

export default function Enroll() {
  const [familyName, setFamilyName] = useState('');
  const [members, setMembers] = useState([{ name: '', role: 'member', phone: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const addMember = () => setMembers([...members, { name: '', role: 'member', phone: '' }]);
  
  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, field: 'name' | 'role' | 'phone', value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!familyName.trim()) {
      setError('Please enter a family name');
      setIsLoading(false);
      return;
    }

    const validMembers = members.filter(member => member.name.trim());
    if (validMembers.length === 0) {
      setError('Please add at least one family member');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: familyName.trim(), members: validMembers }),
      });

      if (response.ok) {
        const family = await response.json();
        router.push(`/family?familyId=${family.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create family');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Enroll Your Family</title>
        <meta name="description" content="Enroll your family in Chore Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">Enroll Your Family</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md bg-white p-6 rounded shadow-md">
          <label className="block mb-4">
            Family Name:
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full mt-2 p-2 border rounded"
              required
            />
          </label>

          <label className="block mb-4">
            Family Members:
            {members.map((member, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(index, e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder={`Member ${index + 1}`}
                  required
                />
                <select
                  value={member.role || ''}
                  onChange={(e) => updateMemberRole(index, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="parent">Parent</option>
                  <option value="kid">Kid</option>
                </select>
                <input
                  type="tel"
                  value={member.phone || ''}
                  onChange={(e) => updateMemberPhone(index, e.target.value)}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Phone Number"
                  required
                />
              </div>
            ))}
          </label>

          <button
            type="button"
            onClick={addMember}
            className="w-full mt-2 p-2 bg-gray-200 rounded"
          >
            Add Another Member
          </button>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>

          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}