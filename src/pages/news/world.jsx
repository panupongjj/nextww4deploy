// [2B] NESTED ROUTES - URL: https://localhost:3000/news/sports
import { Fragment } from "react"
import Head from "next/head"

import HeroSection from "@/components/layout/HeroSection"
import ArticlesList from "@/components/features/articles/ArticlesList"

// received prob from ngss- getServerSideProps 
function WorldNewsPage(prob_parameter) {

const {worldArticles} = prob_parameter

  return (
    <Fragment>
      <Head>
        <title>Code-Feed | GlobeFeed</title>
        <meta 
          name='description'
          description='Browse all the Woruld news of today via BBC News UK'
        />
      </Head>
      <HeroSection 
        title='Globe' 
        description='Catch up on all Would News via BBC News'
        bgImage="/backgrounds/hero-news.webp"
      />
      {/* Refactored Render */}
      {worldArticles.length > 0 && <ArticlesList articles={worldArticles} />}
     
    </Fragment>
  )
}

// server side prop (ngss)  @ runtime on demand
export const getServerSideProps = async context => {
  const response = await fetch(`https://newsapi.org/v2/everything?sources=bbc-news&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`)
  const data = await response.json();
  const articles = data.articles;

  // let headers = new Headers({
  //   "Accept": "application/json",
  //   "Content-Type": "application/json",
  //   "User-Agent": "Coding class challenge - someone@holmesglen.edu.au"
  // });

  // const response = await fetch(url, {
  //   method: 'GET',
  //   headers: headers
  // });

  if(!response.ok){
    throw new Error(`Failed to fetch posts - Error ${response.status}: ${data.message}`)
  }
  //console.log(articles);
  return {
    props: {
      worldArticles: articles
    },
  };
};

export default WorldNewsPage