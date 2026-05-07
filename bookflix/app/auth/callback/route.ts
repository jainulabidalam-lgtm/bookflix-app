import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  if (error) {
    console.error('[auth/callback] OAuth error:', error, errorDescription)
    return NextResponse.redirect(new URL(`/login?error=auth_callback_failed&details=${encodeURIComponent(errorDescription || error)}`, request.url))
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      console.error('[auth/callback] exchangeCodeForSession failed:', exchangeError.message)
      return NextResponse.redirect(new URL(`/login?error=auth_callback_failed&details=${encodeURIComponent(exchangeError.message)}`, request.url))
    }
  } else {
    console.warn('[auth/callback] No code or error in request')
    return NextResponse.redirect(new URL('/login?error=auth_callback_failed&details=no_code_provided', request.url))
  }

  return NextResponse.redirect(new URL('/home', request.url))
}

