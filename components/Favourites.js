import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Card, Slide, Grow, CardContent, Typography, Button, Grid, TextField } from '@mui/material';

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Root = styled('div')(({ theme }) => ({
  minWidth:150, 
  textAlign: "center",
  justifyContent: 'center',
  alignItems: 'center',
  margin: 7,
  [theme.breakpoints.up('md')]: {
    margin: 20,
  },
}));

export default function Favourites(props) {
    const [checked, setChecked] = React.useState(true);
    const [favourites, setFavourites] = useState(props.favourites);
    const [updated, setUpdated] = useState(false);
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

    React.useEffect(() => {
        setFavourites(props.favourites);
    }, [props.favourites])

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
    const deleteEmoji = async emojiCode => {
      const response = await fetch(`/api/favouriteAPI/${emojiCode}`, {
        method: 'DELETE'
      })
      const data = await response.text()
      console.log(data)
      refreshFavourite();
      setUpdated(true);
    }
    async function refreshFavourite() {
      const response = await fetch('/api/favouriteAPI')
      const data = await response.json()
      console.log(data)
      setFavourites(data);
    }

    return (      
      <div>
        {/* emojis list */}
        <h1>
          My Favourite Emojis
        </h1>
        {isMobile === true ? (
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
          />
        ) : (
          null
        )}
      {favourites.length === 0 ? (
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <Root>
        <Card
            sx = {{  backgroundColor: 'lightcyan' }}
          > 
            <CardContent>
              <Typography variant="h1">
                ❓
              </Typography>
              <Typography variant="p">
                Search for something to add here
              </Typography>
            </CardContent>
          </Card>
          </Root>
          </Slide>
      ) : (
        <div style={{alignItesm: 'center'}}>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
        >
          {favourites.map((emoji) =>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Root>
          <Card
              sx = {{  backgroundColor: 'lightcyan' }}
            > 
              <CardContent>
                <Typography variant="h1">
                    {emoji.character}
                </Typography>
                <Typography variant="h6">
                  {capitalizeFirst(emoji.name)}
                </Typography>
                <Button size="small" color="primary" onClick={() => deleteEmoji(emoji.unicode)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
            </Root>
            </Slide>
          )}
        </Grid>
        </div>
      )}
      </div>
      
    )
    
}