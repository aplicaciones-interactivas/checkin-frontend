import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
      minHeight: 280,
      minWidth: 300,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
      marginTop: '30',
    }
  });
  
  export default function ImgMediaCard({hotel, handleOpen}) {
    const classes = useStyles();
  
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Hotel"
            src={require("../images/descarga.jpg")}
            title="Hotel"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {hotel.nombre}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Reservar
          </Button>
          <Button size="small" color="primary">
            Más Info
          </Button>
        </CardActions>
      </Card>
    );
  }