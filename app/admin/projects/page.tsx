'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

interface Project {
    _id: string;
    title: string;
    description: string;
    url: string;
    github: string;
    image: string;
    technologies: string[];
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: '',
        description: '',
        url: '',
        github: '',
        image: '',
        technologies: [],
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
        } catch (error) {
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentProject._id) {
                await axios.put(`/api/projects/${currentProject._id}`, currentProject);
                toast.success('Project updated');
            } else {
                await axios.post('/api/projects', currentProject);
                toast.success('Project created');
            }
            resetForm();
            fetchProjects();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/projects/${id}`);
            toast.success('Project deleted');
            fetchProjects();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setCurrentProject({
            title: '',
            description: '',
            url: '',
            github: '',
            image: '',
            technologies: [],
        });
        setIsEditing(false);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setCurrentProject({ ...currentProject, image: base64 });
            } catch (error) {
                toast.error('Failed to process image');
            }
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const techs = e.target.value.split(',').map(t => t.trim());
        setCurrentProject({ ...currentProject, technologies: techs });
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>

            {/* Form */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mb-10">
                <h2 className="text-xl font-semibold mb-4 text-[#667eea]">
                    {isEditing ? 'Edit Project' : 'Add New Project'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={currentProject.title}
                            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                            required
                        />
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#667eea] file:text-white hover:file:bg-[#5a6fd6]"
                            />
                            {currentProject.image && (
                                <div className="mt-2 text-xs text-gray-400 truncate">
                                    Current: {currentProject.image.substring(0, 30)}...
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Live URL"
                            value={currentProject.url}
                            onChange={(e) => setCurrentProject({ ...currentProject, url: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            value={currentProject.github}
                            onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={currentProject.technologies?.join(', ')}
                        onChange={handleTechChange}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                    />
                    <textarea
                        placeholder="Description"
                        value={currentProject.description}
                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none h-32"
                        required
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#667eea] text-white rounded-lg hover:bg-[#5a6fd6] transition-colors flex items-center gap-2"
                        >
                            {isEditing ? <FaEdit /> : <FaPlus />}
                            {isEditing ? 'Update Project' : 'Add Project'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 group">
                        <div className="relative h-48">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 text-[#667eea] hover:bg-[#667eea]/10 rounded-lg transition-colors"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
