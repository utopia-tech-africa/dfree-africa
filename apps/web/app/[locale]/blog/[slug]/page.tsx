import { groq, PortableText } from "next-sanity";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogList } from "@/app/components/blogs";
import ComponentLayout from "@/components/component-layout";

interface BlogPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const query = groq`
    *[_type == "blog" && slug.current == $slug][0]{
      title,
      "mainImage": mainImage.asset->url,
      body,
      excerpt,
      readTime,
      publishedDate,
      author->{
        name,
        "image": image.asset->url
      }
    }
  `;

  const blog = await client.fetch(query, { slug });

  if (!blog) return notFound();

  return (
    <>
      <ComponentLayout className="mt-10 lg:mt-20">
        <h1 className="font-bold mb-6 max-w-[977px] text-2xl md:text-3xl lg:text-[38px] text-neutral-1000 leading-[120%] font-montserrat">
          {blog.title}
        </h1>

        <p className="text-neutral-900 font-normal text-base md:text-lg leading-[130%] mb-6">
          {blog.excerpt}
        </p>

        {blog.mainImage && (
          <div className="relative w-full h-[260px] md:h-[380px] lg:h-[563px] mb-8">
            <Image
              src={blog.mainImage}
              alt={blog.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}

        {(blog.authorName || blog.authorImage) && (
          <div className="flex items-center gap-3 mb-10">
            {blog.authorImage && (
              <Image
                src={blog.authorImage}
                alt={blog.authorName || "Author"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}

            {blog.authorName && (
              <div>
                <p className="text-sm font-semibold">By {blog.authorName}</p>
                <p className="text-xs text-neutral-500">
                  {blog.publishedDate
                    ? new Date(blog.publishedDate).toLocaleDateString()
                    : ""}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="prose prose-neutral max-w-none mb-16 leading-[130%] text-lg">
          <PortableText value={blog.body} />
        </div>

        <h2 className="text-xl font-bold">Read more</h2>
      </ComponentLayout>
      <div>
        <BlogList className="px-0" currentSlug={slug} compact />
      </div>
    </>
  );
}
