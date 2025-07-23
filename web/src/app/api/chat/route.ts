import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Simple echo response for demonstration
    // In a real app, this would integrate with an AI service
    const lastMessage = messages[messages.length - 1];
    const reply = `You said: "${lastMessage.content}". This is a simple echo response. To integrate with a real AI service, replace this logic with your preferred AI API call.`;

    return NextResponse.json({
      reply,
      status: 'success',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
