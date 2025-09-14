import React from 'react';
import ChatPanel from './ChatPanel';
import ChartRenderer from './ChartRenderer';
import FilterPanel from './FilterPanel';
import SaveModal from './SaveModal';
import ExportButton from './ExportButton';
import './ai-chart.css';

export default function AiChartTab(){
  const [conversation, setConversation] = React.useState([]);
  const [chartPayload, setChartPayload] = React.useState(null); // { chartSpec, data, explanation }
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="ai-chart-tab container">
      <div className="left">
        <ChatPanel
          onSend={async (text) => {
            setLoading(true);
            try{
              const res = await fetch('/.netlify/functions/ai-chat',{ // change depending on deployment
                method:'POST', headers:{'Content-Type':'application/json'},
                body:JSON.stringify({ message:text })
              });
              const json = await res.json();
              setConversation(c=>[...c,{role:'user',text},{role:'assistant',text:json.explanation}]);
              setChartPayload({ chartSpec: json.chart_spec, data: json.data, explanation: json.explanation, raw: json.raw_data });
            }catch(err){
              console.error(err);
              alert('Error calling AI endpoint');
            }finally{ setLoading(false); }
          }}
          conversation={conversation}
          loading={loading}
        />
      </div>

      <div className="right">
        <div className="chart-header">
          <h3>AI Chart Preview</h3>
          <ExportButton chartPayload={chartPayload} />
        </div>
        <ChartRenderer payload={chartPayload} />
        <FilterPanel
          payload={chartPayload}
          onApply={async (querySpec)=>{
            // call data/query endpoint to re-run query with updated params
            setLoading(true);
            try{
              const res = await fetch('/.netlify/functions/data-query',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ querySpec }) });
              const json = await res.json();
              setChartPayload(p => ({ ...p, data: json.data }));
            }catch(err){ console.error(err); alert('Error running query'); }
            setLoading(false);
          }}
        />
        <SaveModal chartPayload={chartPayload} />
      </div>
    </div>
  );
}
