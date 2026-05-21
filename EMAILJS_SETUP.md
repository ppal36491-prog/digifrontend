# EmailJS Integration Setup Guide

## Overview
The Contact form is now integrated with EmailJS to send form submissions via email.

## Step-by-Step Setup

### 1. Create an EmailJS Account
- Visit [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email

### 2. Get Your Public Key
- Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Click on "Account" in the left sidebar
- Copy your **Public Key**
- Replace `YOUR_PUBLIC_KEY_HERE` in `src/components/Contact.tsx` (line with `emailjs.init()`)

### 3. Set Up an Email Service
- In your EmailJS dashboard, go to **Email Services**
- Click "Create New Service"
- Choose your email provider (Gmail, Outlook, etc.) or use EmailJS SMTP
- For Gmail:
  - Select "Gmail"
  - Authorize the connection
  - Copy your **Service ID**
- Note: For Gmail, you may need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password

### 4. Create an Email Template
- In the dashboard, go to **Email Templates**
- Click "Create New Template"
- Use these template variables (they match the form data):
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{phone}}` - Sender's phone
  - `{{company}}` - Sender's company
  - `{{message}}` - Project brief/message
  - `{{to_email}}` - Your email to receive the message

Example template content:
```
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Project Brief:
{{message}}
```

- Copy your **Template ID**
- Replace `TEMPLATE_ID_HERE` in `src/components/Contact.tsx`

### 5. Update Your Contact Component
Replace these placeholder values in [Contact.tsx](src/components/Contact.tsx):

```typescript
// Line with emailjs.init()
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// In handleSubmit function:
await emailjs.send(
  "SERVICE_ID_HERE",      // Your EmailJS Service ID
  "TEMPLATE_ID_HERE",     // Your EmailJS Template ID
  {
    to_email: "hello@digimatetech.com", // Change to your email
    // ... rest of form data
  }
);
```

### 6. Test Your Setup
1. Run `npm run dev` to start your development server
2. Go to the Contact section on your website
3. Fill out the form and submit
4. Check your email to verify the submission was received

## IDs Location in EmailJS Dashboard

- **Public Key**: Account → API Keys → Public Key
- **Service ID**: Email Services → [Your Service] → Service ID
- **Template ID**: Email Templates → [Your Template] → Template ID

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to send message" | Check that Service ID, Template ID, and Public Key are correct |
| Email not received | Verify template variables match the form field names |
| Gmail not working | Use an [App Password](https://support.google.com/accounts/answer/185833) for Gmail |
| Rate limiting | EmailJS free plan has limits; upgrade if needed |

## Important Notes
- ⚠️ Never commit your real credentials to public repositories
- Consider using environment variables for production: Create a `.env.local` file
- Free EmailJS plan: 200 emails/month
- For production, set environment variables instead of hardcoding IDs

## Environment Variables (Optional for Production)

Create `.env.local` in your project root:
```
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
VITE_EMAILJS_SERVICE_ID=SERVICE_ID_HERE
VITE_EMAILJS_TEMPLATE_ID=TEMPLATE_ID_HERE
```

Then update Contact.tsx:
```typescript
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  // ...
);
```
