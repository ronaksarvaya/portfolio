import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="block px-4 py-3 rounded-lg hover:bg-[#2a2a2a] text-gray-300 hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="block px-4 py-3 rounded-lg hover:bg-[#2a2a2a] text-gray-300 hover:text-white transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/admin/skills"
                        className="block px-4 py-3 rounded-lg hover:bg-[#2a2a2a] text-gray-300 hover:text-white transition-colors"
                    >
                        Skills
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="text-sm text-gray-500 text-center">
                        Logged in as Admin
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
