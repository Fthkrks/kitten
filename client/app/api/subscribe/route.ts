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
    
    // Kit API v3'e form ile subscriber ekleme (email template otomatik çalışır)
    const formId = process.env.KIT_FORM_ID;
    
    if (!formId) {
      return NextResponse.json(
        { error: 'Kit form configuration missing' },
        { status: 500 }
      );
    }
    
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: process.env.KIT_API_SECRET,
        email: email,
        // İsterseniz ek alanlar ekleyebilirsiniz:
        // first_name: firstName,
        // fields: { custom_field: 'value' }
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
