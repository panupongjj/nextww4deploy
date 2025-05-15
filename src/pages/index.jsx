import { Fragment } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/layout/HeroSection/HeroSection';
import { articles } from '@/database/db';

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Code-Feed | Home</title>
        <meta 
          name='description'
          description='Browse all the coding news of today from around the globe'
        />
      </Head>
      <HeroSection 
        title='Code' 
        description='Catch up on all the coding news from around the globe, at the touch of a button'
        bgImage="/backgrounds/hero-code.webp"
      />
    </Fragment>
  )
}

// ngsp
export const getStaticProps = async context => {
  // Fetch data but form our API
  const response = await fetch (`${process.env.SERVER_NAME}/api/news`);
  const data = await response.json();

  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  console.log(data);
  
  return {
    props: {
      articles:data
    },
    revalidate: 60*60
  };
};
export default HomePage;