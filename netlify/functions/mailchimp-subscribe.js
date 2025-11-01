// Netlify Function to add subscribers to Mailchimp
// This function is triggered by form submissions and adds the email to your Mailchimp audience

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Get environment variables
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., "us21"

  // Validate environment variables
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Missing required environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server configuration error. Please contact support.'
      })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const email = data.email;
    const twitter = data.twitter || '';

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email is required' })
      };
    }

    // Prepare Mailchimp API request
    const mailchimpData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {}
    };

    // Add Twitter username if provided
    if (twitter) {
      mailchimpData.merge_fields.TWITTER = twitter;
    }

    // Add timestamp
    mailchimpData.merge_fields.SIGNUP_DATE = new Date().toISOString();

    // Make request to Mailchimp API
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mailchimpData)
    });

    const responseData = await response.json();

    // Handle Mailchimp response
    if (response.ok) {
      console.log(`Successfully added subscriber: ${email}`);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Successfully subscribed to waitlist!'
        })
      };
    }

    // Handle "already subscribed" case
    if (response.status === 400 && responseData.title === 'Member Exists') {
      console.log(`Email already subscribed: ${email}`);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'You\'re already on the waitlist!'
        })
      };
    }

    // Handle other errors
    console.error('Mailchimp API error:', responseData);
    return {
      statusCode: response.status,
      body: JSON.stringify({
        error: responseData.detail || 'Failed to subscribe. Please try again.'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An unexpected error occurred. Please try again.'
      })
    };
  }
};
