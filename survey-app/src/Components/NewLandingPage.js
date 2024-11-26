'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import landingpagepic from '../CSS/landingPage.png'

export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility
  const navigate = useNavigate();

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Attention!
            </h2>
            <p className="text-gray-600 mb-6">
              This web app currently does not support idempotency. Please click the button only once to avoid multiple requests. We are working on it.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="w-1/2">
        <img
          src={landingpagepic}
          alt="Survey Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-1/2 bg-white flex flex-col">
        <header className="flex justify-end p-6">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
        </header>

        <main className="flex-grow flex items-center justify-center px-6">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              SHASH
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create and manage surveys effortlessly with SHASH. Gather valuable insights and make informed decisions to boost your productivity.
            </p>
            <div className="mt-10">
              <button
                onClick={() => navigate('/signup')}
                className="inline-block rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
