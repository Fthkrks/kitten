import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getUserConfirmationEmail, getAdminNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'streetAddress', 'city', 'state', 'zip'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get admin email from environment variable
    const adminEmail = process.env.ADMIN_EMAIL;

    // Check if Gmail credentials are configured
    const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && adminEmail);
    
    if (!emailConfigured) {
      console.warn('⚠️ Gmail credentials not configured - form data will be logged but no emails sent');
      console.log('📝 Form submission:', body);
      
      // Still accept the form but don't send emails
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully (email not configured)',
        emailsSent: false
      });
    }

    // Prepare email content for user
    const userEmailContent = getUserConfirmationEmail(body.firstName);
    
    // Prepare email content for admin
    const adminEmailContent = getAdminNotificationEmail(body, body.questions || []);

    let userEmailSent = false;
    let adminEmailSent = false;

    // Send confirmation email to user
    try {
      await sendEmail(
        body.email,
        userEmailContent.subject,
        userEmailContent.html,
        userEmailContent.text
      );
      console.log(`✅ Confirmation email sent to user: ${body.email}`);
      userEmailSent = true;
    } catch (error) {
      console.error('Failed to send user confirmation email:', error);
      console.error('Error details:', error);
    }

    // Send notification email to admin
    try {
      await sendEmail(
        adminEmail,
        adminEmailContent.subject,
        adminEmailContent.html,
        adminEmailContent.text
      );
      console.log(`✅ Notification email sent to admin: ${adminEmail}`);
      adminEmailSent = true;
    } catch (error) {
      console.error('Failed to send admin notification email:', error);
      console.error('Error details:', error);
    }

    // Even if emails fail, accept the form submission
    // Log the data so it's not lost
    if (!userEmailSent || !adminEmailSent) {
      console.log('📧 Email sending had issues, but form data saved:');
      console.log(JSON.stringify(body, null, 2));
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      emailsSent: userEmailSent && adminEmailSent,
      warning: (!userEmailSent || !adminEmailSent) ? 'Email notification may have failed, but your application was received' : null
    });

  } catch (error) {
    console.error('Error processing kitten application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
