import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'buffer';
import fetch from 'node-fetch';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('called');
  

  if (!state) {
    return NextResponse.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code!,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  };

  try {
    const response = await fetch(authOptions.url, {
      method: 'POST',
      body: new URLSearchParams(authOptions.form as any),
      headers: authOptions.headers as any,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Failed to fetch token', details: errorData }, { status: response.status });
    }

    const resData = await response.json();
    console.log(resData.refresh_token);

    return NextResponse.json(resData);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: (error as Error).message }, { status: 500 });
  }
}
