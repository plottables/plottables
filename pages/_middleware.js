import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req, ev) {
    if (process.env.NEXT_PUBLIC_PROJECT_REDIRECT) {
        const url = req.nextUrl.clone()
        if (url.pathname === '/') {
            url.pathname = `/project/${process.env.NEXT_PUBLIC_PROJECT_REDIRECT.toString()}`
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }
}
