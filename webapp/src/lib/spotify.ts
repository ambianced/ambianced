import { playing_schema } from "@/schemas/spotify";
import { token_schema } from "@/schemas/spotify";

const refresh_token = "AQD14wrEBSUuwrO8CDos88dOw7ZNakQm3UVv3TIOz-ry6vME42EMI2RR6KpF2C4xnEwayIBJAndG5WyRwmvIB6v9QJDHq6BN6jWLQIo2YsKwMioFfwptLRiEZnSEjanw7X8"
const client_id = "e774a163cc3d4758968e88af921c8f8b"
const client_secret = "50deffbb345c449c897e0da0e3f83a71"

const getRefreshToken = async () => {
  // call /api/spotify/login
  const response = await fetch("/api/spotify/login");
  const res_data = await response.json();
  console.log(res_data)

}


export const getAccessToken = async () => {
  console.log("GET ACCESS TOKEN")
  if (!(refresh_token && client_secret && client_id)) {
    console.log("NO REFRESH")
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
  const token_data = token_schema.parse(res_data);

  console.log("TOKEN DATA")

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

  console.log("REARKDLSAJFLKDSAJFKLDASJFKSDAJ ")
  if (response.status !== 200) {
    return response.status;
  }

  let playing_data = null;
  const res_data = await response.json();
  playing_data = playing_schema.parse(res_data);

  return playing_data;
};

export const getPlayback = async (token: string) => {

  console.log(`theee token = ${token}`)

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

  console.log("REARKDLSAJFLKDSAJFKLDASJFKSDAJ ")
  // if (response.status !== 200) {
  //   return response.status;
  // }

  let playing_data = null;
  const res_data = await response.json();
  // playing_data = playing_schema.parse(res_data);
  console.log('res data', res_data);


  return res_data;
};
