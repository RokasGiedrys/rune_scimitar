import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, POST_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import PostCard, { PostTypeCard } from "@/components/PostCard";
import { Metadata } from "next";

const md = markdownit();

export const experimental_ppr = true;

// Dynamic metadata function using client.fetch
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch post data for metadata
  const post = await client.fetch(POST_BY_ID_QUERY, { id: params.id });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post does not exist.",
    };
  }

  return {
    title: `${post.title} - Blog About OSRS`,
    description: post.description,
    openGraph: {
      title: post.title || "",
      description: post.description || "",
      url: `https://runescimitar.vercel.app/post/${params.id}`,
      images: [
        {
          url: post.image || "/default-og-image.jpg", // Use post image if available, otherwise default
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "",
      description: post.description || "",
      images: [post.image || "/default-twitter-image.jpg"],
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, editorData] = await Promise.all([
    client.fetch(POST_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "selected-posts",
    }),
  ]);

  const editorPosts = editorData?.select || [];

  if (!post) {
    return notFound();
  }

  const parsedContent = md.render(post.pitch || "");

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post?.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post?.description}</p>
      </section>
      <section className='section_container'>
        <Button className='post-card_btn mb-2' asChild>
          <Link href='/'>Back Home</Link>
        </Button>
        <img
          src={post?.image || "https://placehold.co/500x500"}
          alt='thumbnail'
          className='w-full h-auto rounded-xl'
        />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/user/${post?.author?._id}`}
              className='flex gap-2 items-center mb-3'
            >
              <Image
                src={post?.author?.image || "https://placehold.co/64x64"}
                height={64}
                width={64}
                alt='author avatar'
                className='rounded-full drop-shadow-lg'
              />
              <div>
                <p className='text-20-medium'>{post.author?.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <Link href={`/?query=${post.category}`}>
              <span className='category-tag'>{post.category}</span>
            </Link>
          </div>
          <h3 className='text-30-bold'>Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className='prose max-w-4xl font-work-sans break-all'
            />
          ) : (
            <span className='no-result'>No details provided.</span>
          )}
        </div>
        <hr className='divider' />
        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className='text-30-semibold'>Editor Picks</p>

            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post: PostTypeCard, i: number) => (
                <PostCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
}
