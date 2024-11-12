import { auth } from "@/auth";
import PostForm from "@/components/PostForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Create New Post</h1>
      </section>
      <PostForm />
    </>
  );
};

export default page;
