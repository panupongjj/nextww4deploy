import { useState, useEffect, Fragment } from "react"
import Head from "next/head";

import ArticlesList from "@/components/features/articles/ArticlesList";
import HeroSection from "@/components/layout/HeroSection";

function AusNewsPage(props) {
  // Feed server-sided fetch data via props & destructure
  // NOTE: As this is server-sided, we do NOT use React state, as this is only available in client-sided requests!
  const { ausArticles } = props;  
  // console.log(ausArticles);

  // INIT STATE FOR API DATA
  // const [articles, setArticles] = useState([]);

  // CSR HOOK: LOADS API DATA IN PRE-RENDER CYCLE
  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  // FETCH FUNCTION
  // async function fetchArticles() {
  //   try {
  //     const response = await fetch(`https://newsapi.org/v2/everything?sources=abc-news-au&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`);
  //     const data = await response.json();
  //     console.log(data.articles);
  //     setArticles(data.articles);

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Fragment>
      <Head>
        <title>Code-Feed | AusFeed</title>
        <meta 
          name='description'
          description='Browse all the Australian news of today via ABC News AU'
        />
      </Head>
      <HeroSection 
        title='Aus' 
        description='Catch up on all Australian News via ABC News'
        bgImage="/backgrounds/hero-news.webp"
      />
      {/* Refactored Render */}
      {ausArticles.length > 0 && <ArticlesList articles={ausArticles} />}
    </Fragment>
  )
}

// STATIC SITE GENERATION (snippet: "ngsp")
export const getStaticProps = async () => {
  // External API Request: NewsAPI (ABC News AU)
  const response = await fetch(`https://newsapi.org/v2/everything?sources=abc-news-au&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`);
  const data = await response.json();
  const articles = data.articles;
  // console.log(articles);

  // ERROR HANDLING WITH SSG: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#error-handling-and-revalidation
  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }

  // Returned data as props
  return {
    props: {
      ausArticles: articles
    },
    revalidate: 60
  };
};

export default AusNewsPage