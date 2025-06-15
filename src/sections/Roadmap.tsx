'use client'

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { roadmapNodes, roadmapEdges } from '@/data/roadmapData'
import StatusNode from '@/components/roadmapNode'

const nodeTypes = {
  statusNode: StatusNode,
}

export function RoadmapSection() {
  return (
    <section className='flex flex-col w-full h-[70vh] min-w-0 justify-center items-center px-0 py-12 snap-start'>
      <h2 className='text-subheading mb-6 text-center'>Learning Roadmap</h2>
      <div className='w-full h-full mx-auto border border-white/10 rounded-2xl shadow-inner bg-white/5 backdrop-blur-md scrollbar-hide'>
        {' '}
        <ReactFlowProvider>
          <ReactFlow
            nodes={roadmapNodes}
            edges={roadmapEdges}
            nodeTypes={nodeTypes}
            fitView
            panOnDrag
            zoomOnScroll
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            className='scrollbar-hide'
            style={{ background: 'transparent' }}
          >
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </section>
  )
}
