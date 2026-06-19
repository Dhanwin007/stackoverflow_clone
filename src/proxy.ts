import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next();
}
 
export const config = {
    /* here match all paths on which the middleware/proxy function should not run(will run on every other route except on this)
    thoose paths that starts with:
    -api
    -_next/static
    -_next/image
    -favicon.com
    we use a regex to achieve this : /((?!something).*) 
    */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
}