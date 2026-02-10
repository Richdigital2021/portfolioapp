
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILLS } from '../constants.tsx';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `
You are the AI assistant for Richard Akintunde's personal portfolio. 
Your goal is to represent Richard professionally and answer questions about his experience, skills, projects, and contact information.

Richard's Information:
- Name: ${PERSONAL_INFO.name}
- Title: ${PERSONAL_INFO.title}
- Bio: ${PERSONAL_INFO.bio}
- LinkedIn: ${PERSONAL_INFO.linkedin}

Experience Summary:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description.join(' ')}`).join('\n')}

Key Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Technical Skills:
${SKILLS.map(s => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}

Guidelines:
1. Be friendly, polite, and professional.
2. If you don't know an answer, suggest the user contact Richard directly via LinkedIn or Email.
3. Keep responses concise and focused.
4. If asked about salary or personal life, politely decline to answer and steer back to his professional profile.
5. You can speak multiple languages if the user asks, but maintain the professional tone.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'assistant', content: string}[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having a bit of trouble connecting to my brain right now. Please try again or reach out to Richard directly!";
  }
};
