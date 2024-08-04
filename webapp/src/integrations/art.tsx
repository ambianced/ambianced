import type OpenAI from 'openai';

import { Integration, IntegrationContext } from './framework';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


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
    return (
      <Card className="p-4 w-fit">
        <CardContent className="flex flex-col justify-center items-center p-0" >
          <img src={url} alt="depiction of the passage" className="rounded-md container p-0" />
        </CardContent>
      </Card>
    )
  }
}

