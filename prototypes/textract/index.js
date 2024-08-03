// Import required AWS SDK clients and commands for Node.js
import { AnalyzeDocumentCommand } from  "@aws-sdk/client-textract";
import  { TextractClient } from "@aws-sdk/client-textract";
import {fromIni} from '@aws-sdk/credential-providers';
import 'dotenv/config'

// Set the AWS Region.
const REGION = process.env.REGION; //e.g. "us-east-1"
const profileName = process.env.PROFILE_NAME;

// Create SNS service object.
const textractClient = new TextractClient({region: REGION, 
  credentials: fromIni({profile: profileName,}), 
});

const bucket = process.env.BUCKET_NAME
const photo = 'textbook.png'

// Set params
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
      } catch (err) {
        console.log("Error", err);
      }
}

const analyze_document_text = async () => {
    try {
        const analyzeDoc = new AnalyzeDocumentCommand(params);
        const response = await textractClient.send(analyzeDoc);
        //console.log(response)
        displayBlockInfo(response)
        return response; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
}

analyze_document_text()