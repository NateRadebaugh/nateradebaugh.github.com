import { useMemo } from "react";
import { SkipNavContent, SkipNavLink } from "../components/SkipNav";
import BlogHeader from "../components/BlogHeader";
import Divider from "../components/Divider";
import Head from "../components/Head";
import styles from "./BlogLayout.module.scss";
import { getMDXComponent } from "mdx-bundler/client";
import mdxConfig from "lib/mdxConfig";

export interface BlogLayoutProps {
  isPost?: boolean;
  title: string;
  descriptionSource?: string;
  date?: string;
  children?: any;
}

function BlogLayout(props: BlogLayoutProps) {
  const {
    isPost,
    title,
    descriptionSource,
    date = undefined,
    children,
  } = props;

  const DescriptionComponent = useMemo(() => {
    if (!descriptionSource) {
      return null;
    }

    return getMDXComponent(descriptionSource);
  }, [descriptionSource]);

  return (
    <>
      <Head>
        <title>{title} - Nate Radebaugh's Blog</title>
        <meta name="Description" content={title} />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <SkipNavLink />
      <div className="p-0 container-fluid">
        <BlogHeader isPost={isPost} title={title} />

        <SkipNavContent />

        <div className={styles.pageContent}>
          <h1 className="mb-4 text-4xl font-semibold">{title}</h1>

          {date && <p className="my-2 font-bold text-gray-400">{date}</p>}

          <Divider />

          {DescriptionComponent && (
            <>
              <div className="my-2 italic text-gray-400">
                <DescriptionComponent
                  components={mdxConfig.components as any}
                />
              </div>
              <Divider />
            </>
          )}

          {children}
        </div>
      </div>
    </>
  );
}

export default BlogLayout;
