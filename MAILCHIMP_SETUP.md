# Mailchimp Integration Setup Guide

This guide will walk you through setting up Mailchimp integration for your $SIXSEVEN waitlist.

## Overview

Your waitlist form now:
- ✅ Uses Netlify Forms for spam protection
- ✅ Automatically adds subscribers to Mailchimp
- ✅ Tracks email + Twitter username
- ✅ Handles errors gracefully

## Step 1: Create a Mailchimp Account

1. Go to [mailchimp.com/pricing](https://mailchimp.com/pricing/)
2. Click **"Start Free Trial"** (14-day free trial)
3. Complete the signup process
4. Verify your email address

## Step 2: Create an Audience (List)

1. In Mailchimp, click **"Audience"** in the top menu
2. Click **"Audience dashboard"**
3. If you don't have an audience yet, click **"Create Audience"**
4. Fill in the details:
   - **Audience name**: "$SIXSEVEN Waitlist" (or whatever you prefer)
   - **Default from email**: Your email
   - **Default from name**: "$SIXSEVEN" or your name
5. Click **"Save"**

## Step 3: Add Custom Field for Twitter (Optional but Recommended)

1. Go to **Audience** > **Manage Audience** > **Settings**
2. Click **"Audience fields and *|MERGE|* tags"**
3. Click **"Add A Field"**
4. Select **"Text"** as the field type
5. Enter:
   - **Field label**: "Twitter Username"
   - **Merge tag**: TWITTER
6. Click **"Save Changes"**

## Step 4: Get Your Mailchimp API Key

1. Click your **profile icon** in the top right
2. Select **"Account & billing"**
3. Click **"Extras"** dropdown > **"API keys"**
4. Scroll down to **"Your API keys"**
5. Click **"Create A Key"**
6. Give it a name like "$SIXSEVEN Waitlist"
7. **Copy the API key** (you won't be able to see it again!)

## Step 5: Get Your Audience ID

1. Go to **Audience** > **Manage Audience** > **Settings**
2. Click **"Audience name and defaults"**
3. Find **"Audience ID"** (it looks like: `a1b2c3d4e5`)
4. **Copy this ID**

## Step 6: Find Your Server Prefix

Your server prefix is in your Mailchimp URL. For example:
- If your URL is `https://us21.admin.mailchimp.com/...`, your prefix is **us21**
- If your URL is `https://us19.admin.mailchimp.com/...`, your prefix is **us19**

**Copy your server prefix** (e.g., "us21")

## Step 7: Configure Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Click on your **$SIXSEVEN site**
3. Click **"Site settings"**
4. Click **"Environment variables"** in the left sidebar
5. Click **"Add a variable"** and add these **three variables**:

### Variable 1:
- **Key**: `MAILCHIMP_API_KEY`
- **Value**: Your API key from Step 4
- **Scopes**: Production, Deploy previews, Branch deploys (all checked)

### Variable 2:
- **Key**: `MAILCHIMP_AUDIENCE_ID`
- **Value**: Your Audience ID from Step 5
- **Scopes**: Production, Deploy previews, Branch deploys (all checked)

### Variable 3:
- **Key**: `MAILCHIMP_SERVER_PREFIX`
- **Value**: Your server prefix from Step 6 (e.g., "us21")
- **Scopes**: Production, Deploy previews, Branch deploys (all checked)

6. Click **"Save"** for each variable

## Step 8: Deploy Your Changes

Your changes need to be deployed to Netlify:

1. Commit and push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add Mailchimp integration for waitlist"
   git push
   ```

2. Netlify will automatically deploy your changes (if you have auto-deploy enabled)
3. Wait 1-2 minutes for the build to complete

## Step 9: Test Your Form

1. Go to your live site
2. Fill out the waitlist form with a test email
3. Submit the form
4. Check Mailchimp:
   - Go to **Audience** > **Manage Audience** > **View contacts**
   - You should see your test email!

## Step 10: Send Your Launch Email on Nov 11

When you're ready to send the contract address email:

1. In Mailchimp, go to **Campaigns**
2. Click **"Create Campaign"** > **"Email"**
3. Select **"Regular"**
4. **To**: Select your "$SIXSEVEN Waitlist" audience
5. **From**: Your email and name
6. **Subject**: "🚀 $SIXSEVEN Contract Address - LIVE NOW"
7. Click **"Design Email"**
8. Use a template or start from scratch
9. Include the contract address prominently
10. **Schedule or send** at your desired time

### Pro Tip: Schedule in Advance

You can schedule the email in Mailchimp to send automatically at 6:02pm EST on Nov 11:
1. After designing your email, instead of clicking "Send", click **"Schedule"**
2. Set the date and time: **Nov 11, 2025 at 6:02pm EST**
3. Confirm and you're done! The email will send automatically.

## Troubleshooting

### "Server configuration error" message
- Check that all 3 environment variables are set in Netlify
- Make sure there are no extra spaces in the values
- Redeploy your site after adding the variables

### Email not appearing in Mailchimp
- Check your Mailchimp audience contacts
- Look in "Subscribed" tab (not "Unsubscribed" or "Non-subscribed")
- Check the Netlify function logs for errors:
  - Netlify Dashboard > Functions > mailchimp-subscribe > View logs

### "Member Exists" errors
- This is normal if someone tries to sign up twice
- The form will show success anyway (user-friendly)
- No action needed on your part

## Export Your Contacts Anytime

To download your waitlist as a CSV:
1. Go to **Audience** > **Manage Audience** > **View contacts**
2. Check the box next to **"Email Address"** to select all
3. Click **"Export"** > **"Export as CSV"**
4. Download the file

## Questions?

- Mailchimp Support: [mailchimp.com/help](https://mailchimp.com/help/)
- Netlify Support: [docs.netlify.com](https://docs.netlify.com/)

---

**You're all set!** Your waitlist will now automatically sync to Mailchimp, and you can send that contract address email whenever you're ready. 🚀
