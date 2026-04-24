'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { get } from 'node:http';
import { getUser, logoutUser } from '@/services/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setuser] = useState(false);
const [user, setUser] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/menu', label: 'Menu' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const getCurrentUser = async () => {
const userData= await getUser();
setUser(userData);


    };
    getCurrentUser();
  },[]);




  const handleLogout = () => {
    setUser(null);
    logoutUser();
    // Add your logout logic here
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">FoodHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;