import { LoginForm } from '@/components/modules/auth/login/LoginForm';
import React from 'react';

const page = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
            <LoginForm />
        </main>
    );
};

export default page;