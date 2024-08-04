import { AnalyzeDocumentCommand } from  "@aws-sdk/client-textract";
import  { TextractClient } from "@aws-sdk/client-textract";
import {fromIni} from '@aws-sdk/credential-providers';
import 'dotenv/config'

const REGION = process.env.REGION; //e.g. "us-east-1"
const profileName = process.env.PROFILE_NAME;

const textractClient = new TextractClient({region: REGION, 
  credentials: fromIni({profile: profileName,}), 
});

const bucket = process.env.BUCKET_NAME
const photo = 'textbook.png'

const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      },
    },
    FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
  }

const displayBlockInfo = async (response) => {
  let textBlock = [];
  let textString = "";
    try {
        response.Blocks.forEach(block => {
            if ("Text" in block && block.Text !== undefined){
                textBlock.push(block.Text)
            }
        });
        textString = textBlock.join(" ");
        console.log(textString);
        return textString;
      } catch (err) {
        console.log("Error", err);
      }
}

const analyze_document_text = async (imageData) => {
    try {
        const analyzeDoc = new AnalyzeDocumentCommand(params);
        const response = await textractClient.send(analyzeDoc);
        return displayBlockInfo(response);
    }
    catch (err) {
      console.log("Error", err);
    }
}

analyze_document_text()
