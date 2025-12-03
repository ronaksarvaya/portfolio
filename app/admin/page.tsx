import Link from 'next/link';
import { FaProjectDiagram, FaCode } from 'react-icons/fa';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Skill from '@/models/Skill';

async function getStats() {
    await dbConnect();
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    return { projectCount, skillCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Projects Card */}
                <Link href="/admin/projects" className="group">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#667eea] transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-200">Projects</h3>
                            <FaProjectDiagram className="text-2xl text-[#667eea]" />
                        </div>
                        <p className="text-4xl font-bold text-white mb-2">{stats.projectCount}</p>
                        <p className="text-sm text-gray-400 group-hover:text-[#667eea] transition-colors">Manage your portfolio projects</p>
                    </div>
                </Link>

                {/* Skills Card */}
                <Link href="/admin/skills" className="group">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#764ba2] transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-200">Skills</h3>
                            <FaCode className="text-2xl text-[#764ba2]" />
                        </div>
                        <p className="text-4xl font-bold text-white mb-2">{stats.skillCount}</p>
                        <p className="text-sm text-gray-400 group-hover:text-[#764ba2] transition-colors">Manage your technical skills</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
