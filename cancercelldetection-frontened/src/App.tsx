import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Your Cancer Cell Detection Application!</h1>
      <p>This application helps you detect cancer cells in images.</p>
      <p>we are in development phase...</p>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div>
      <Welcome />
    </div>
  );
}

export default App;
