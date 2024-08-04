import { z } from 'zod';



export const track_schema = z.object({
  uri: z.string(),
  name: z.string(),
  album: z.object({
    name: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
        height: z.number(),
        width: z.number(),
      }),
    ),
  }),
  artists: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export const playing_schema = z.object({
  is_playing: z.boolean(),
  item: track_schema,
});

export const token_schema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});