
import { bookThemesAndSong } from '@/lib/const';
import { getAccessToken, getPlayback } from "@/lib/spotify";
import { Integration, IntegrationContext } from './framework';
import {Spotify} from "react-spotify-embed";   

import { url } from 'inspector';


export class SpotifyIntegration implements Integration {

  async update(context: IntegrationContext) {
    const theme = await context.optionSelector.select(
      context.passage,
      'theme',
      'Select the theme that best matches the mood and environment of the passage.',
      bookThemesAndSong.map((theme) => theme[0])
    )
    console.log("THEME", theme)
    const songId = bookThemesAndSong.find((themeAndSong) => themeAndSong[0] === theme)?.[1];
    if (!songId) {
      throw Error('no song found for theme');
    }

    const token = await getAccessToken();
    if (!token) {
      return;
    }

    // Generate a random number between 0 and the length of bookThemesAndSongs - 1


    try {
      const data1 = await getPlayback(token, songId, 0);
      console.log(data1)
    } catch (error) {
      console.error('Error during playback:', error);
    }
    // make sure you have the access token
    // play the song
    // create the cardx 
    // TODO: return a card for the image
    return        <Spotify wide link={`https://open.spotify.com/track/${songId}?si=4472348a63dd4f83`} />
  }
}

