import { builder } from "./sanityClient";

/* eslint-disable @next/next/no-img-element */
const ptComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold mb-5">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-5 yellow">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="text-xl mt-5">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="text-center text-gray-500 italic mb-5 text-sm">
        {children}
      </h4>
    ),
    ul: ({ children }) => <li className="underline">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="">{children}</blockquote>
    ),

    p: ({ children }) => (
      <>
        <p className="">{children}</p>
        <br />
      </>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),
    highlight: ({ children }) => (
      <span className="bg-yellow-400 font-semibold">{children}</span>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" && "noindex nofollow"}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <img
        className="w-full rounded-xl"
        src={builder.image(value.asset._ref)}
        alt="image"
      />
    ),
  },
};

export default ptComponents;
