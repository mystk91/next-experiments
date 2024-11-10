import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//Middleware function
export function middleware(req: NextRequest) {
  NextResponse.next();
}
