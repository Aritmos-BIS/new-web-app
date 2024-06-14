import { NextResponse } from "next/server";
import { getGroup } from "@/libs/endpoints";
import { authenticateToken } from '@/libs/auth'

export const GET = async (request) => {

    const authResult = authenticateToken(request);
    
    if (authResult.status !== 200) {
        return NextResponse.json({ error: authResult.message }, { status: authResult.status });
    }

    const { user } = request

    const group = await getGroup(user.groupId)

    return NextResponse.json(group);
};
