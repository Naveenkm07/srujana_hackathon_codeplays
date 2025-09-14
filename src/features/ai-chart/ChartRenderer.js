import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function ChartRenderer({ payload }){
  if(!payload) {
    return (
      <div className="chart-empty">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h4>No Chart Yet</h4>
          <p>Ask me something to generate a chart</p>
          <div className="suggestions">
            <div className="suggestion">"Show average marks per subject"</div>
            <div className="suggestion">"Display attendance over time"</div>
            <div className="suggestion">"Compare class performance"</div>
          </div>
        </div>
      </div>
    );
  }

  const { chartSpec, data, explanation } = payload;
  
  if(!chartSpec) {
    return (
      <div className="chart-error">
        <div className="error-icon">⚠️</div>
        <p>AI returned no chart specification</p>
        <p className="explanation">{explanation}</p>
      </div>
    );
  }

  if(!data || data.length === 0) {
    return (
      <div className="chart-error">
        <div className="error-icon">📭</div>
        <p>No data available for this query</p>
        <p className="explanation">{explanation}</p>
      </div>
    );
  }

  const type = chartSpec.type || 'bar';
  const xKey = chartSpec.xKey;
  const yKey = chartSpec.yKey;

  const renderChart = () => {
    switch(type.toLowerCase()) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="#3498db" />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke="#3498db" strokeWidth={2} />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={yKey} stroke="#3498db" fill="#3498db" fillOpacity={0.3} />
          </AreaChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yKey}
              nameKey={xKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="#3498db" />
          </BarChart>
        );
    }
  };

  return (
    <div className="chart-wrap" id="chart-container">
      <div className="chart-title">
        <h4>{chartSpec.title}</h4>
        <div className="chart-meta">
          <span className="chart-type">{type.toUpperCase()}</span>
          <span className="data-points">{data.length} points</span>
        </div>
      </div>
      
      <p className="chart-explanation">{explanation}</p>
      
      <div className="chart-container" style={{ width:'100%', height:320 }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <div className="chart-footer">
        <small>X-Axis: {xKey} | Y-Axis: {yKey}</small>
      </div>
    </div>
  );
}
