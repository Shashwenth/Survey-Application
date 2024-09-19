// src/Components/NavExample.js
import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/landhere', current: true },
  { name: 'Add Survey', href: '/add-survey', current: false },
  { name: 'Enter Survey', href: '/enter-survey', current: false },
  { name: 'Tabs', href: '/tab', current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavExample() {
  const location = useLocation();

  const navigate= useNavigate();
  const handleLogout = () => {
    alert('You have been logged out'); // Replace with actual logout logic
    navigate('/')
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 h-16 mb-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
            <div className="relative flex h-full items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo and Navigation Links */}
              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 mr-5">
                  <span className="text-white text-2xl font-bold">
                    SHASH
                  </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:ml-6 sm:flex space-x-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium no-underline', // Added no-underline
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Logout Button aligned to the right */}
              <div className="hidden sm:flex sm:items-center sm:ml-auto">
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white no-underline focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium no-underline', // Added no-underline
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
              {/* Mobile Logout Button */}
              <DisclosureButton
                as="button"
                onClick={handleLogout}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white no-underline"
              >
                Logout
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
