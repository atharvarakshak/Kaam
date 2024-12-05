import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
// import darkTheme from './theme/theme';
import Layout from '../components/Layout';
import UploadSection from '../components/UploadSection';
import ResultsSection from '../components/ResultsSection';

const DrugTest = () => {
  const [results, setResults] = useState(null);

  const handleUploadSuccess = (uploadResults) => {
    setResults(uploadResults);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    // <ThemeProvider theme={darkTheme}>
    <div>
        
      <CssBaseline />
      <Layout>
        {!results ? (
          <UploadSection onUploadSuccess={handleUploadSuccess} />
        ) : (
          <ResultsSection 
            results={results} 
            onReset={handleReset} 
          />
        )}
      </Layout>
    </div>
    // </ThemeProvider>
  );
};

export default DrugTest;