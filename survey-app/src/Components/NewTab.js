import React, { useState } from 'react';
import SurveyList from './SurveyList'; // Adjust the import path as needed

const tabsData = [
  { label: 'My Surveys', content: <SurveyList /> },
  { label: 'Shared Surveys', content: <SurveyList /> },
];

export default function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="bg-[#701852] min-h-screen mt-0 py-4">
    <div className="max-w-4xl mx-auto mt-0">
      <div className="flex space-x-3 border-b border-gray-200">
        {tabsData.map((tab, idx) => (
          <button
            key={idx}
            className={`py-2 px-4 text-lg font-medium transition-colors duration-300 ${
                idx === activeTabIndex
                  ? 'border-b-2 border-white text-white' // Active tab with white text and border
                  : 'border-b-2 border-transparent text-gray-400 hover:text-white hover:border-white' // Inactive tabs with lighter gray text
              }`}
            onClick={() => setActiveTabIndex(idx)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {tabsData[activeTabIndex].content}
      </div>
    </div>
    </div>
  );
}
