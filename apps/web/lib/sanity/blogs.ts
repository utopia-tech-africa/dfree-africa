import { translateText, translatePortableText } from "@/lib/translation";
import { client } from "./client";
import { urlFor } from "./image";
import { blogsQuery, blogBySlugQuery } from "./queries/blogs";

export type LocaleForTranslation = "en" | "fr" | "es";

export type BlogForUI = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime?: number;
  publishedDate?: string;
  imageUrl: string;
};

export type BlogDetailForUI = BlogForUI & {
  body: any;
  authorName?: string;
  authorImage?: string;
};

function mapBlogToUI(blog: any): BlogForUI {
  return {
    _id: blog._id,
    title: blog.title ?? "",
    slug: blog.slug ?? "",
    excerpt: blog.excerpt ?? "",
    readTime: blog.readTime ?? undefined,
    publishedDate: blog.publishedDate ?? undefined,
    imageUrl: blog.mainImage ?? "",
  };
}
export async function getBlogs(
  currentSlug?: string,
  locale?: LocaleForTranslation,
): Promise<BlogForUI[]> {
  const data = await client.fetch(blogsQuery, {
    currentSlug: currentSlug ?? null,
  });
  const list = data.map(mapBlogToUI);

  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (blog: BlogForUI) => ({
      ...blog,
      title: await translateText(blog.title, locale),
      excerpt: await translateText(blog.excerpt, locale),
    })),
  );
}

export async function getBlogBySlug(
  slug: string,
  locale?: LocaleForTranslation,
): Promise<BlogDetailForUI | null> {
  const blog = await client.fetch(blogBySlugQuery, { slug });

  if (!blog) return null;

  const base = {
    ...mapBlogToUI(blog),
    body: blog.body ?? [],
    authorName: blog.authorName ?? undefined,
    authorImage: blog.authorImage ?? undefined,
  };

  if (!locale || locale === "en") return base;

  const [title, excerpt, body, authorName] = await Promise.all([
    translateText(base.title, locale),
    translateText(base.excerpt, locale),
    translatePortableText(base.body, locale),
    base.authorName
      ? translateText(base.authorName, locale)
      : Promise.resolve(undefined),
  ]);

  return {
    ...base,
    title,
    excerpt,
    body,
    authorName: authorName ?? base.authorName,
  };
}
