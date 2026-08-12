import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY must be set in .env');
    }
    this.client = new Groq({ apiKey });
  }

  async generateDescription(name: string, price: number): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `Write a short, elegant product description (2-3 sentences) for an e-commerce store. Product name: "${name}". Price: $${price}. Tone: premium, minimal, no exclamation marks. Return only the description text, nothing else.`,
          },
        ],
        max_tokens: 200,
      });

      return completion.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('GROQ API ERROR:', error);
      throw error;
    }
  }
}
