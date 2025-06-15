/**
 * roadmapData.ts
 * Horizontal React Flow roadmap showing your progress toward the AI-Engineer goal.
 * Status legend:
 *   - complete      ✅  finished & confident
 *   - in-progress   🔄  currently studying / applying
 *   - planned       📅  queued up next
 */

export type Status = 'complete' | 'in-progress' | 'planned'

export interface RoadmapNode {
  id: string
  type: 'statusNode'
  data: {
    label: string
    status: Status
  }
  position: {
    x: number
    y: number
  }
}

export interface RoadmapEdge {
  id: string
  source: string
  target: string
}

/* -------------------------------------------------- */
/*  NODES                                             */
/* -------------------------------------------------- */

const stepX = 260 // horizontal spacing in px

export const roadmapNodes: RoadmapNode[] = [
  {
    id: 'python',
    type: 'statusNode',
    data: { label: 'Python & Data Wrangling', status: 'complete' },
    position: { x: 0, y: 0 },
  },
  {
    id: 'sql',
    type: 'statusNode',
    data: { label: 'SQL & Databases', status: 'complete' },
    position: { x: stepX, y: 0 },
  },
  {
    id: 'ml-basics',
    type: 'statusNode',
    data: { label: 'ML Foundations', status: 'complete' },
    position: { x: stepX * 2, y: 0 },
  },
  {
    id: 'deep-learning',
    type: 'statusNode',
    data: { label: 'Deep Learning (TF/Keras)', status: 'complete' },
    position: { x: stepX * 3, y: 0 },
  },
  {
    id: 'openai-api',
    type: 'statusNode',
    data: { label: 'Working with OpenAI API', status: 'complete' },
    position: { x: stepX * 4, y: 0 },
  },
  {
    id: 'prompt-eng',
    type: 'statusNode',
    data: { label: 'Prompt Engineering', status: 'in-progress' },
    position: { x: stepX * 5, y: 0 },
  },
  {
    id: 'huggingface',
    type: 'statusNode',
    data: { label: 'Hugging Face & LLMs', status: 'in-progress' },
    position: { x: stepX * 6, y: 0 },
  },
  {
    id: 'embeddings',
    type: 'statusNode',
    data: { label: 'Embeddings & Vector DBs', status: 'in-progress' },
    position: { x: stepX * 7, y: 0 },
  },
  {
    id: 'langchain',
    type: 'statusNode',
    data: { label: 'LangChain Workflows', status: 'planned' },
    position: { x: stepX * 8, y: 0 },
  },
  {
    id: 'llmops',
    type: 'statusNode',
    data: { label: 'LLMOps & Monitoring', status: 'planned' },
    position: { x: stepX * 9, y: 0 },
  },
  {
    id: 'cloud',
    type: 'statusNode',
    data: { label: 'Cloud Deploy (Azure + Docker)', status: 'in-progress' },
    position: { x: stepX * 10, y: 0 },
  },
  {
    id: 'ai-systems',
    type: 'statusNode',
    data: { label: 'Building AI Systems', status: 'planned' },
    position: { x: stepX * 11, y: 0 },
  },
]

/* -------------------------------------------------- */
/*  EDGES (simple left-to-right chain)                */
/* -------------------------------------------------- */

export const roadmapEdges: RoadmapEdge[] = roadmapNodes
  .slice(1)
  .map((n, i) => ({
    id: `e${i + 1}`,
    source: roadmapNodes[i].id,
    target: n.id,
  }))
