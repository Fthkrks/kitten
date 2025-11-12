// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid: string, { locale, document }: { locale?: string; document?: any }): string | null => {
  // Handle different content types with their specific URL patterns
  switch (uid) {
    // Single type pages
    case "api::homepage.homepage":
      return "/";
    
    case "api::about-us-page.about-us-page":
      return "/about-us";
    
    case "api::history-page.history-page":
      return "/history";
    
    case "api::health-page.health-page":
      return "/health";
    
    case "api::recipe-page.recipe-page":
      return "/recipe";
    
    case "api::diet-page.diet-page":
      return "/diet";
    
    case "api::vaccine-page.vaccine-page":
      return "/vaccines";
    
    case "api::spayingand-neutering.spayingand-neutering":
      return "/spaying-and-neutering";
    
    case "api::products-recommed.products-recommed":
      return "/recommended-products";
    
    case "api::faq-page.faq-page":
      return "/faq";
    
    case "api::terms-page.terms-page":
      return "/terms";
    
    case "api::avaible-kitten-page.avaible-kitten-page":
      return "/avaible-kittens";
    
    case "api::kings-page.kings-page":
      return "/kings";
    
    case "api::queens-page.queens-page":
      return "/queens";
    
    case "api::blog-page.blog-page":
      return "/blog";
    
    case "api::galleries-page.galleries-page":
      return "/galleries";
    
    case "api::testimonial-page.testimonial-page":
      return "/testimonials";
    
    // Hero is not a page, so no preview needed
    case "api::hero.hero":
      return null;
    
    default:
      return null;
  }
};

export default ({ env }) => {
  const clientUrl = env("CLIENT_URL", "http://localhost:3000");
  const previewSecret = env("PREVIEW_SECRET", "your-secret-key");

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins: [clientUrl],
        async handler(uid: string, { documentId, locale, status }: { documentId: string; locale?: string; status?: string }) {
          const document = await strapi.documents(uid as any).findOne({ documentId });
          const pathname = getPreviewPathname(uid, { locale, document });

          if (!pathname) {
            return null; // No preview for this content type
          }

          // For draft content, use preview route with secret
          if (status === 'draft') {
            return `${clientUrl}/api/preview?secret=${previewSecret}&pathname=${encodeURIComponent(pathname)}`;
          }

          // For published content, return the normal URL
          return `${clientUrl}${pathname}`;
        },
      },
    },
  };
};
