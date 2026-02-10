declare namespace NodeJS {
  interface ProcessEnv {
    // Base Url
    NEXT_PUBLIC_BASE_URL: string;
    VERCEL_URL: string;

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;

    // Sanity Studio Local
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    // Sanity Studio Cloud
    SANITY_STUDIO_PROJECT_ID: string;
    SANITY_STUDIO_DATASET: string;
    // Sanity API
    SANITY_VIEWER_API_TOKEN: string;
    SANITY_ADMIN_API_TOKEN: string;

    // Stripe
    STRIPE_SECRET_KEY: string;
    STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
  }
}
