import Head from 'next/head'
import Favourites from '../components/Favourites';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Card, Grid, CardContent, CardActionArea, CardActions, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

const media = {
  desktop: `@media(min-width: 1000px)`
}

const Root = styled('div')(({ theme }) => ({ 
  textAlign: "center",
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
  [theme.breakpoints.up('sm')]: {
    width: "100%"
  }
}));

export default function App() {
  const [emojiName, setEmojiName] = useState("");
  const [emojiInfo, setEmojiInfo] = useState(undefined);
  const [favourites, setFavourites] = useState([]);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
      {/* emojis list */}
      <h1>
        My Favourite Emojis
      </h1>
      <Favourites favourites={favourites}/>

      {/* search bar */}
      <h1>
        Add New Emojis
      </h1> 
      <TextField
        style={{ minWidth: "60%" }}
        placeholder="Search an emoji"
        inputProps={{style: { textAlign: 'center', padding: 10 }}}
        onChange = {e => setEmojiName(e.target.value)}
        variant="filled"
      />
      <Button onClick={ search }>
        Search
      </Button>

      {/* search results */}
      {emojiInfo === undefined || emojiInfo === null ? (
        <div>
          {emojiInfo === undefined ? (
            <p>Try type in a key word</p>
          ) : (
            <p>Emoji not found</p>
          )}
        </div>
      ) : (
        <div id="emoji-result">
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
          >
          {emojiInfo.map((emoji) =>
            <Card
              className = 'card'
              sx={{ 
                width: "100%", 
                flexDirection: 'row', 
                padding: 0, 
                margin: 5, 
                backgroundColor: 'lightcyan' 
              }}
            > 
            <Root>
              <CardActionArea style={{pointerEvents: 'none'}}>
                <CardContent>
                  <Typography variant="h5">
                    {capitalizeFirst(emoji.name)}
                  </Typography>
                  <br />
                  <Typography variant="subtitle1" color="text.secondary">
                    Unicode: U+{emoji.unicode} 
                  </Typography>
                </CardContent>
                </CardActionArea>
                <CardActionArea style={{pointerEvents: 'none'}}>
                <CardContent>
                  <Typography variant="h1">
                      {emoji.character}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => addToFavourites(emoji)}>
                  + Favourites
                </Button>
              </CardActions>
              </Root>
            </Card>
          )}
          </Grid>
        </div>
      )}
    </div>
  );

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function refreshFavourite() {
    const response = await fetch('/api/favouriteAPI')
    const data = await response.json()
    console.log(data)
    setFavourites(data);
  }

  function addToFavourites(emoji) {
    submitEmoji(emoji.name, emoji.unicode, emoji.character);
    refreshFavourite();
    // setFavourites((prev) => [...prev, emoji]);
  }

  function search() {
    getEmoji(getInput());
  }

  async function getEmoji(searchfor) {
    if (searchfor !== "") {
      const response = await fetch('/api/databaseAPI')
      const data = await response.json()
      console.log(data)
      const result = data.filter(emoji => emoji.name.includes(searchfor));
      setEmojiInfo(result)
    }
  }


  async function submitEmoji(name, unicode, character) {
    const response = await fetch('/api/favouriteAPI', {
      method: 'POST',
      body: JSON.stringify({
        name,
        unicode,
        character
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  // reformat input for searching
  function getInput() {
    let temp = emojiName.toLowerCase();
    temp = temp.replace(" ", "-"); 
    setEmojiName(temp)
    return temp
  }
}