import { playing_schema } from "@/schemas/spotify";
import { token_schema } from "@/schemas/spotify";

const refresh_token = "AQBzjNGxQaJWm4VvkLzTfKOaoCZCj5SJsbJ0Zz-hjxslnP4q3BTsSwuKMhNRC603nRvV5BdLF2qiHh1djeD03Da6I0dson5oAP0o5PKaxGJD72DK5fUo9JQBJtgpA-U6qOA"
const client_id = "5ce5ca171e0643f59949b9061943bd1e"
const client_secret ="3326ddb36e54439a805c377b31fd17f2"

const getRefreshToken = async () => {
  // call /api/spotify/login
  const response = await fetch("/api/spotify/login");
  const res_data = await response.json();
  console.log(res_data)

}


export  const getAccessToken = async () => {
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
