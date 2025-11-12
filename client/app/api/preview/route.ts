import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const pathname = searchParams.get('pathname');

  // Check the secret and pathname parameters
  if (secret !== process.env.PREVIEW_SECRET || !pathname) {
    return new Response('Invalid token or missing pathname', { status: 401 });
  }

  // Enable Draft Mode
  (await draftMode()).enable();

  // Decode the pathname and ensure it starts with /
  const decodedPathname = decodeURIComponent(pathname);
  const finalPathname = decodedPathname.startsWith('/') ? decodedPathname : `/${decodedPathname}`;

  // Redirect to the path from the query string
  redirect(finalPathname);
}

