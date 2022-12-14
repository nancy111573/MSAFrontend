import Head from 'next/head'
import Favourites from '../components/Favourites';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Card, Grid, CardContent, CardActionArea, CardActions, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

const Root = styled('div')(({ theme }) => ({ 
    width: "100%", 
    flexDirection: 'row', 
    margin: 15, 
    backgroundColor: 'lightcyan',
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    [theme.breakpoints.up('sm')]: {
      padding: 5,
      width: "80%",
      margin: 20,
    }
  }));

export default function SearchResults(props) {
    const [emojiName, setEmojiName] = useState("");
    const [emojiInfo, setEmojiInfo] = useState(undefined);
    const { refreshFavourite } = props

    async function getEmoji(searchfor) {
        if (searchfor !== "") {
          const response = await fetch('/api/databaseAPI')
          const data = await response.json()
          const result = data.filter(emoji => emoji.name.includes(searchfor));
          console.log(result)
          setEmojiInfo(result)
        }
      }
    
      // reformat input for searching
      function getInput() {
        let temp = emojiName.toLowerCase();
        temp = temp.replace(" ", "-"); 
        setEmojiName(temp)
        return temp
      }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

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
    
      function addToFavourites(emoji) {
        submitEmoji(emoji.name, emoji.unicode, emoji.character);
        refreshFavourite();
      }
    
      function search() {
        getEmoji(getInput());
      }
    return (
        <div>
        {/* search bar */}
        <h1>
            Add New Emojis
        </h1>
        <TextField
            style={{ minWidth: "90%" }}
            placeholder="Search an emoji"
            inputProps={{style: { textAlign: 'center', padding: 10 }}}
            onChange = {e => setEmojiName(e.target.value)}
            variant="filled"
        />
        <Button onClick={ search }>
            Search
        </Button>

        {/* search results */}
        {emojiInfo === undefined || emojiInfo.length === 0 ? (
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
            
                )}
                </Grid>
            </div>
            )}
            </div>
        )
}