import React from 'react';

const Resources = ({ resources }) => {
  return (
    <div className="resources-grid">
      {resources.map(resource => (
        <div key={resource.id} className="resource-card">
          <div className="resource-type">{resource.type}</div>
          <h4 className="resource-title">{resource.title}</h4>
          <div className="resource-meta">{resource.subject} • {resource.difficulty}</div>
          <p className="resource-description">{resource.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Resources;
