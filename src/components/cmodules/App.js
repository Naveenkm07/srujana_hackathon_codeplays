import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import UserDashboard from './UserDashboard';
import CppInfo from './CppInfo';
import PythonInfo from './PythonInfo';
import JavaInfo from './JavaInfo';
import HeaderFiles from './HeaderFiles';
import Introduction from './Introduction';
import Identifiers from './Identifiers';
import Keywords from './Keywords';
import Variables from './Variables';
import DataTypes from './DataTypes';
import Operators from './Operators';
import BasicInputOutput from './BasicInputOutput';
import Loops from './Loops';
import ConditionalStatements from './ConditionalStatements';
// Python Components
import PythonIntroduction from './PythonIntroduction';
import PythonVariables from './PythonVariables';
import PythonDataTypes from './PythonDataTypes';
import PythonOperators from './PythonOperators';
import PythonStrings from './PythonStrings';
import PythonLists from './PythonLists';
import PythonLoops from './PythonLoops';
import PythonFunctions from './PythonFunctions';
import PythonConditionalStatements from './PythonConditionalStatements';
// Java Components
import JavaIntroduction from './JavaIntroduction';
import JavaVariables from './JavaVariables';
import JavaDataTypes from './JavaDataTypes';
import JavaOperators from './JavaOperators';
import JavaStrings from './JavaStrings';
import JavaArrays from './JavaArrays';
import JavaLoops from './JavaLoops';
import JavaMethods from './JavaMethods';
import JavaConditionalStatements from './JavaConditionalStatements';
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authPage, setAuthPage] = useState('login');

  // Handle URL hash changes for auth pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setAuthPage('login');
      } else if (hash === '#signup') {
        setAuthPage('signup');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLinkClick = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleBackClick = () => {
    setCurrentPage('cpp-info');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
    window.location.hash = '';
  };

  const handleSignupSuccess = () => {
    setCurrentPage('dashboard');
    window.location.hash = '';
  };

  const handleGetStarted = () => {
    setCurrentPage('cpp-info');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handlePythonStarted = () => {
    setCurrentPage('python-info');
  };

  const handleJavaStarted = () => {
    setCurrentPage('java-info');
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your C++ learning platform...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        {authPage === 'login' ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Signup onSignupSuccess={handleSignupSuccess} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      {currentPage === 'dashboard' && <UserDashboard onGetStarted={handleGetStarted} onPythonStarted={handlePythonStarted} onJavaStarted={handleJavaStarted} />}
      {currentPage === 'cpp-info' && <CppInfo onLinkClick={handleLinkClick} onBackToDashboard={handleBackToDashboard} />}
      {currentPage === 'python-info' && <PythonInfo onLinkClick={handleLinkClick} onBackToDashboard={handleBackToDashboard} />}
      {currentPage === 'java-info' && <JavaInfo onLinkClick={handleLinkClick} onBackToDashboard={handleBackToDashboard} />}
      {currentPage === 'header-files' && <HeaderFiles onBackClick={handleBackClick} />}
      {currentPage === 'introduction' && <Introduction onBackClick={handleBackClick} />}
      {currentPage === 'identifiers' && <Identifiers onBackClick={handleBackClick} />}
      {currentPage === 'keywords' && <Keywords onBackClick={handleBackClick} />}
      {currentPage === 'variables' && <Variables onBackClick={handleBackClick} />}
      {currentPage === 'datatypes' && <DataTypes onBackClick={handleBackClick} />}
      {currentPage === 'operators' && <Operators onBackClick={handleBackClick} />}
      {currentPage === 'input-output' && <BasicInputOutput onBackClick={handleBackClick} />}
      {currentPage === 'loops' && <Loops onBackClick={handleBackClick} />}
      {currentPage === 'conditional-statements' && <ConditionalStatements onBackClick={handleBackClick} />}
      {/* Python Topic Pages */}
      {currentPage === 'python-introduction' && <PythonIntroduction onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-variables' && <PythonVariables onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-datatypes' && <PythonDataTypes onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-operators' && <PythonOperators onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-strings' && <PythonStrings onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-lists' && <PythonLists onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-loops' && <PythonLoops onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-functions' && <PythonFunctions onBackClick={() => setCurrentPage('python-info')} />}
      {currentPage === 'python-conditionals' && <PythonConditionalStatements onBackClick={() => setCurrentPage('python-info')} />}
      {/* Java Topic Pages */}
      {currentPage === 'java-introduction' && <JavaIntroduction onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-variables' && <JavaVariables onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-datatypes' && <JavaDataTypes onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-operators' && <JavaOperators onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-strings' && <JavaStrings onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-arrays' && <JavaArrays onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-loops' && <JavaLoops onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-methods' && <JavaMethods onBackClick={() => setCurrentPage('java-info')} />}
      {currentPage === 'java-conditionals' && <JavaConditionalStatements onBackClick={() => setCurrentPage('java-info')} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
