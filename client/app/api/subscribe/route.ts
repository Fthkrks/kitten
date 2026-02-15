import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    console.log('📧 Subscribing email to Kit:', email);
    
    // Kit API'ye subscriber ekleme
    const response = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': process.env.KIT_API_KEY!,
      },
      body: JSON.stringify({
        email_address: email,
        state: 'active',
      }),
    });
    
    const data = await response.json();
    
    console.log('📡 Kit API response status:', response.status);
    console.log('📦 Kit API response data:', data);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0] || 'Subscription failed' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true, subscriber: data.subscriber });
  } catch (error) {
    console.error('❌ Error subscribing to Kit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
