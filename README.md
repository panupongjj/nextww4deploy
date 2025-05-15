#Deploy a Next.js App to GitHub Pages ==> https://www.youtube.com/watch?v=mJuz45RXeXY

# [C] NEXT.JS: DATA RENDERING COMPLEXITIES

## 4. CODEFEED EXTERNAL API RENDERING: SSG

### A. RENDERING WITH "STATIC SITE GENERATION" (SSG)


As discussed, to fully utilise the advantages of Next.js, we can enact Static Site Generation (SSG) to pre-render pages prior to any user requests:

  - pages with dynamic data will be rendered at "build-time" 
  
  - when requested, the page will be sent by the server to the client very quickly, and generate a fully loaded HTML with embedded dynamic data

  - [**Next Docs on SSG**](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

  - [**Next Docs on getStaticProps**](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

&nbsp;

### B. SSG Setup to **UPDATE** `/news/aus` Route (`getStaticProps`)

**NORMALLY we would need to do some basic setup**

  - Create a new page and that the route is made available via navbar `Header.jsx`

  - Setup the fetch request & test that the data is being returned from the API via the console

  - Create refactored `List` & `Item` components

  - **HOWEVER** - this is already setup via `aus.jsx` but using CSR to render.  We will replace this with SSG!

&nbsp;

**1. Render the dynamic repo data using SSG**

  - **THEORY:** The next `getStaticProps` function **ONLY** operates within pages files & application will search for this reserved name.  If so, it will execute this function during the pre-rendering process, and queue getStaticProps PRIOR to the Home page function.

  - (a) Call the next SSG function: `getStaticProps` (can use snippet `ngsp` to generate)

  - (b) Within the function, use the fetch API to call the API endpoint (*already setup previously*): `https://newsapi.org/v2/everything?sources=abc-news-au` (*you may change the query to another news type if you like!*)

  - (c) Set the `response` to call the `.json()` method & store within variable of `data` (can `console.log` this to check data is retrieved - *this will NOW appear on server terminal*)

&nbsp;

**2. Pass the server-fetched data into the component as a `prop`**

  - THEORY: To give our component access to data fetched on the server, we need to pass the data array to the component as a `prop`

  - (a) The `return` will pass back a `props` object
  
  - (b) Within the props object, we will nest a `repos` key, with the value set to the returned `data` = `props.ausArticles` contains our data

  - (c) Go up to the `aus.jsx` component declaration & pass in `props` as an parameter, to give access to the SSG data

  - (d) `console.log` the `props.ausArticles` object to check this has been generated correctly (*this will appear on client AND server console if logged outside the SSG request*)

&nbsp;

**3. Finalise the pre-rendered routed page: `/news/aus.jsx`**

  - Check the data of `ausArticles` is being passed correctly to the already created `ArticlesList` component (*as data is same, the component does NOT need adjusting*)

  - Add some error handling to the server-side request by checking `!response.ok`

  - Test the page is rendering correctly.

  - **NOTE:** You will not gain the benefits of SSG while in `dev` - *there is no real build time advantage while in development, as the app rebuilds everytime we adjust the code!*

&nbsp;

### C. Incremenetal Static Regeneration / Caching ("ISR") (`revalidate`)

Currently, with SSG pre-rendering, the application only generates this dynamic page on build, and no more:

  - This is **ONLY** okay, if the data never changes from this point, but thats relatively uncommon

  - Rather than rebuild the application **OR** revert to SSR, we can tell the  pre-render to occur at intervals, allowing us to "refresh" the page data

  - **Incrememtal Static Regeneration (ISR):**

    - We use the `revalidate` property, as part of the the SSG return 

    - This will mean the page will be built at build time AND every number of seconds set by the revalidate property! It takes a value for the number of seconds *before regeneration*

    - E.G. We set it to `60`, meaning the fetched repos will never be more than ONE MINUTE old!

&nbsp;

### D. Dynamic Routes & Static Paths (`getStaticPaths`)

NOTE: We are fetching the entire array of data and looping it into a list, meaning ALL entries appear on ONE route:

  - As we will see soon, an alternate choice could be to render each different news category **onto a unique route** (EG. `Aus News`, `World News`, `Sports News`, etc.)

  - We will build this with server-side generation in a later  module - but if we chose to do it with SSG again, we would ALSO need to define the routes at build time, ahead of the rendering

  - **TO DO THIS:** we would need to build in a function called `getStaticPaths`

  - [**Next Docs on Static Paths for Dynamic Routes**](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)

&nbsp;

### E. CHALLENGE: STATIC SITE GENERATION for TECH TOP HEADLINES

**GOAL:** Using the `aus.jsx` in `codefeed` as a guide, create a new base route in `/news` to loop the **TOP HEADLINES** in **TECHNOLOGY** (*category*) & pass these articles into a list of cards:

**EXAMPLE:** You can refer to `https://thecodefeed.vercel.app/` as a guide of what to look like!

**STEPS:**

  - (a) Using Postman & NewsAPI, determine the endpoint params needed to query Top Technology news
  
  - (b) Create a new route in `/pages` and a matching the new link in `Header.jsx` to **techfeed** @ `/news/tech`

  - (c) Using `getStaticProps` & FetchAPI, fetch the array from the determined endpoint & load into the props of the newly routed page.  

    - **ENV:** Using template literals & string interpolation, pass the dynamic `NEWS_API_KEY` into the endpoint request, passed from the envs
  
    - **Refer to Console/ReactDevTools to check the data has loaded into the page**

  - (c) Pass as props to `ArticlesList` component + `ArticleItem` component & test

  - **NOTE:** You will need wider IMAGE wildcard remote patterns in `next.config.js` -> you can add these two, to get around all the domain urls `hostname: '**.**',` & `hostname: '**.**.**',`

  - **BONUS:** As you can see, some of the images do not load correctly.  If you view the array of data, the `urlToImage` property is set to `null` in these cases.  Using a `filter` method, see if you can *cull* this bad data from the loaded & rendered data!