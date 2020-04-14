import React from "react";
import theme from "prism-react-renderer/themes/nightOwl";
import Highlight, { defaultProps } from "prism-react-renderer";
import styles from "./Code.module.scss";

const RE = /{([\d,-]+)}/;

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)![1]
      .split(",")
      .map((v) => v.split("-").map((y) => parseInt(y, 10)));
    return (index) => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  } else {
    return () => false;
  }
}

function Code(props) {
  const {
    children: codeString = "",
    title,
    metastring = "",
    className = "",
  } = props;
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const language = className.replace(/language-/, "");
  const showLineNumbers = !["", "txt", "text", "shell", "bash", "dir"].includes(
    language
  );
  const showTitle = title || ![""].includes(language);

  return (
    <Highlight
      {...defaultProps}
      code={codeString.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens: lines, getLineProps, getTokenProps }) => {
        const numLines = lines.length;

        return (
          <div className={styles.wrapper}>
            <pre className={className} style={style}>
              {showTitle ? (
                <div className={styles.title}>{title || language}</div>
              ) : (
                // Spacer
                <div css={{ height: "8px" }} />
              )}

              {lines.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({
                    line,
                    key: i,
                    className: shouldHighlightLine(i)
                      ? styles.highlightLine
                      : "",
                  })}
                >
                  {numLines > 2 && showLineNumbers && (
                    <span className={styles.lineNumber}>{i + 1}</span>
                  )}

                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        );
      }}
    </Highlight>
  );
}

export default Code;
