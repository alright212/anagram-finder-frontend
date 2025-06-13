// Test API connection and translations
const API_BASE_URL = 'http://localhost:8000/api/v1';

async function testApiConnection() {
  console.log('Testing API connection...');
  
  try {
    // Test basic API connection
    const response = await fetch(`${API_BASE_URL}/locale/info`);
    const data = await response.json();
    console.log('API Info:', data);
    
    // Test Estonian translations
    const etResponse = await fetch(`${API_BASE_URL}/locale/translations/api?locale=et`);
    const etData = await etResponse.json();
    console.log('Estonian translations loaded:', !!etData.data?.translations);
    console.log('Estonian wordbase.import.instructions:', etData.data?.translations?.wordbase?.import?.instructions);
    
    // Test English translations
    const enResponse = await fetch(`${API_BASE_URL}/locale/translations/api?locale=en`);
    const enData = await enResponse.json();
    console.log('English translations loaded:', !!enData.data?.translations);
    console.log('English wordbase.import.instructions:', enData.data?.translations?.wordbase?.import?.instructions);
    
  } catch (error) {
    console.error('API connection failed:', error);
  }
}

testApiConnection();
