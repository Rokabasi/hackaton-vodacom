import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import data from './data'

const initialNodes = Object.keys(data).map((key,index)=>{
  return {
      id: `${index}`,
      position : {
        x:index * 10 * Math.floor(Math.random() *10),
        y: data[key]* 10 *  Math.floor(Math.random() *10),
      },
      data: {label:key}
    }
});

const initialEdges = Object.keys(data).map((key,index)=>{
  return {
    id: `${index+1} - Z`,
    source : `${index+1} `,
    target : `Z`,
    label : 'vers la fin',
    type : 'step',
  }
})

const endNode = {
  id:"Z",
  position: {x:1000, y:1000},
  data: {label:"end noeud"},

}

// const initialEdges = [{ id: '1-2', source: '1', target: '2', label: '54', type: 'step' },
// { id: '1-3', source: '1', target: '3', label: '4', type: 'step' }];

function Flow() {
  const [nodes, setNodes] = useState([...initialNodes,{...endNode}]);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  // const modify = (id,label,source,target)=>{
  //   initialNodes.push({id:id, data:label});
  //   initialEdges.push({source:source, target:target});

  // }

  return (
    <div style={{ height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
