import { LoginForm } from '@/components/modules/auth/login/LoginForm';
import React from 'react';

const page = () => {
    return (
        <div className='container mx-auto px-4 py-4'>
            <h1 className='text-3xl font-bold mb-4'>Login</h1>
            <LoginForm />
        </div>
        
    );
};

export default page;