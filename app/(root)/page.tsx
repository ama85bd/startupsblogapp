import SearchForm from '@/components/SearchForm';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { SanityLive, sanityFetch } from '@/sanity/lib/live';
import { STARTIUP_QUERY } from '@/sanity/lib/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const { data: posts } = await sanityFetch({ query: STARTIUP_QUERY });

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          Pitch Your Startup, <br /> Connect With Enterpreneurs{' '}
        </h1>
        <p className='sub-heading !max-w-3xl'>Submit Ideas, Vote on Pitches</p>
        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
