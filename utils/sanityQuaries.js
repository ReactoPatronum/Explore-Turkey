const getSlug = `
*[_type == "post" && slug.current == $slug][0]{
    activities,
    body,
    carousel,
    mainImage,
    title,
    definition,
    description,
    imageAlt,
    descriptionForSeo,
    keywordsForSeo,
    slug,
    _createdAt,
    _id
}
`;

const getLanding = `*[_type == "post"] | order(publishedAt desc) [0...8] {
  title,
  description,
  slug,
  _createdAt,
  imageAlt,
  "categories": categories[]->{
    title,
  },
  "mainImage": mainImage.asset->url
}`;

const getAllBlogs = `*[_type == "post"] {
    title,
    description,
    slug,
    _createdAt,
    imageAlt,
    "categories": categories[]->{
      title,
      description
    },
    "mainImage": mainImage.asset->url
  }`;

const getSearchQuery = (param) => {
  return `*[
        _type == 'post' && (
          title match "$${param}" ||
          description match  "$${param}"
        )
      ] | order(publishedAt desc) [0...10] {
        title,
    description,
    slug,
    _createdAt,
    imageAlt,
    "categories": categories[]->{
      title,
      description
    },
    "mainImage": mainImage.asset->url
      }`;
};

const getComments = `*[_type == "comment" && post._ref == $postId && isApproved == true] {
  _id,
  name,
  email,
  comment,
  createdAt
}`;

const getAbout = `*[_type == 'about']{
  blogImage,
 about
}`;

const getSlugSidebar = `*[_type == "post"]{
  title,
  description,
  slug,
  _createdAt,
  imageAlt,
  "categories": categories[]->{
    title,
    description
  },
  "mainImage": mainImage.asset->url
}[0...4] | order(_createdAt asc)`;

export {
  getSlug,
  getLanding,
  getComments,
  getAllBlogs,
  getSearchQuery,
  getAbout,
  getSlugSidebar,
};

//||
//body[].children[].text match "$${param}"
