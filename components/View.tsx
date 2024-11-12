import React from "react";
import Ping from "./Ping";
import { POST_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";


const View = async ({ id }: { id: string }) => {
  const { views: viewsCount } = await client
    .withConfig({ useCdn: false })
    .fetch(POST_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: viewsCount + 1 })
        .commit()
  );

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>
      <div className='view-text'>
        <span className='font-black'> {viewsCount || "0"} Views</span>
      </div>
    </div>
  );
};

export default View;
