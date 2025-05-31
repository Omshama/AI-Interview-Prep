import React from 'react';
import { LuCopy, LuCheck, LuCode } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return <p>{children}</p>;
          },
          strong({ children }) {
            return <strong>{children}</strong>;
          },
          em({ children }) {
            return <em>{children}</em>;
          },
          ul({ children }) {
            return <ul>{children}</ul>;
          },
          ol({ children }) {
            return <ol>{children}</ol>;
          },
          li({ children }) {
            return <li>{children}</li>;
          },
          blockquote({ children }) {
            return <blockquote>{children}</blockquote>;
          },
          h1({ children }) {
            return <h1>{children}</h1>;
          },
          h2({ children }) {
            return <h2>{children}</h2>;
          },
          h3({ children }) {
            return <h3>{children}</h3>;
          },
          h4({ children }) {
            return <h4>{children}</h4>;
          },
          a({ href, children }) {
            return <a href={href}>{children}</a>;
          },
          table({ children }) {
            return (
              <div>
                <table>{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead>{children}</thead>;
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr>{children}</tr>;
          },
          th({ children }) {
            return <th>{children}</th>;
          },
          td({ children }) {
            return <td>{children}</td>;
          },
          hr() {
            return <hr />;
          },
          img({ src, alt }) {
            return <img src={src} alt={alt} />;
          },
          code({ className, children }) {
            const language = className?.replace('language-', '') || '';
            return (
              <SyntaxHighlighter style={oneLight} language={language} PreTag="div">
                {String(children).trim()}
              </SyntaxHighlighter>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
