import { playing_schema } from "@/schemas/spotify";
import { token_schema } from "@/schemas/spotify";

const refresh_token = "BQDbcOngFYkJ7bmrjVEXHchFOwCja1Uns_TqG8BKDaYqUTXcVoQTS_gHz0JWVqCdzdL7EtLFfpvDQ-wqMN9jjz2JSl5C4PDV2zSO0EIooHYnApC_tuYV033gJRnPOd5SR5baaX0otAUR8X4el-n0PrHeiHIbmY3b7XeW9NaTEG8j_fV1NkMhKFMO47ywckTyeii4"
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
    next: { revalidate: 3600, tags: [TOKEN_CACHE_TAG] },
  });
  const res_data = await response.json();
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