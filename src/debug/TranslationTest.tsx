import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const TranslationTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Loading...');
  const [translations, setTranslations] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testTranslations = async () => {
      try {
        console.log('Testing API connection...');
        setStatus('Testing API connection...');
        
        // Test basic API connectivity
        const response = await apiService.getTranslations('api', 'et');
        console.log('API Response:', response);
        
        if (response.success && response.data) {
          setStatus('API connection successful!');
          setTranslations(response.data);
        } else {
          setStatus('API responded but with error');
          setError(JSON.stringify(response));
        }
      } catch (err) {
        console.error('API Error:', err);
        setStatus('API connection failed');
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    testTranslations();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Translation API Debug</h3>
      <p><strong>Status:</strong> {status}</p>
      {error && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {translations && (
        <div>
          <strong>Sample Translation Keys:</strong>
          <pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
            {JSON.stringify(translations, null, 2).substring(0, 500)}...
          </pre>
        </div>
      )}
    </div>
  );
};

export default TranslationTest;
