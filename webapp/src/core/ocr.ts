import { TextractClient, AnalyzeDocumentCommand, FeatureType } from '@aws-sdk/client-textract';


export interface Ocr {
  convert(image: Buffer): Promise<string>;
}


export class TextractOcr {
  private client: TextractClient

  constructor(client: TextractClient) {
    this.client = client;
  }

  async convert(image: Buffer) {
    const params = {
      Document: {
        Bytes: image,
      },
      FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'] as FeatureType[],
    };
    const command = new AnalyzeDocumentCommand(params);
    const response = await this.client.send(command);
    const text = response.Blocks?.map((b) => b.Text).filter((t) => t).join(" ");
    if (!text) {
      throw Error('textract failed to extract text from image');
    }
    return text;
  }
}

