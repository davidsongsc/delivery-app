import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};

export function middleware(req: NextRequest) {
    return NextResponse.next();
}
