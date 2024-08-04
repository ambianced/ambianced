'use server';

import { TextractClient } from "@aws-sdk/client-textract";
import { TextractOcr } from "@/core/ocr";


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

