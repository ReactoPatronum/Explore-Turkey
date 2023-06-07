/* eslint-disable @next/next/no-img-element */
import { builder, client } from "@/utils/sanityClient";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { PortableText } from "@portabletext/react";
import ptComponents from "@/utils/portableTextComponents";
import Breadcrumbs from "../../components/Breadcrumbs";
import Comments from "@/components/Comments";
import { Divider } from "@mui/material";
import Slideshow from "@/components/Slideshow";
import Activity from "@/components/Activity";
import PaymentIcon from "@mui/icons-material/Payment";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import ArticleIcon from "@mui/icons-material/Article";
import SectionDesc from "@/components/SectionDesc";
import CreateIcon from "@mui/icons-material/Create";
import {
  getComments,
  getSlug,
  getSlugSidebar,
} from "../../utils/sanityQuaries";
import Error from "next/error";

export default function Slug({ post, commentData, sidebar }) {
  if (!post) {
    return <Error statusCode={500} />;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.descriptionForSeo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={post.keywordsForSeo} />
        <meta
          property="og:title"
          content="Explore Turkey - Turkey Blog"
          key="title"
        />
        <meta
          property="og:description"
          content="Discover the best travel destinations in Turkey. Explore Istanbul, Ankara, Antalya, and more."
        />
      </Head>
      <article>
        <div className="grid grid-cols-3 border-4 min-h-screen mt-10 rounded-xl rounded-r-none">
          <div className="col-span-3 md:col-span-2">
            <img
              className="rounded-r-none rounded-b-none rounded-xl w-full"
              src={builder?.image(post.mainImage)?.url()}
              alt={post.imageAlt}
            />
            <Breadcrumbs definition={post.definition} date={post._createdAt} />

            <section id="content" className="">
              <SectionDesc text="Article" icon={<ArticleIcon />} />
              <div className="px-5">
                <div>
                  <h1 className="text-2xl  font-semibold">{post.title}</h1>
                  <p className="my-4">{post.description}</p>
                </div>
                <PortableText value={post.body} components={ptComponents} />
              </div>
            </section>

            <Divider className="border-b-2" />

            <section id="images">
              <SectionDesc
                text="Images"
                icon={<PermMediaIcon />}
                desc=" *You can view it in full screen by clicking on the image."
              />
              <Slideshow images={post.carousel} />
            </section>

            <Divider className="border-b-2" />

            {post.definition == "Food" ? null : (
              <section id="activities">
                <SectionDesc
                  text="Activities"
                  icon={<PaymentIcon />}
                  desc="*Prices are subject to change and may vary depending on season and vendor."
                />
                <Activity activities={post.activities} />
              </section>
            )}

            <section id="comments">
              <SectionDesc
                text="Make Comment"
                icon={<CreateIcon />}
                desc=" * indicates mandatory fields."
              />
              <Comments id={post._id} comments={commentData} />
            </section>
          </div>
          <div className="col-span-3 md:col-span-1 md:border-l-2">
            <Sidebar item={sidebar} />
          </div>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const post = await client.fetch(getSlug, { slug });
  const sidebar = await client.fetch(getSlugSidebar);
  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const params = {
    postId: post._id,
  };
  const commentData = await client.fetch(getComments, params);
  return {
    props: {
      post,
      commentData,
      sidebar,
    },
    revalidate: 3600,
  };
}
