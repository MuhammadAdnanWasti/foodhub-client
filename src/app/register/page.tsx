import { RegisterForm } from '@/components/modules/auth/register/RegisterForm';
import React from 'react';

const Register = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <RegisterForm />
    </main>
  );
};

export default Register;