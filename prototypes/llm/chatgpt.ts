import OpenAI from 'openai';
import 'dotenv/config';


const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

// const passage = 'But it was not the trolls that had filled the Elf with terror. The ranks of the orcs had opened, and they crowded away, as if they themselves were afraid. Something was coming up behind them. What it was could not be seen: it was like a great shadow, in the middle of which was a dark form, of man-shape maybe, yet greater; and a power and terror seemed to be in it and to go before it. It came to the edge of the fire and the light faded as if a cloud had bent over it. Then with a rush it leaped across the fissure. The flames roared up to greet it, and wreathed about it; and a black smoke swirled in the air. Its streaming mane kindled, and blazed behind it. In its right hand was a blade like a stabbing tongue of fire; in its left it held a whip of many thongs.';
const passage = 'Between airline fares and accommodation rates, Hawaiʻi is already one of the most expensive destinations in the U.S. to visit. Add in rental cars, dining out, and the price of organized tours, and it’s no surprise that you never hear Hawaiʻi described as a cheap destination. But, fear not, budget-conscious travelers – the upside of the Hawaiian Islands is that they offer an abundance of free things to do, and once you get here, you can have great, memorable experiences without breaking the bank. On Kauaʻi, the natural volcanic and lush landscape presents the visitor with a variety of free (or low-cost) things to do.'
const choose_song_function = 'choose_song';
const tools = [
  {
    'name': choose_song_function,
    'description': 'Describe the passage.',
    'parameters': {
      'type': 'object',
      'properties': {
        'theme': {
          'type': 'string',
          'enum': ['forest', 'beach', 'shadows'],
          'description': 'Theme of the passage.',
        }
      },
      'required': ['theme'],
    }
  }
]

async function main() {
  const chatCompletion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: passage }],
    function_call: {"name": choose_song_function},
    functions: tools,
  });
  console.log(chatCompletion);
  console.log(chatCompletion.choices.map((c) => c.message))
}

main();

