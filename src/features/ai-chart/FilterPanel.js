import React, {useState, useEffect} from 'react';

export default function FilterPanel({ payload, onApply }){
  const [filters, setFilters] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(()=>{ 
    if(payload && payload.chartSpec && payload.chartSpec.query_params){ 
      setFilters(payload.chartSpec.query_params); 
      setIsExpanded(true);
    } 
  },[payload]);

  if(!payload || !payload.chartSpec || !payload.chartSpec.query_params) return null;

  return (
    <div className="filter-panel">
      <div className="filter-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h5>🔍 Filters & Parameters</h5>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>
      
      {isExpanded && (
        <div className="filter-content">
          <div className="filter-grid">
            {Object.keys(filters).map((k)=> (
              <div key={k} className="filter-row">
                <label>{k.replace(/_/g, ' ').toUpperCase()}</label>
                <input 
                  type={k.includes('date') ? 'date' : 'text'}
                  value={filters[k]} 
                  onChange={e=>setFilters(f=>({...f,[k]:e.target.value}))} 
                  placeholder={`Enter ${k}`}
                />
              </div>
            ))}
          </div>
          
          <div className="filter-actions">
            <button 
              className="apply-btn" 
              onClick={()=> onApply({ ...payload.chartSpec, query_params: filters })}
            >
              Apply Filters
            </button>
            <button 
              className="reset-btn" 
              onClick={()=> setFilters(payload.chartSpec.query_params)}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
