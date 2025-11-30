# EmailJS Setup Guide for Contact Form

This guide will help you set up the contact form to receive emails in real-time.

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Click **"Connect Account"** and follow the authentication steps
5. Once connected, you'll see your **Service ID** (e.g., `service_abc123`)
6. **Copy this Service ID** - you'll need it later

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Set up your template:

   **Template Name:** Portfolio Contact Form

   **Subject:** New Contact from {{from_name}}

   **Content (Body):**
   ```
   You have received a new message from your portfolio contact form!

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}

   ---
   This email was sent from your portfolio contact form.
   Reply directly to this email to respond to {{from_name}}.
   ```

4. In the **"To Email"** field, enter: `ronaksarvaiya2@gmail.com`
5. In the **"From Name"** field, enter: `{{from_name}}`
6. In the **"Reply To"** field, enter: `{{from_email}}`
7. Click **"Save"**
8. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **"Account"** in the top menu
2. Click on **"General"** tab
3. Find your **Public Key** (e.g., `user_def456ghi789`)
4. **Copy this Public Key**

### Step 5: Configure Your Project

1. In your project root, find the file `.env.local.example`
2. Copy it and rename the copy to `.env.local`
3. Open `.env.local` and replace the placeholder values:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_def456ghi789
   ```

4. Save the file

### Step 6: Restart Development Server

1. Stop your development server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 7: Test the Contact Form

1. Open your portfolio in the browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox (ronaksarvaiya2@gmail.com)
6. You should receive the test email within seconds!

## Troubleshooting

### "Email service is not configured" error
- Make sure your `.env.local` file exists (not `.env.local.example`)
- Verify all three environment variables are set correctly
- Restart your development server after creating/editing `.env.local`

### Email not received
- Check your spam/junk folder
- Verify the "To Email" in your EmailJS template is correct
- Check the EmailJS dashboard for any error logs
- Make sure your EmailJS account is verified

### Form validation errors
- All fields are required
- Email must be in valid format
- Name must be at least 2 characters
- Subject must be at least 3 characters
- Message must be at least 10 characters

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Unlimited email services
- Unlimited templates
- Email history for 30 days

This is more than enough for a portfolio website!

## Security Notes

- Never commit your `.env.local` file to Git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes these variables available in the browser
- This is safe because EmailJS public keys are designed to be public
- EmailJS has built-in rate limiting to prevent abuse

## Advanced Configuration

### Custom Email Template Styling

You can add HTML styling to your EmailJS template:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #667eea;">New Contact Form Submission</h2>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Subject:</strong> {{subject}}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">{{message}}</p>
  </div>
</div>
```

### Auto-Reply to Sender

Create a second template to automatically send a confirmation email to the person who filled out the form:

1. Create another template in EmailJS
2. Set "To Email" to `{{from_email}}`
3. Write a thank you message
4. In your code, send two emails (one to you, one to the sender)

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

**That's it! Your contact form is now ready to receive emails in real-time! 🎉**
