import Markdown from "react-markdown";

export default function MarkdownContent({ step }) {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-6">{step?.title}</h1>
      <Markdown
        components={{
          h2: Heading2,
        }}
        className="space-y-3"
      >
        {step?.content}
      </Markdown>
    </article>
  );
}

const Heading2 = (props) => {
  return <h2 className="text-3xl">{props.children}</h2>;
};
