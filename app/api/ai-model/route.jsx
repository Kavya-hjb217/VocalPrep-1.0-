import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  console.log("API route hit");
  const body = await req.json();
  console.log("Received body:", body);

  const { jobPosition, jobDescription, duration, interviewType } = body;

  if (!jobPosition || !jobDescription || !duration || !interviewType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const QUESTION_PROMPT = `
  Generate interview questions for the following role.
  Return ONLY a valid JSON array (no extra text).
  Each element must be an object with this structure:
  {
    "question": string,
    "type": string,
    "difficulty": string
  }

  Job Title: {{jobTitle}}
  Job Description: {{jobDescription}}
  Duration: {{duration}}
  Interview Type: {{interviewType}}
  `;

  const FINAL_PROMPT = QUESTION_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{interviewType}}", interviewType);

  console.log(FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
      response_format: { type: "json_object" }, // ensures JSON if supported
    });

    // ✅ Extract content
    const result = completion.choices[0].message.content;
    console.log("Raw result:", result);

    // ✅ Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return NextResponse.json({ error: "Invalid JSON response" }, { status: 500 });
    }

    // ✅ Return ONLY the JSON object/array
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error during OpenAI request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
