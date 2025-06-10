import React from 'react';

interface Chore {
  id: number;
  name: string;
  assignedTo: string;
  completed: boolean;
}

const chores: Chore[] = [
  { id: 1, name: 'Wash dishes', assignedTo: 'Alice', completed: false },
  { id: 2, name: 'Vacuum living room', assignedTo: 'Bob', completed: true },
];

const ChoreList: React.FC = () => {
  return (
    <div className="bg-white/85 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-card border border-white/30">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-sm">
          <svg className="icon-responsive text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Chore List</h2>
      </div>
      
      <div className="space-y-3 lg:space-y-4">
        {chores.map((chore) => (
          <div
            key={chore.id}
            className={`p-4 lg:p-6 rounded-xl border-2 transition-all duration-200 hover-lift ${
              chore.completed 
                ? 'bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-300' 
                : 'bg-red-50/80 border-red-200/80 hover:border-red-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center ${
                  chore.completed ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {chore.completed ? (
                    <svg className="icon-xs lg:icon-sm text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="icon-xs lg:icon-sm text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{chore.name}</h3>
                  <p className="text-sm text-gray-600">Assigned to {chore.assignedTo}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                chore.completed 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {chore.completed ? 'Completed' : 'Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoreList;
