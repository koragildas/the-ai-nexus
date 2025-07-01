
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  savedItems: string[];
  addToFavorites: (toolId: string) => void;
  removeFromFavorites: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  addToSaved: (toolId: string) => void;
  removeFromSaved: (toolId: string) => void;
  isSaved: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('ai-tools-favorites');
    const storedSaved = localStorage.getItem('ai-tools-saved');
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    if (storedSaved) {
      setSavedItems(JSON.parse(storedSaved));
    }
  }, []);

  const addToFavorites = (toolId: string) => {
    const newFavorites = [...favorites, toolId];
    setFavorites(newFavorites);
    localStorage.setItem('ai-tools-favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (toolId: string) => {
    const newFavorites = favorites.filter(id => id !== toolId);
    setFavorites(newFavorites);
    localStorage.setItem('ai-tools-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const addToSaved = (toolId: string) => {
    const newSaved = [...savedItems, toolId];
    setSavedItems(newSaved);
    localStorage.setItem('ai-tools-saved', JSON.stringify(newSaved));
  };

  const removeFromSaved = (toolId: string) => {
    const newSaved = savedItems.filter(id => id !== toolId);
    setSavedItems(newSaved);
    localStorage.setItem('ai-tools-saved', JSON.stringify(newSaved));
  };

  const isSaved = (toolId: string) => savedItems.includes(toolId);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      savedItems,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addToSaved,
      removeFromSaved,
      isSaved
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
