'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

interface Skill {
    _id: string;
    name: string;
    category: string;
    proficiency: number;
    icon: string;
}

export default function SkillsAdmin() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({
        name: '',
        category: 'Frontend',
        proficiency: 80,
        icon: '',
    });

    const categories = ['Frontend', 'Backend', 'Tools', 'Other'];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await axios.get('/api/skills');
            setSkills(res.data);
        } catch (error) {
            toast.error('Failed to fetch skills');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentSkill._id) {
                await axios.put(`/api/skills/${currentSkill._id}`, currentSkill);
                toast.success('Skill updated');
            } else {
                await axios.post('/api/skills', currentSkill);
                toast.success('Skill created');
            }
            resetForm();
            fetchSkills();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/skills/${id}`);
            toast.success('Skill deleted');
            fetchSkills();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleEdit = (skill: Skill) => {
        setCurrentSkill(skill);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setCurrentSkill({
            name: '',
            category: 'Frontend',
            proficiency: 80,
            icon: '',
        });
        setIsEditing(false);
    };

    const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setCurrentSkill({ ...currentSkill, icon: base64 });
            } catch (error) {
                toast.error('Failed to process icon');
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

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

            {/* Form */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mb-10">
                <h2 className="text-xl font-semibold mb-4 text-[#764ba2]">
                    {isEditing ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Skill Name"
                            value={currentSkill.name}
                            onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#764ba2] outline-none"
                            required
                        />
                        <select
                            value={currentSkill.category}
                            onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#764ba2] outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Proficiency (0-100)"
                            value={currentSkill.proficiency}
                            onChange={(e) => setCurrentSkill({ ...currentSkill, proficiency: Number(e.target.value) })}
                            className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#764ba2] outline-none"
                            min="0"
                            max="100"
                        />
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIconChange}
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:border-[#764ba2] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#764ba2] file:text-white hover:file:bg-[#6a3b92]"
                            />
                            {currentSkill.icon && (
                                <div className="mt-2 text-xs text-gray-400 truncate">
                                    Current: {currentSkill.icon.substring(0, 30)}...
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#764ba2] text-white rounded-lg hover:bg-[#6a3b92] transition-colors flex items-center gap-2"
                        >
                            {isEditing ? <FaEdit /> : <FaPlus />}
                            {isEditing ? 'Update Skill' : 'Add Skill'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skill) => (
                    <div key={skill._id} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400">{skill.category}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full mb-4">
                                <div
                                    className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-2 rounded-full"
                                    style={{ width: `${skill.proficiency}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                            <button
                                onClick={() => handleEdit(skill)}
                                className="p-2 text-[#764ba2] hover:bg-[#764ba2]/10 rounded-lg transition-colors"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(skill._id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
