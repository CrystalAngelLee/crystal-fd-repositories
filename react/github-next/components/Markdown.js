import { memo, useMemo } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true });

function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)));
}

export default memo(function Markdown({ content, isBase64 }) {
  const mycontent = isBase64 ? b64_to_utf8(content) : content;
  const html = useMemo(() => md.render(mycontent), [mycontent]);
  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
});
