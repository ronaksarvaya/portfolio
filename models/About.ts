import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
    content: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
    {
        content: { type: String, required: true },
        imageUrl: { type: String },
    },
    { timestamps: true }
);

// We'll likely only have one About document
export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
