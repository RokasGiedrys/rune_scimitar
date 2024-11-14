import PostCard, { PostTypeCard } from "@/components/PostCard";
import SearchForm from "../../components/SearchForm";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session);

  const { data: posts } = await sanityFetch({ query: POSTS_QUERY, params });

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          Old School Runescape (OSRS), <br />a version of RuneScape that mirrors
          the game&apos;s state as it was in 2007
        </h1>
        <p className='sub-heading !max-w-3xl'>
          Rune Scimitar - Share, read and connect with OSRS players like you!
        </p>
        <SearchForm query={query} />
      </section>
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search Results for "${query}"` : `All Posts`}
        </p>
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((item: PostTypeCard) => (
              <PostCard key={item?._id} post={item} />
            ))
          ) : (
            <p className='no-results'>No posts found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
