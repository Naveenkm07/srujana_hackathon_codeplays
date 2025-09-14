import React from 'react';
import './HeaderFiles.css';

function HeaderFiles({ onBackClick }) {
  const headerFiles = [
    {
      file: '<iostream>',
      purpose: 'Input/output streams → cout, cin, endl'
    },
    {
      file: '<cmath>',
      purpose: 'Math functions → sqrt(), pow(), log2()'
    },
    {
      file: '<cstdlib>',
      purpose: 'Memory & system funcs → malloc(), exit(), rand()'
    },
    {
      file: '<cstring>',
      purpose: 'String manipulation → strlen(), strcmp(), strcpy()'
    },
    {
      file: '<vector>',
      purpose: 'Dynamic arrays → begin(), end()'
    },
    {
      file: '<string>',
      purpose: 'std::string class & string functions'
    }
  ];

  return (
    <div className="header-files-container">
      <div className="header-files-content">
        <button 
          className="back-button" 
          onClick={onBackClick}
        >
          ← Back
        </button>

        <div className="header-files-header">
          <h1 className="header-files-title">Header Files in C++</h1>
          <p className="header-files-subtitle">
            Essential C++ header files and their purposes. These headers provide the foundation for most C++ programs.
          </p>
        </div>

        <div className="table-section">
          <h2 className="table-title">Common C++ Headers</h2>
          <table className="header-table">
            <thead className="table-header">
              <tr>
                <th>Header File</th>
                <th>Purpose (Short & Clear)</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {headerFiles.map((item, index) => (
                <tr key={index} className={item.file === '<cstdlib>' ? 'highlighted-row' : ''}>
                  <td>
                    <code className="header-name">{item.file}</code>
                  </td>
                  <td>
                    <span className="header-purpose">
                      {item.purpose.split(' → ').map((part, i) => (
                        <span key={i}>
                          {i === 0 ? (
                            <span className="purpose-highlight">{part}</span>
                          ) : (
                            <span className="purpose-functions"> → {part}</span>
                          )}
                        </span>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-section">
          <h2 className="info-title">
            <span className="info-icon">💡</span>
            Why Header Files Matter
          </h2>
          <p className="info-description">
            Header files contain declarations and definitions that your C++ program needs. They're like a library catalog that tells your program what functions and classes are available.
          </p>
          <ul className="info-list">
            <li className="info-item">
              <div className="info-bullet">1</div>
              <div className="info-text">
                <strong>Include at the top:</strong> Always include headers at the beginning of your C++ files using #include
              </div>
            </li>
            <li className="info-item">
              <div className="info-bullet">2</div>
              <div className="info-text">
                <strong>Standard vs Custom:</strong> Standard headers come with C++, custom headers are created by developers
              </div>
            </li>
            <li className="info-item">
              <div className="info-bullet">3</div>
              <div className="info-text">
                <strong>Function Access:</strong> Headers give you access to functions like cout, cin, sqrt(), and many more
              </div>
            </li>
            <li className="info-item">
              <div className="info-bullet">4</div>
              <div className="info-text">
                <strong>Memory Management:</strong> Some headers help with memory allocation and system operations
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderFiles;
