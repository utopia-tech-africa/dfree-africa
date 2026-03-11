import { client } from "./client";
import { urlFor } from "./image";
import { blogsQuery, blogBySlugQuery } from "./queries/blogs";

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
export async function getBlogs(currentSlug?: string): Promise<BlogForUI[]> {
  const data = await client.fetch(blogsQuery, { currentSlug });
  return data.map(mapBlogToUI);
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogDetailForUI | null> {
  const blog = await client.fetch(blogBySlugQuery, { slug });

  if (!blog) return null;

  return {
    ...mapBlogToUI(blog),
    body: blog.body ?? [],
    authorName: blog.authorName ?? undefined,
    authorImage: blog.authorImage ?? undefined,
  };
}
