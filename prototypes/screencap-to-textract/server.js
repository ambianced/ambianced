import express from 'express';
import multer from 'multer';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config';

const app = express();
const port = 5001;

// Set up multer for parsing multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });

// Initialize AWS Textract client
const textractClient = new TextractClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE_NAME }),
});

// Serve static files (like JS, CSS) from the 'public' directory
app.use(express.static('public'));

// Serve the HTML page
app.get('/', (req, res) => {
  res.redirect('/page.html');
});

// Handle image upload and processing
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No image file uploaded.');
    }

    const imageBuffer = req.file.buffer;

    // Call Textract directly with the image buffer
    const textractParams = {
      Document: {
        Bytes: imageBuffer, // Use Bytes for direct buffer input
      },
      FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
    };

    const analyzeDoc = new AnalyzeDocumentCommand(textractParams);
    const response = await textractClient.send(analyzeDoc);
    displayBlockInfo(response)

    res.send('Image processed successfully');
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).send('Error processing image');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

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