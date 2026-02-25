import { PortableTextComponents } from "next-sanity";

export const customPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed my-4 text-muted-foreground text-lg">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h1 className="mt-10 mb-6 text-4xl font-bold text-foreground">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-3xl font-bold text-foreground">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-2xl font-semibold text-foreground">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-xl font-semibold text-foreground">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 py-2 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-4">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground my-4">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,

    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-xs text-foreground">
        {children}
      </code>
    ),

    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  // types: {
  //   image: BlogImage,
  // },
};
