
import { bookThemesAndSong } from '@/lib/const';
import { getAccessToken, getPlayback } from "@/lib/spotify";
import { Spotify } from "react-spotify-embed";
import { Integration, IntegrationContext } from './framework';


export class SpotifyIntegration implements Integration {

  async update(context: IntegrationContext) {
    const theme = await context.optionSelector.select(
      context.passage,
      'theme',
      'Select the theme that best matches the mood and environment of the passage.',
      bookThemesAndSong.map((theme) => theme[0])
    )
    
    const songId = bookThemesAndSong.find((themeAndSong) => themeAndSong[0] === theme)?.[1];
    if (!songId) {
      return null;
    }

    const token = await getAccessToken();
    if (!token) {
      return null;
    }

    try {
      await getPlayback(token, songId, 0);
    } catch (error) {
      console.error('Error during playback:', error);
    }

    return <Spotify className='w-full' wide link={`https://open.spotify.com/track/${songId}?si=4472348a63dd4f83`} />
  }
}

