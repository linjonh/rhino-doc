import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Rhino",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        {/* Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly. */}
        Rhino是一个开源的JavaScript引擎，它是用Java编写的，支持ECMAScript标准。
        它可以嵌入Java应用程序中，并且可以在Java环境中运行JavaScript代码。
      </>
    ),
  },
  {
    title: "JavaAPI",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        {/* Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory. */}
        JavaAPI是Rhino的核心API，它提供了与JavaScript引擎交互的接口。
        它允许开发人员在Java应用程序中执行JavaScript代码，并与Java对象进行交互。
      </>
    ),
  },
  {
    title: "Powered by React",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        {/* Extend or customize your site layout by reusing React. Docusaurus can be
        extended while reusing the same header and footer. */}
        本项目使用React构建，提供了一个现代化的用户界面和良好的用户体验。
        你可以轻松地自定义和扩展这个项目，以满足你的需求。
      </>

    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
