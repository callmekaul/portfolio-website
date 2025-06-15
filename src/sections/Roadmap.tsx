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
    <section className="flex flex-col w-full h-[70vh] min-w-0 justify-center items-center px-2 sm:px-4 md:px-8 lg:px-16 py-12 snap-start">
      <h2 className="subheading mb-6 text-center">Learning Roadmap</h2>
      <div className="w-full h-full mx-auto glass-card scrollbar-hide">
        <ReactFlowProvider>
          <ReactFlow
            nodes={roadmapNodes}
            edges={roadmapEdges}
            nodeTypes={nodeTypes}
            fitView
            zoomOnScroll
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            className="scrollbar-hide"
            style={{ background: 'transparent' }}
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </section>
  )
}
