export const services = [
  {
    question: 'Want to automate repetitive workflows and tasks?',
    answer: 'Build AI Agents that can reason, plan, and execute actions based on your logic.',
    keyword: 'AI Agents',
  },
  {
    question: 'Want LLM responses grounded in your company data?',
    answer: 'Build RAG Pipelines that connect AI models to your internal knowledge bases.',
    keyword: 'RAG Pipelines',
  },
  {
    question: 'Want AI to interact with your APIs, databases, and tools?',
    answer: 'Build MCP Servers that expose your systems to AI safely and reliably.',
    keyword: 'MCP Servers',
  },
];

export function highlightKeyword(text: string, keyword: string) {
  const index = text.indexOf(keyword);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="font-semibold text-accent">{keyword}</span>
      {text.slice(index + keyword.length)}
    </>
  );
}
