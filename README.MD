## 💡 Inspiration 
With the continuous evolution of technology, media consumption has become increasingly immersive - except for books. Despite advancements in other forms of entertainment, reading remains a solitary and unchanged experience. What if you could be transported into the world of the book you’re reading? This question inspired us to create Ambianced.

## What it does ⚙️ 🛠️
Ambianced revolutionizes your reading experience by transforming your surroundings to match the atmosphere of the book you’re reading. It provides synchronized visual scenery and auditory stimuli that align with the text on your page, creating an immersive environment that enhances the narrative and sets the perfect tone for each scene.

## 👨🏼‍💻👨🏽‍💻👩🏻‍💻👨🏼‍💻 How we built it 
We developed Ambianced using Next.js for both the front-end and back-end, ensuring a seamless and responsive user interface. For user authentication, we implemented Auth0, creating an easy-to-use login page. To process the text on the book pages, we utilized the AWS SDK (Textract) for Optical Character Recognition (OCR). The extracted text is then processed by OpenAI’s GPT-4 API to select appropriate Spotify tracks and generate image prompts for DALL-E 3, enhancing both the visual and auditory experience.

## Challenges we ran into 🏋🏻
- **Authentication**:  
- **Spotify API Integration**: Many issues with refresh and access tokens.
- **AWS CLI**: Not having AWS CLI set up before, meaning no .aws directory to have the default profile. Also, having to set up the bucket and IAM on the console.

## 💪🏆 Accomplishments that we're proud of
- Setting up AWS CLI, and then setting up AWS SDK
We should be proud of ourselves for working with a lot of tools we've never worked with before. We did a great job in defining the tasks that needed to be done to complete the greater project, using sticky notes to keep us on track. We were the first to complete the scavenger hunt and still managed to get most of the tasks done.

## What we learned 📌🚀
We did an amazing job familiarizing ourselves with and harmonizing powerful tools like AWS, OpenAI, and Spotify, in such a short amount of time. Throughout this project, we gained hands-on experience with some of the most advanced tools available. We learned how to effectively utilize AWS for OCR, integrate OpenAI’s capabilities for text processing, and sync audio using Spotify’s API. This experience has significantly broadened our technical skills and understanding of these powerful platforms.

## 🎯🧱 What's next for Ambianced
- **LED light compatibility** 💡: Integrating LED lighting for a more vibrant experience.
- **Multi-monitor support** 🖥️: Expanding to multiple screens for a broader immersive effect.
- **Eye-tracking technology** 👀: More refined and dynamic scenery and audio.