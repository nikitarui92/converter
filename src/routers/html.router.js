import express from 'express';
import { generateFromHtml } from '../services/pdf.service.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/pdf', async (req, res) => {
  const { htmlBase64 } = req.body;

  if (!htmlBase64) {
    return res.status(400).json({
      error: 'htmlBase64 is required'
    });
  }

  const decodedString = Buffer.from(htmlBase64, "base64").toString("utf-8");
  const pdfBuffer = await generateFromHtml(decodedString);

  const now = Date.now();

  res.set({
    'Content-Type': 'application/pdf',
  });

  res.send(pdfBuffer);
});

router.post('/pdf/upload', upload.single('html'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'HTML file is required' });
  }

  const htmlString = req.file.buffer.toString('utf-8');
  const pdfBuffer = await generateFromHtml(htmlString);
  
  const now = Date.now();
  res.set({
    'Content-Type': 'application/pdf',
  });

  res.send(pdfBuffer);
});

export default router;
