import { client } from "@/utils/sanityClient";
import { getSearchQuery } from "@/utils/sanityQuaries";
import { Button } from "@mui/material";
import CardBlog from "../components/CardBlog";
import Error from "next/error";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Head from "next/head";

export default function Search({ data, error, replacedUrl }) {
  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>Search Results for {replacedUrl}</title>
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

      <div className="border-4  mt-10 rounded-xl  p-2">
        {data.length > 0 ? (
          <h4 className="my-3 p-3 text-2xl font-semibold text-yellow-500">
            <span className="">{data.length}</span> Blog(s) Found
          </h4>
        ) : null}
        <div className="min-h-[75vh] grid grid-cols-6 gap-10">
          {data.length > 0 ? (
            data?.map((item) => (
              <div
                key={item.title}
                className="col-span-6 md:col-span-3 lg:col-span-2"
              >
                <Link key={item.title} href={`/post/${item.slug.current}`}>
                  <CardBlog item={item} />
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center col-span-6  justify-center  p-5 max-w-sm  mx-auto">
              <Image
                height={150}
                width={150}
                src="/../public/question-mark.png"
                alt="question-mark"
              />
              <h5 className="mt-5">
                The blog you were looking for was not found.
              </h5>
              <Link href="/blogs">
                <Button className="mt-5" variant="outlined">
                  See Other Blogs
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const url = req.url.split("=")[1];
    const replacedUrl = url.replace("%20", " ");
    const query = getSearchQuery(replacedUrl);
    const data = await client.fetch(query);

    return {
      props: {
        data,
        replacedUrl,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
