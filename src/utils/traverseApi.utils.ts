import type { RequestEventLoader } from "@builder.io/qwik-city";

export const fetchFromTraverseApi = async (requestEvent: RequestEventLoader, route: string) => {
  const apiKey = requestEvent.env.get('TRAVERSE_ASSIGNMENT_API_KEY');
  if (!apiKey) {
    throw new Error('Missing required environment variable TRAVERSE_ASSIGNMENT_API_KEY');
  }

  const fetchResponse = await fetch(
    route,
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  );

  return await fetchResponse.json();
};