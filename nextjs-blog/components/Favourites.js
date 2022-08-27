import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Card, Grow, CardContent, Typography, Button, Grid, TextField } from '@mui/material';

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Root = styled('div')(({ theme }) => ({
  maxWidth: 155, 
  textAlign: "center",
  justifyContent: 'center',
  alignItems: 'center',
  margin: 7,
  [theme.breakpoints.up('sm')]: {
    margin: 20,
    minWidth:190, 
  },
}));

export default function Favourites(props) {
    const [checked, setChecked] = React.useState(true);
    const [favourites, setFavourites] = useState(props.favourites);
    const [updated, setUpdated] = useState(false);

    React.useEffect(() => {
        setFavourites(props.favourites);
    }, [props.favourites])

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
    const deleteBook = async emojiName => {
      const response = await fetch(`/api/favouriteAPI/${emojiName}`, {
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
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        {/* <Button onClick={refreshFavourite} style={{alignself:"flex-end"}}>
          Refresh
        </Button> */}
      {favourites.length === 0 ? (
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
        >
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
          </Grow>
      ) : (
        <div style={{alignItesm: 'center'}}>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
        >
          {favourites.map((emoji) =>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
          >
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
                <Button size="small" color="primary" onClick={() => deleteBook(emoji.name)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
            </Root>
            </Grow>
          )}
        </Grid>
        </div>
      )}
      </div>
      
    )
    
}