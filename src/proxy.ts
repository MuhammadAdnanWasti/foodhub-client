import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './services/auth'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const { pathname,origin } = request.nextUrl
    const user=await getUser()
    
    if(!user){
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, origin))
    }
    return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}