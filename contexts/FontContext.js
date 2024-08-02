// FontContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const FontContext = createContext();

const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Jura-Regular': require('../assets/fonts/Jura-Regular.ttf'),
        // 'Jura-Bold': require('../assets/fonts/Jura-Bold.ttf'),
        // 'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        // 'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider };
