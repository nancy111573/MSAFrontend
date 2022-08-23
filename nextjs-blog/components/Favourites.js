import { Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';

export default function Favourites(props) {
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
      >
        {props.favourites.map((emoji) =>
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
            </CardContent>
          </Card>
        )}
      </Grid>
    )
    
}