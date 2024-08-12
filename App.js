import React, {  useEffect, useState, createContext, useContext } from 'react';
import Navigator from './navigation/AppNavigator'
import globalErrorHandler from './services/globalErrorHandler';
import { ErrorBoundary } from './components/common/ErrorBoundary';

ErrorUtils.setGlobalHandler(globalErrorHandler);


export default function App() {
  return (
    // <ErrorBoundary>
      <Navigator />
    // </ErrorBoundary>
  );
}