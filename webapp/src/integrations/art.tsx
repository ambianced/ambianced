import type OpenAI from 'openai';

import { Integration, IntegrationContext } from './framework';


export class DallE3Integration implements Integration {
  private client: OpenAI;
  private summaryPrompt: string;
  private model: string;

  constructor(client: OpenAI, summaryPrompt: string, model: string = 'dall-e-3') {
    this.client = client;
    this.summaryPrompt = summaryPrompt;
    this.model = model;
  }

  async update(context: IntegrationContext) {
    const summary = await context.completer.complete(context.passage, this.summaryPrompt);
    const response = await this.client.images.generate({
      prompt: summary,
      model: this.model,
    });
    const url = response.data[0]?.url;
    if (!url) {
      throw Error('openai api did not return exactly one image url');
    }
    // TODO: return a card for the image
    return <img src={url}/>
  }
}

