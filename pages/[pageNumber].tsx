import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import CourseContent from '../src/CourseContent';
import ResponsiveAppBar from '../src/ResponsiveAppBar';
import { getAllPagesInSpace } from 'notion-utils';

const notion = new NotionAPI()

export const getStaticProps = async (context: any) => {
  const pageNumber = context.params?.pageNumber
  const currentPage = CourseContent.course.children[pageNumber || 0];
  const recordMap = await notion.getPage(currentPage.link)
  const title = currentPage.title;

  return {
    props: {
      recordMap,
      title
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const rootNotionPageId = 'Github-shopify-integration-ca96463c49264b33a4419d5d5fd2d0a1'
  const rootNotionSpaceId = 'c83e97d02db2375098a465b01585ab89e9c6f1c8'

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}

export default function NotionPage({ recordMap, title }: any) {
  const [menuItems, setMenuItems] = useState(CourseContent.course.children);
  const [currentPage, setCurrentPage] = useState(menuItems[0]);
  const [pageTitle, setPageTitle] = useState(title);
  const [notionRecordMap, setNotionRecordMap] = useState(recordMap);

  useEffect(() => {
    if(recordMap) {
      setNotionRecordMap(recordMap);
      setPageTitle(title);
      console.log(recordMap);
    }

  }, [recordMap, title])

  return (
    <>
      <Head>
        <meta name='description' content='React Notion X demo renderer.' />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{pageTitle}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <NotionRenderer
        recordMap={notionRecordMap}
        fullPage={true}
        darkMode={true}
        rootDomain='localhost:9090' // used to detect root domain links and open this in the same tab
      />
    </>
  )
}