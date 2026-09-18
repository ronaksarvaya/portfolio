'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Invalid credentials');
            } else {
                toast.success('Logged in successfully');
                router.push('/admin');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
            <Toaster position="top-right" />
            <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-2xl">
                <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                    Admin Login
                </h1>

                <div className="mb-6 p-3 bg-purple-900/30 border border-purple-700/50 rounded-lg text-xs text-purple-200 text-center">
                    <p className="font-semibold">Default Dev Credentials:</p>
                    <p className="mt-1">Username: <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono">admin</code> | Password: <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono">admin123</code></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-[#667eea] text-white transition-colors"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:border-[#667eea] text-white transition-colors"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
