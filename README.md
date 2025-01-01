<!-- ABOUT THE PROJECT -->

## About The Project

A social media application built with React for UI, Firebase for authentication, Supabase for database, bucket storage and graphql endpoint.
Apollo client is used for interaction with supabase graphql endpoint.

### Installation

To spin up the project locally, follow these steps:

1. First clone the repo
2. Then `cd YOUR_PROJECT_REPO`
3. Next `npm install`
4. Create `.env` file with the following variables:
```
VITE_API_KEY=<your-firebase-web-api-key>
VITE_AUTH_DOMAIN=<your-firebase-auth-domain>
VITE_PROJECT_ID=<your-firebase-project-id>
VITE_STORAGE_BUCKET=<your-firebase-storage-bucket>
VITE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
VITE_APP_ID=<your-firebase-app-id>
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_KEY=<your-supabase-anon-key>
```
5. Next `npm run dev`

That's it! Changes made in `./src` will be reflected in your app.