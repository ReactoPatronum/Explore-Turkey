import Head from "next/head";
import CardBlog from "../components/CardBlog";
import Sidebar from "@/components/Sidebar";
import { client } from "@/utils/sanityClient";
import Error from "next/error";
import Link from "next/link";
import { Button } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getLanding } from "@/utils/sanityQuaries";

export default function Home({ data, error }) {
  if (error) {
    return <Error statusCode={500} />;
  }
  return (
    <main>
      <Head>
        <title>Explore Turkey - Turkey Travel Guide</title>
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

      <div className="grid grid-cols-3 border-4 min-h-screen mt-10 rounded-xl">
        <div className="col-span-3 md:col-span-2 p-2 sm:p-7">
          {data?.slice(0, 4)?.map((item) => (
            <Link key={item.slug.current} href={`/post/${item.slug.current}`}>
              <CardBlog item={item} />
            </Link>
          ))}
          <div className="flex items-center justify-center mt-10">
            <Link href="/blogs">
              <Button
                style={{
                  fontWeight: "600",
                  color: "orange",
                  borderColor: "orange",
                }}
                variant="outlined"
                startIcon={<HistoryEduIcon fontSize="large" />}
              >
                See More Blogs
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1 md:border-l-2">
          <Sidebar item={data.slice(-4)} />
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  try {
    const query = getLanding;
    const data = await client.fetch(query);
    return {
      props: {
        data,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return { props: { error: true } };
  }
}
