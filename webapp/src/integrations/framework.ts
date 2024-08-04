import type OpenAI from 'openai';

export interface OptionSelector {
   select(
    passage: string,
    name: string,
    description: string,
    options: string[],
  ): Promise<string>;
}

export interface Completer {
  complete(passage: string, prompt: string): Promise<string>;
}

export class OpenAiCompleter implements Completer {
  private client: OpenAI;
  private model: string;

  constructor(
    client: OpenAI,
    model: string = 'gpt-3.5-turbo',
  ) {
    this.client = client;
    this.model = model;
  }

  async complete(passage: string, prompt: string) {
    const function_name = 'complete';
    const name = 'completion';
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: passage }],
      function_call: {'name': function_name},
      functions: [
        {
          name: function_name,
          parameters: {
            type: 'object',
            properties: {
              [name]: {
                type: 'string',
                description: prompt,
              }
            },
            'required': [name],
          },
        }
      ],
    });
    const argumentsJson = response?.choices[0]?.message.function_call?.arguments;
    const selection = argumentsJson && JSON.parse(argumentsJson)[name];
    if (typeof selection !== 'string') {
      throw Error("openai api response did not contain a completion");
    }
    return selection;
  }
}

export class OpenAiOptionSelector implements OptionSelector {
  private client: OpenAI;
  private model: string;

  constructor(
    client: OpenAI,
    model: string = 'gpt-3.5-turbo',
  ) {
    this.client = client;
    this.model = model;
  }

  async select(
    passage: string,
    name: string,
    description: string,
    options: string[],
  ) {
    const function_name = 'select';
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: passage }],
      function_call: {'name': function_name},
      functions: [
        {
          name: function_name,
          description: "Select the option that best fits the passage.",
          parameters: {
            type: 'object',
            properties: {
              [name]: {
                type: 'string',
                enum: options,
                description: description,
              }
            },
            'required': [name],
          },
        }
      ],
    });
    const argumentsJson = response?.choices[0]?.message.function_call?.arguments;
    const selection = argumentsJson && JSON.parse(argumentsJson)[name];
    if (typeof selection !== 'string') {
      throw Error("openai api response did not contain a selection");
    }
    return selection;
  }
}

export interface IntegrationContext {
  passage: string;
  optionSelector: OptionSelector;
  completer: Completer;
}

export interface Integration {
  update(context: IntegrationContext): Promise<React.ReactNode>;
}

