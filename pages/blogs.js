import { client } from "@/utils/sanityClient";
import { getAllBlogs } from "@/utils/sanityQuaries";
import CardBlog from "../components/CardBlog";
import Error from "next/error";
import Link from "next/link";
import React from "react";
import Head from "next/head";

export default function Blogs({ data, error }) {
  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <main>
      <Head>
        <title>Explore Turkey - Blogs</title>
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
      <div className="grid grid-cols-6 gap-10 p-2 border-4 min-h-screen mt-10 rounded-xl">
        {data?.map((item) => (
          <div
            key={item.title}
            className="col-span-6 md:col-span-3 lg:col-span-2"
          >
            <Link key={item.title} href={`/post/${item.slug.current}`}>
              <CardBlog item={item} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  try {
    const query = getAllBlogs;
    const data = await client.fetch(query);
    return {
      props: {
        data,
      },
      revalidate: 18000,
    };
  } catch (error) {
    return { props: { error: true } };
  }
}
