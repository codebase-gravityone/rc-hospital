import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { topic, focusKeyword, description } = await req.json();
    if (!topic) return NextResponse.json({ error: "Topic required" }, { status: 400 });

    const prompt = `You are an SEO content expert for a hospital website (R.C. Eye & Dental Hospital, Bijnor, India). Write a complete, SEO-optimized blog article.

TOPIC: ${topic}
FOCUS KEYWORD: ${focusKeyword || topic}
ADDITIONAL CONTEXT: ${description || "None"}

Requirements:
1. Write 800-1200 words in HTML format
2. Use proper heading hierarchy: one <h2> for main sections, <h3> for subsections
3. Include the focus keyword naturally 3-5 times in content
4. Write in simple English that Indian patients can understand
5. Include a compelling introduction and conclusion
6. Add <ul>/<li> lists where appropriate
7. Include internal link suggestions using <a href="/contact">Book Appointment</a> or <a href="/services/...">service links</a>

Return a JSON object with exactly these fields:
{
  "title": "SEO-optimized title (50-60 chars)",
  "metaTitle": "Meta title for search engines (50-60 chars)",
  "metaDesc": "Meta description (120-155 chars)",
  "excerpt": "2-3 sentence summary for blog listing",
  "content": "Full HTML article content",
  "category": "One of: Eye Care, Dental, Surgery, Wellness, Awareness",
  "tags": "comma-separated relevant tags",
  "imageSuggestions": [
    {"placement": "cover", "description": "Description of ideal cover image"},
    {"placement": "after paragraph 2", "description": "Description of supporting image"},
    {"placement": "near conclusion", "description": "Description of closing image"}
  ]
}

IMPORTANT: Return ONLY valid JSON, no markdown code blocks, no extra text.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            console.error("Gemini API error:", err);
            return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) return NextResponse.json({ error: "No response from AI" }, { status: 500 });

        // Parse JSON from response (handle markdown code blocks if present)
        let cleaned = text.trim();
        if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
        if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
        if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
        cleaned = cleaned.trim();

        const result = JSON.parse(cleaned);
        return NextResponse.json(result);
    } catch (error) {
        console.error("AI generate error:", error);
        return NextResponse.json({ error: "Failed to generate article" }, { status: 500 });
    }
}
