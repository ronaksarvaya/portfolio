'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus, FaArrowUp, FaArrowDown, FaGripVertical } from 'react-icons/fa';
import Image from 'next/image';

interface Project {
    _id: string;
    title: string;
    description: string;
    url: string;
    github: string;
    image: string;
    technologies: string[];
    order?: number;
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [savingOrder, setSavingOrder] = useState(false);
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

    const saveNewSequence = async (newProjects: Project[]) => {
        setSavingOrder(true);
        try {
            const projectIds = newProjects.map((p) => p._id);
            await axios.put('/api/projects/reorder', { projectIds });
            toast.success('Sequence saved');
        } catch (error) {
            toast.error('Failed to save sequence');
            fetchProjects();
        } finally {
            setSavingOrder(false);
        }
    };

    const moveProject = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= projects.length) return;

        const updated = [...projects];
        const [movedItem] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, movedItem);

        setProjects(updated);
        saveNewSequence(updated);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (dropIndex: number) => {
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const updated = [...projects];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(dropIndex, 0, draggedItem);

        setProjects(updated);
        setDraggedIndex(null);
        saveNewSequence(updated);
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
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Manage Projects</h1>
                    <p className="text-gray-400 text-sm mt-1">Reorder cards using the Up/Down arrows or by dragging cards into position.</p>
                </div>
                {savingOrder && (
                    <span className="text-sm text-[#667eea] animate-pulse font-medium">Saving sequence...</span>
                )}
            </div>

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
                            value={currentProject.title || ''}
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
                            value={currentProject.url || ''}
                            onChange={(e) => setCurrentProject({ ...currentProject, url: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            value={currentProject.github || ''}
                            onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={currentProject.technologies?.join(', ') || ''}
                        onChange={handleTechChange}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#667eea] outline-none"
                    />
                    <textarea
                        placeholder="Description"
                        value={currentProject.description || ''}
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
                {projects.map((project, index) => (
                    <div
                        key={project._id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        className={`bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 group relative transition-all duration-200 ${
                            draggedIndex === index ? 'opacity-40 scale-95 border-dashed border-[#667eea]' : 'hover:border-gray-700'
                        }`}
                    >
                        {/* Sequence badge & Drag Handle */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-gray-700/50">
                            <FaGripVertical className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-white" title="Drag to reorder" />
                            <span>#{index + 1}</span>
                        </div>

                        {/* Reorder Buttons (Up / Down) */}
                        <div className="absolute top-3 right-3 z-10 flex gap-1 bg-black/70 backdrop-blur-md p-1 rounded-md border border-gray-700/50">
                            <button
                                type="button"
                                onClick={() => moveProject(index, 'up')}
                                disabled={index === 0}
                                className="p-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 transition-colors"
                                title="Move up in sequence"
                            >
                                <FaArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveProject(index, 'down')}
                                disabled={index === projects.length - 1}
                                className="p-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 transition-colors"
                                title="Move down in sequence"
                            >
                                <FaArrowDown className="w-3.5 h-3.5" />
                            </button>
                        </div>

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
                            <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                                <span className="text-xs text-gray-500 font-mono">Order Index: {project.order ?? index}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-2 text-[#667eea] hover:bg-[#667eea]/10 rounded-lg transition-colors"
                                        title="Edit project"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete project"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
