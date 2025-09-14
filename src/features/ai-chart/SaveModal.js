import React, {useState} from 'react';

export default function SaveModal({ chartPayload }){
  const [open,setOpen] = useState(false);
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a chart name');
      return;
    }

    setSaving(true);
    try {
      const body = { 
        title: name.trim(), 
        description: description.trim(),
        chartSpec: chartPayload.chartSpec, 
        querySpec: chartPayload.raw?.query_spec || null 
      };
      
      const res = await fetch('/.netlify/functions/save-chart', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(body) 
      });
      
      if(res.ok) { 
        alert('Chart saved successfully!'); 
        setOpen(false); 
        setName(''); 
        setDescription('');
      } else {
        const error = await res.text();
        alert(`Failed to save: ${error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save chart');
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <div className="save-section">
        <button 
          className="save-trigger-btn" 
          onClick={()=>setOpen(true)} 
          disabled={!chartPayload}
          title={!chartPayload ? "Generate a chart first" : "Save this chart"}
        >
          💾 Save Chart
        </button>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content save-modal">
        <div className="modal-header">
          <h4>💾 Save Chart</h4>
          <button className="close-btn" onClick={()=>setOpen(false)}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Chart Name *</label>
            <input 
              type="text"
              placeholder="e.g., Student Performance Analysis" 
              value={name} 
              onChange={e=>setName(e.target.value)}
              maxLength={100}
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Optional description of what this chart shows..."
              value={description} 
              onChange={e=>setDescription(e.target.value)}
              rows={3}
              maxLength={500}
            />
          </div>
          
          <div className="chart-preview">
            <strong>Chart Type:</strong> {chartPayload?.chartSpec?.type || 'Unknown'}
            <br />
            <strong>Title:</strong> {chartPayload?.chartSpec?.title || 'Untitled'}
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn-secondary" 
            onClick={()=>setOpen(false)}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSave}
            disabled={saving || !name.trim()}
          >
            {saving ? 'Saving...' : 'Save Chart'}
          </button>
        </div>
      </div>
    </div>
  );
}
