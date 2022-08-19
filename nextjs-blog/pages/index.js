import Head from 'next/head'

import React from 'react';
import axios from "axios";

import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

function App() {
  const [emojiName, setEmojiName] = useState("");
  const [emojiInfo, setEmojiInfo] = useState(undefined);
  const THE_URL = "https://emoji-api.com/emojis";
  const KEY = "access_key=60b62bd7e987589ab31bcb2fd6aec6f5efb45204";

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      {/* search bar */}
      <h1>
        Emoji Search
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
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5">
                  {emoji.unicodeName.toString()}
                </Typography>
                <br />
                <Typography variant="subtitle1" color="text.secondary">
                  Category: {emoji.group.toString()} 
                  <br />
                  Sub-category: {emoji.subGroup.toString()}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h1">
                    {emoji.character.toString()}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );

  function search(){
    if (emojiName !== undefined && emojiName !== "") {
      (axios.get(THE_URL + "?search=" + getInput() + "&" + KEY).then((res) => {
        setEmojiInfo(res.data);
        console.log(res.data);
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

export default App;