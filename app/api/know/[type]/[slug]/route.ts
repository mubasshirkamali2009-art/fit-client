// app/api/know/[type]/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: { type: string; slug: string } }
) {
    try {
        const { type, slug } = params;
        const db = await getDb();
        const collection = db.collection('know');

        const item = await collection.findOne({ type, slug });
        if (!item) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        let related: any[] = [];
        if (item.relatedSlugs?.length) {
            related = await collection
                .find({ slug: { $in: item.relatedSlugs } })
                .project({ slug: 1, type: 1, title: 1, image: 1, shortDescription: 1, meta: 1 })
                .toArray();
        } else {
            related = await collection
                .find({ type, _id: { $ne: item._id } })
                .project({ slug: 1, type: 1, title: 1, image: 1, shortDescription: 1, meta: 1 })
                .limit(4)
                .toArray();
        }

        return NextResponse.json({ item, related });
    } catch (err: any) {
        return NextResponse.json(
            { message: 'Failed to fetch item', error: err.message },
            { status: 500 }
        );
    }
}