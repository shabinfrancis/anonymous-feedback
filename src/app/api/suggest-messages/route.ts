import { openai } from '@ai-sdk/openai';
import { APICallError, streamText } from 'ai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
    const { messages } = await req.json();

  // Get the OpenAI API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "OpenAI API key is missing"
      }), { status: 500 }
    );
  }

  configure({ apiKey: apiKey });

  const result = streamText({
    model: openai('gpt-3.5-turbo-instruct'),
    maxTokens: 400, 
    prompt: prompt,
    messages,
  });

  return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof APICallError) {
        const {name, statusCode, message} = error 
        return Response.json({
            name, statusCode, message
        })
    } else {
        console.error("An error occured: ", error)
        throw error
    }
  }
}

function configure(arg0: { apiKey: string; }) {
    throw new Error('Function not implemented.');
}
