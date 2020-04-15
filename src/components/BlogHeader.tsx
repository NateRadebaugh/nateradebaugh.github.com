import { Element, Text, Breadcrumb, Stack, Avatar, Button } from "react-ui";
import styles from "../layouts/BlogLayout.module.scss";
import Link from "../components/Link";

function BlogHeader({ isPost, title }) {
  return (
    <>
      <Stack
        direction="horizontal"
        justify="space-between"
        align="center"
        as="header"
        marginBottom={2}
        css={{
          overflow: "auto",
        }}
      >
        <Stack direction="horizontal" align="center" gap={2}>
          <Link href="/">
            <Avatar
              size="large"
              src="https://www.gravatar.com/avatar/80d317a74bc928d8520879fdeefc6303"
              alt="Nate Radebaugh"
            />
          </Link>
          <Stack direction="vertical">
            <Link href="/" color="text.body">
              Nate Radebaugh
            </Link>
            {isPost ? (
              <Breadcrumb className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Text variant="subtle">{title}</Text>
              </Breadcrumb>
            ) : (
              <Breadcrumb className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <Text variant="subtle">Blog</Text>
              </Breadcrumb>
            )}
          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <Button
            as={Link}
            href="/"
            variant="secondary"
            css={{ display: ["none", "none", "flex"] }}
          >
            Home
          </Button>
          <Button
            as={Link}
            href="https://github.com/NateRadebaugh"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            css={{ display: ["none", "flex", "flex"] }}
          >
            GitHub
          </Button>
          <Button
            as={Link}
            href="https://twitter.com/nateradebaugh"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            css={{ display: ["none", "flex", "flex"] }}
          >
            Twitter
          </Button>
          <Button
            as={Link}
            href="https://www.linkedin.com/in/nateradebaugh/"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            css={{ display: ["none", "flex", "flex"] }}
          >
            LinkedIn
          </Button>
          <Button as={Link} href="/resume" variant="secondary">
            Resume
          </Button>
        </Stack>
      </Stack>

      <Element
        css={{
          height: "1px",
          backgroundColor: "grays.400",
        }}
      />
    </>
  );
}

export default BlogHeader;