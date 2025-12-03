import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: string;
    proficiency?: number;
    icon?: string; // URL or icon name
    createdAt: Date;
    updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
    {
        name: { type: String, required: true },
        category: { type: String, required: true }, // e.g., "Frontend", "Backend", "Tools"
        proficiency: { type: Number, min: 0, max: 100 },
        icon: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
