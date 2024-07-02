"use client";
import { FC } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSidebarContext } from "./SideNavProvider";

export const NavBar: FC = () => {
  const { value, setValue } = useSidebarContext();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setValue({ token: null });
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
         
          <div className=" lg:flex lg:gap-x-12">
              <a onClick={() => router.push('/')} className="text-sm font-semibold leading-6 text-gray-900">
                Home
              </a>
          </div>
          <div className=" lg:flex lg:gap-x-12">
         
              <div onClick={() => router.push('/dashboard')} className="pointer text-sm font-semibold leading-6 text-gray-900">
                Dashboard
              </div>
          </div>
          <div className=" lg:flex lg:flex-1 lg:justify-end">
            {value.token ? (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log out
              </button>
            ) : (
                <a onClick={() => router.push('/login')} className="text-sm font-semibold leading-6 text-gray-900">
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};