import React from 'react';
import Loader from 'react-loader-spinner';

function PageNotFound() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '40vh' }}
    >
      <p
        style={{
          alignSelf: 'center',
          paddingRight: '20px',
          fontSize: '50px',
        }}
      >
        Travelling to Asia...
      </p>
      <Loader type="Oval" color="#00BFFF" height="70" width="70" />
    </div>
  );
}

export default PageNotFound;
