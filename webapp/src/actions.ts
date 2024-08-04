'use server';

import OpenAI from 'openai';
import { TextractClient } from "@aws-sdk/client-textract";

import { TextractOcr } from "@/core/ocr";
import { Integration, OpenAiCompleter, OpenAiOptionSelector } from "./integrations/framework";
import { DallE3Integration } from './integrations/art.tsx';
import { SpotifyIntegration } from './integrations/music.tsx';


export async function imageToText(formData: FormData) {
  const blob = formData.get("blob") as Blob;
  const region = process.env.AWS_REGION;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  if (!region || !secretAccessKey || !accessKeyId) {
    throw Error('missing required environment variables');
  }
  const client = new TextractClient({
    region: region,
    credentials: {
      secretAccessKey: secretAccessKey,
      accessKeyId: accessKeyId,
    },
  });
  const ocr = new TextractOcr(client);
  return ocr.convert(Buffer.from(await blob.arrayBuffer()));
}


export type IntegrationType = 'art' | 'music';


export async function update(passage: string, integrationType: IntegrationType) {
  const artSummaryPrompt = 'Two sentence description of the mood and environment described in the passage.'
  const openAiApiKey = process.env['OPENAI_API_KEY'];
  if (!openAiApiKey) {
    throw Error('missing openai api key');
  }
  const openAiClient = new OpenAI({
    apiKey: openAiApiKey,
  });
  const optionSelector = new OpenAiOptionSelector(openAiClient);
  const completer = new OpenAiCompleter(openAiClient);
  let integration: Integration;
  if (integrationType == 'art') {
    integration = new DallE3Integration(openAiClient, artSummaryPrompt);
  }
  if (integrationType == 'music') {
    integration = new SpotifyIntegration();
  } else {
    throw Error('unrecognized integration type found');
  }
  const context = {
    passage,
    optionSelector,
    completer,
  };
  return integration.update(context);
}

