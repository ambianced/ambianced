import OpenAI from 'openai';
import 'dotenv/config'


const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const image = await client.images.generate({
    prompt: 'A camel with a penguin on its back.',
    model: 'dall-e-3',
  });
  const urls = image.data.map((i) => i.url);
  // display the image by setting image src to this url
  console.log(urls);
}

main();
