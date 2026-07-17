import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json(
                { message: 'Slug parameter is required' },
                { status: 400 }
            );
        }

        const db = await getDb();
        const collection = db.collection('know');

        // 1. Fetch the main detail item by slug
        const item = await collection.findOne({ slug });

        if (!item) {
            return NextResponse.json(
                { message: `Item with slug "${slug}" not found` },
                { status: 404 }
            );
        }

        // 2. Fetch related items if relatedSlugs exist
        let related: any[] = [];
        if (item.relatedSlugs && Array.isArray(item.relatedSlugs) && item.relatedSlugs.length > 0) {
            related = await collection
                .find({ slug: { $in: item.relatedSlugs } })
                .project({ slug: 1, type: 1, title: 1, image: 1, shortDescription: 1 })
                .toArray();
        }

        return NextResponse.json({
            item,
            related
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: 'Failed to fetch details', error: err.message },
            { status: 500 }
        );
    }
}