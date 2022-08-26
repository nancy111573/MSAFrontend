import * as React from 'react';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Card, Grow, CardContent, Typography, Button, Grid, TextField } from '@mui/material';

const deleteBook = async emojiName => {
  const response = await fetch(`/api/favouriteAPI/${emojiName}`, {
    method: 'DELETE'
  })
  const data = await response.text()
  console.log(data)
}

export default function Favourites() {
    const [checked, setChecked] = React.useState(true);
    const [favourites, setFavourites] = useState([]);

    async function refreshFavourite() {
      const response = await fetch('/api/favouriteAPI')
      const data = await response.json()
      console.log(data)
      setFavourites(data);
    }

    return (
      <div>
        <Button onClick={refreshFavourite} style={{alignself:"flex-end"}}>
          Refresh
        </Button>
      {favourites.length === 0 ? (
        <div>
          <p>Nothing in your favourites yet, start by searching for one below.</p>
        </div>
      ) : (
        <div style={{alignItesm: 'center'}}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
        >
          {favourites.map((emoji) =>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
          >
          <Card
              sx={{ 
                maxWidth: 200, 
                padding: 3, 
                margin: 5, 
                backgroundColor: 'mintcream',
                textAlign: "center"
              }}
            > 
              <CardContent>
                <Typography variant="h1">
                    {emoji.character}
                </Typography>
                <Typography variant="h5">
                  {emoji.name}
                </Typography>
                <Button size="small" color="primary" onClick={() => deleteBook(emoji.name)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
            </Grow>
          )}
        </Grid>
        </div>
      )}
      </div>
      
    )
    
}