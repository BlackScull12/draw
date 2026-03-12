// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-step', async (req, res) => {
  const { image } = req.body;

  try {
    const steps = [];

    for (let i = 1; i <= 20; i++) {
      const prompt = `Convert this image into a pencil sketch for step ${i}/20, starting from a blank page to progressively closer to the full drawing. Use simple lines and outlines suitable for drawing tutorials.`;

      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        image: image,
        size: "512x512",
        n: 1
      });

      const stepImage = response.data[0].b64_json;
      steps.push(`data:image/png;base64,${stepImage}`);
    }

    res.json({ steps });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate steps' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
