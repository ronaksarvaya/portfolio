import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';

export async function PUT(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        let projectIds: string[] = [];
        if (Array.isArray(body.projectIds)) {
            projectIds = body.projectIds;
        } else if (Array.isArray(body.items)) {
            projectIds = body.items.map((i: any) => i._id || i.id);
        } else if (Array.isArray(body)) {
            projectIds = body.map((i: any) => (typeof i === 'string' ? i : i._id || i.id));
        }

        if (projectIds.length === 0) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const bulkOps = projectIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } },
            },
        }));

        await Project.bulkWrite(bulkOps);

        const updatedProjects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(updatedProjects);
    } catch (error) {
        console.error('Reorder error:', error);
        return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
    }
}
