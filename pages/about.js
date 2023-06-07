/* eslint-disable @next/next/no-img-element */
import { builder, client } from "@/utils/sanityClient";
import { getAbout } from "@/utils/sanityQuaries";
import Error from "next/error";
import Head from "next/head";
import React from "react";

export default function About({ data, error }) {
  if (error) {
    return <Error statusCode={500} />;
  }
  return (
    <>
      <Head>
        <title>Explore Turkey - About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover the best travel destinations in Turkey. Explore Istanbul , Izmir , Antalya and more."
        />
        <meta
          name="keywords"
          content="Turkey, blog, travel,travel turkey ,explore turkey, discover turkey, places to visit in Turkey, Turkish destinations, Cappadocia, Pamukkale hot springs ,Turkish coffee, Turkish Delight."
        />
        <meta
          property="og:title"
          content="exploreturkey-blog.com "
          key="title"
        />
        <meta
          property="og:description"
          content="Discover the best travel destinations in Turkey. Explore Istanbul, Ankara, Antalya, and more."
        />
      </Head>
      <div className="grid grid-cols-6 gap-4 p-2 border-4 min-h-[calc(100vh-300px)] mt-10 rounded-xl">
        <div className="col-span-6 sm:col-span-3 sm:border-r-2">
          <img
            className="rounded-r-none rounded-b-none rounded-xl w-full h-full object-cover"
            src={builder?.image(data?.blogImage.asset._ref)?.url()}
            alt="logo-image"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <h1 className="yellow text-3xl text-center font-semibold">
            ABOUT BLOG
          </h1>
          <p className="mt-8 px-2 tracking-wide text-lg">{data?.about}</p>
          <div className="flex items-end justify-end">
            <h5 className="italic underline mt-10 w-[350px]">
              &quot;Life is not about the destination, but the journey.&quot; -
              Ralph Waldo Emerson
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const query = getAbout;
    const data = await client.fetch(query);
    return {
      props: {
        data: data[0],
      },
      revalidate: 36000,
    };
  } catch (error) {
    return { props: { error: true } };
  }
}
