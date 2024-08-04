"use server";
import { playing_schema } from "@/schemas/spotify";
import { token_schema } from "@/schemas/spotify";

//TODO: Dynamically fetch the refresh token from the database
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;


export const getAccessToken = async () => {
  if (!(refresh_token && client_secret && client_id)) {
    return null;
  }
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  const response = await fetch(authOptions.url, {
    method: "post",
    body: new URLSearchParams(authOptions.form),
    headers: authOptions.headers,
    // next: { revalidate: 3600, tags: [TOKEN_CACHE_TAG] },
  });
  const res_data = await response.json();
  // handle if the res_data is not a valid json
  if (res_data.error) {
    return null;
  }
  const token_data = token_schema.parse(res_data);

  return token_data.access_token;
};


export const getCurrentlyPlayingFetcher = async (token: string) => {

  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(playingOptions.url, {
    method: "get",
    headers: playingOptions.headers,
    next: { revalidate: 30 },
  });

  if (response.status !== 200) {
    return response.status;
  }

  let playing_data = null;
  const res_data = await response.json();
  playing_data = playing_schema.parse(res_data);

  return playing_data;
};

export const getPlayback = async (token: string) => {

  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/play",
    headers: {
      Authorization: "Bearer " + token,
    },
    "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    "offset": {
        "position": 5
    },
    "position_ms": 0
  };
  const response = await fetch(playingOptions.url, {
    method: "put",
    headers: playingOptions.headers,
    next: { revalidate: 30 },
    body: JSON.stringify({
      "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
      "offset": {
          "position": 5
      },
      "position_ms": 0
    }),
  });

  // if (response.status !== 200) {
  //   return response.status;
  // }

  let playing_data = null;
  const res_data = await response.json();
  // playing_data = playing_schema.parse(res_data);


  return res_data;
};


export const  getPlayback1 = async (token: string, track: string, songPosition: number) => {
  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/play",
    headers: {
      Authorization: "Bearer " + token,
    },
  };



  const response = await fetch(playingOptions.url, {
    method: "put",
    headers: playingOptions.headers,
    next: { revalidate: 30 },
    body: JSON.stringify({
      "uris": [`spotify:track:${track}`],
      "position_ms": 20000
    }),
    // body: JSON.stringify({
    //    "context_uri": "spotify:album:0j4PaZDmzAJ4PlS89zcHbW?si=LKXoH9obS7adnmGgc9yrBw",
    // "offset": {
    //     "position": 0
    // },
    // "position_ms": 0
    // }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res_data = await response.json();
  return res_data;
};
