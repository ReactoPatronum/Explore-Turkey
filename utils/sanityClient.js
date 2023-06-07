import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_TOKEN,
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2023-05-30",
});

const builder = imageUrlBuilder(client);

export { client, builder };
