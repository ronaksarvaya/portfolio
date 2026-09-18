import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        if (body.order === undefined || body.order === null) {
            const maxOrderProject = await Project.findOne({}).sort({ order: -1 }).select('order');
            body.order = maxOrderProject && typeof maxOrderProject.order === 'number' ? maxOrderProject.order + 1 : 0;
        }

        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error('Create project error:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
