import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import clsx from 'clsx'

type Status = 'complete' | 'in-progress' | 'planned'

interface RoadmapNodeData {
  status: Status
  label: string
}

const RoadmapNode = ({ data }: { data: RoadmapNodeData }) => {
  const statusColor: Record<Status, string> = {
    complete: 'bg-green-500',
    'in-progress': 'bg-yellow-400',
    planned: 'bg-zinc-500',
  }

  return (
    <div
      className={clsx(
        'rounded-lg px-4 py-2 text-white font-medium border border-white/10 shadow-md backdrop-blur-sm',
        'w-40 text-center',
        statusColor[data.status] + '/10'
      )}
    >
      <div
        className={clsx(
          'w-3 h-3 rounded-full mb-1 mx-auto',
          statusColor[data.status]
        )}
      ></div>
      {data.label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}

RoadmapNode.displayName = 'RoadmapNode'

export default memo(RoadmapNode)
