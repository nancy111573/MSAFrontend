import Head from 'next/head'
import Favourites from './Favourites';
import React from 'react';
import axios from "axios";

import { Card, CardContent, CardActionArea, CardActions, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function App() {
  const [emojiName, setEmojiName] = useState("");
  const [emojiInfo, setEmojiInfo] = useState(undefined);
  const THE_URL = "https://emoji-api.com/emojis";
  const KEY = "access_key=60b62bd7e987589ab31bcb2fd6aec6f5efb45204";
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
      {favourites.length === 0 ? (
        <div>
          <p>No emoji in saved yet</p>
        </div>
      ) : (
        <div style={{alignItesm: 'center'}}>
          <Favourites favourites={favourites}/>
        </div>
      )}

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
          {emojiInfo.map((emoji) =>
            <Card
              sx={{ 
                width: 600, 
                display: 'flex', 
                flexDirection: 'row', 
                padding: 3, 
                margin: 5, 
                backgroundColor: 'mintcream' 
              }}
            > 
              <CardActionArea style={{pointerEvents: 'none'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h5">
                    {capitalizeFirst(emoji.unicodeName.toString())}
                  </Typography>
                  <br />
                  <Typography variant="subtitle1" color="text.secondary">
                    Category: {emoji.group.toString()} 
                    <br />
                    Sub-category: {emoji.subGroup.toString()}
                  </Typography>
                </CardContent>
                </CardActionArea>
                <CardActionArea style={{pointerEvents: 'none'}}>
                <CardContent>
                  <Typography variant="h1">
                      {emoji.character.toString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{marginTop: 0}}>
                <Button size="small" color="primary" onClick={() => addToFavourites(emoji)}>
                  Share
                </Button>
              </CardActions>
            </Card>
          )}
        </div>
      )}
    </div>
  );

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function addToFavourites(emoji) {
    setFavourites((prev) => [...prev, emoji]);
    console.log(favourites)
  }

  function search() {
    if (emojiName !== undefined && emojiName !== "") {
      (axios.get(THE_URL + "?search=" + getInput() + "&" + KEY).then((res) => {
        setEmojiInfo(res.data);
      })
      .catch(() => {
        setEmojiInfo(undefined);
      }))
    } else {setEmojiInfo(undefined);}
  }
  // reformat input for searching
  function getInput() {
    let temp = emojiName.toLowerCase();
    temp = temp.replace(" ", "-"); 
    setEmojiName(temp)
    return temp
  }
}