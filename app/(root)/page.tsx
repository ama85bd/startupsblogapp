import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 44,
      author: {
        _id: 1,
        name: 'Asif',
      },
      _id: 1,
      description: 'This is description',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhY8YmlJJ3MQzANQspe-LDxBTmmZomAoEUg&s',
      category: 'Robots',
      title: 'We Robots',
    },
  ];
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
            posts.map((post: any, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
