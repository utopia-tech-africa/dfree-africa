import { groq, PortableText } from "next-sanity";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogList } from "@/app/components/blogs";
import ComponentLayout from "@/components/component-layout";
import { customPortableTextComponents } from "@/components/portable-text/custom-portable-text-components";
import { formatDateWithOrdinal } from "@/lib/utils";

interface BlogPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const query = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    title,
    "mainImage": mainImage.asset->url,
    body,
    excerpt,
    readTime,
    publishedDate,
    authorName,
    "authorImage": authorImage.asset->url
  }
`;

  const blog = await client.fetch(query, { slug });

  if (!blog) return notFound();

  return (
    <>
      <ComponentLayout className="mt-20">
        <h1 className="font-bold mb-2 max-w-244.25 text-2xl md:text-3xl lg:text-[38px] text-neutral-1000 leading-[120%] font-montserrat">
          {blog.title}
        </h1>

        <p className="text-neutral-900 font-normal text-base md:text-lg leading-[130%] mb-6">
          {blog.excerpt}
        </p>

        {blog.mainImage && (
          <div className="relative w-full h-65 md:h-95 lg:h-140.75 mb-8">
            <Image
              src={blog.mainImage}
              alt={blog.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}
        <div className="-mx-4 md:-mx-10 lg:-mx-20 h-0.5 bg-neutral-200 my-6" />

        {(blog.authorName || blog.authorImage) && (
          <div className="flex items-center gap-3 mb-10 rounded-full">
            {blog.authorImage && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-linear-to-b from-[#7CDB17] to-[#42750C]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={blog.authorImage}
                    alt={blog.authorName || "Author"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {blog.authorName && (
              <div>
                <p className="text-sm font-semibold">By {blog.authorName}</p>
                <p className="text-xs text-neutral-500">
                  {blog.publishedDate
                    ? formatDateWithOrdinal(blog.publishedDate)
                    : ""}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="prose prose-neutral max-w-none mb-16 leading-[130%] text-lg">
          <PortableText
            value={blog.body}
            components={customPortableTextComponents}
          />
        </div>

        <h2 className="text-xl font-bold">Read more</h2>
      </ComponentLayout>
      <div>
        <BlogList
          className="px-0"
          currentSlug={slug}
          compact
          showHeader={false}
        />
      </div>
    </>
  );
}
