

//------------------------------------------using external api -----------------------------
// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import qs from 'querystring';
// import dotenv from 'dotenv';


// dotenv.config();

// const app = express();
// app.use(cors())
// app.use(express.json());

// app.post('/summarize', async (req, res) => {
//   const { text } = req.body;
//   console.log("65rfr5fu5turtfr75", text)
//   try {
//     console.log("============================================")
//     const response = await axios.post(
//       "https://smmry.com/",
//       qs.stringify({
//         sm_api_input: text,
//         SM_API_KEY: process.env.SMMRY_API_KEY, // Store in .env
//         SM_LENGTH: 5, // Optional: number of sentences
//         SM_WITH_BREAK: true, // Optional: add [BREAK] between sentences
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Expect': ''
//         }
//       }
//     );
//     console.log(response.data.sm_api_content)
//     return res.json({ summary: response.data.sm_api_content });
//   } catch (error) {
//   console.error("API Error:", error.response?.data || error.message);
//   return res.status(500).json({ error: error.message });
// }
// });

// app.post('/summarize', async (req, res) => {
//   const { text } = req.body;
//   console.log("Input Text:", text);

//   try {
//     const response = await axios.post(
//       "https://smmry.com/",
//       qs.stringify({
//         sm_api_input: text,
//         SM_API_KEY: process.env.SMMRY_API_KEY,
//         SM_LENGTH: 5,
//         SM_WITH_BREAK: true
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     );

//     console.log("Full API Response:", response.data.sm_api_content);
//     return res.json({ summary: response.data.sm_api_content });
    
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     return res.status(500).json({ error: error.message });
//   }
// });




// app.listen(5000, () => console.log('Server running on port 5000'));



//using xenova...............................................................................
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pipeline } from '@xenova/transformers';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let summarizer;

const loadModel = async () => {
  summarizer = await pipeline('summarization');
  console.log('Summarization model loaded successfully!');
};

await loadModel();

app.post('/summarize', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 20) {
    return res.status(400).json({ summary: 'Please provide more text to summarize.' });
  }

  try {
    const result = await summarizer(text, {max_length: 200, min_length:150});
    console.log('Summary Result:', result);

    res.json({ summary: result[0]?.summary_text || 'No summary generated.' });
  } catch (error) {
    console.error('Summarization Error:', error.message);
    res.status(500).json({ error: 'Failed to summarize the text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
