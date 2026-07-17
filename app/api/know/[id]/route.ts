// app/api/know/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const slug = searchParams.get("slug");
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 16);

        const db = await getDb();
        const collection = db.collection("know");

        // Single item lookup by slug (used by the detail page)
        if (slug) {
            const item = await collection.findOne({ slug });

            if (!item) {
                return NextResponse.json(
                    { message: `Item with slug "${slug}" not found` },
                    { status: 404 }
                );
            }

            let related: any[] = [];
            if (Array.isArray(item.relatedSlugs) && item.relatedSlugs.length > 0) {
                related = await collection
                    .find({ slug: { $in: item.relatedSlugs } })
                    .project({
                        slug: 1,
                        type: 1,
                        title: 1,
                        image: 1,
                        shortDescription: 1,
                        meta: 1,
                    })
                    .toArray();
            } else {
                related = await collection
                    .find({ type: item.type, _id: { $ne: item._id } })
                    .project({
                        slug: 1,
                        type: 1,
                        title: 1,
                        image: 1,
                        shortDescription: 1,
                        meta: 1,
                    })
                    .limit(4)
                    .toArray();
            }

            return NextResponse.json({ item, related });
        }

        // List lookup by type (used by the listing page) — unchanged behavior
        if (!type || !["tool", "exercise", "muscle"].includes(type)) {
            return NextResponse.json(
                { message: "Valid type is required (tool | exercise | muscle)" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            collection
                .find({ type })
                .project({
                    slug: 1,
                    type: 1,
                    title: 1,
                    image: 1,
                    shortDescription: 1,
                    meta: 1,
                })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),
            collection.countDocuments({ type }),
        ]);

        return NextResponse.json({
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err: any) {
        console.error("[/api/know] GET failed:", err);
        return NextResponse.json(
            { message: "Failed to fetch know items", error: err?.message || String(err) },
            { status: 500 }
        );
    }
}