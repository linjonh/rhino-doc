import React from 'react';
import { useTitleFormatter } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


export default function DocTitle() {
  const {siteConfig} = useDocusaurusContext();
  siteConfig.markdown.parseFrontMatter().then(result=>{
    let pageTilte= result.frontMatter.title
    console.log("pageTilte:",pageTilte)
  });
  console.log(siteConfig)
  const title = useTitleFormatter();
  return <>{title}</>;
}
