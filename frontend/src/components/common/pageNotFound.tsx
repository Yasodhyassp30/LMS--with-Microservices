import React from 'react';
import '../../styles/pageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">404 - Page Not Found</h1>
      <p className="page-not-found__message">Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;
