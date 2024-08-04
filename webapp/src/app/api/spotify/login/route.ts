import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

export async function GET() {
  const state = crypto.randomBytes(16).toString('hex');
  const scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played';

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}
