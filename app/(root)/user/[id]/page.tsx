import { auth } from "@/auth";
import { PostCardSkeleton } from "@/components/PostCard";
import UserPosts from "@/components/UserPosts";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id: id });
  if (!user) notFound();

  return (
    <>
      <section className='profile_container'>
        <div className='profile_card'>
          <div className='profile_title'>
            <h3 className='text-24-black uppercase text-center line-clamp-1'>
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image || ""}
            height={250}
            width={250}
            alt={`${user.name} profile image`}
            className='profile_image'
          />
          <p className='text-30-extrabold mt-5 text-center'>
            @{user?.username}
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
          <p className='text-30-bold'>
            {session?.id == id ? "Your" : "All"} Posts
          </p>
          <ul className='card_grid-sm'>
            <Suspense fallback={<PostCardSkeleton />}>
              <UserPosts id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
