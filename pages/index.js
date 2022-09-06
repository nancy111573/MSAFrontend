import Head from 'next/head'
import Favourites from '../components/Favourites';
import SearchResults from '../components/SearchResults';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useState } from 'react';

const FavoriteSection = styled('div')(({ theme }) => ({ 
  display: 'flex',
  maxWidth: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: "55%",
  [theme.breakpoints.up('sm')]: {
    top: 0,
    bottom:0,
    position:'fixed',
    overflowY:'scroll',
    overflowX:'hidden',
    maxWidth: '55%'
  },
}));

const ResultSection = styled('div')(({ theme }) => ({ 
  alignItems: 'center',
  textAlign: 'center',
  minWidth: '40%',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: "55%",
  },
}));

export default function App() {
  const [favourites, setFavourites] = useState([]);
  const [width, setWidth] = useState(0);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  const isMobile = width <= 600;

  async function refreshFavourite() {
    const response = await fetch('/api/favouriteAPI')
    const data = await response.json()
    console.log(data)
    setFavourites(data);
  }

  return (
    <div>
    {isMobile === true ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <FavoriteSection>
          <Favourites favourites={favourites}/>
        </FavoriteSection>
        <ResultSection>
          <SearchResults refreshFavourite={refreshFavourite}/>
        </ResultSection>
      </div>
    ):(
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <FavoriteSection>
          <Favourites favourites={favourites}/>
        </FavoriteSection>
        <ResultSection>
        <SearchResults refreshFavourite={refreshFavourite}/>
        </ResultSection>
      </div>
    )}
    </div>
  );
}