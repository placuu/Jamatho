import katex from 'katex';

export const MathView = ({ math }: { math: string }) => {
  const html = katex.renderToString(math, { throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};