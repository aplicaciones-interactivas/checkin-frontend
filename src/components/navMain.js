import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    card: {
      minWidth: 310,
      height: 350,
      padding: 0,
      margin: 0,
    },
    media: {
      height: 250,
      maxHeight: 250,
      minWidth: 310,
    },
    content: {
      padding: 8,
    }
  });
  
  export default function ImgMediaCard({hotel, handleOpen}) {
    const classes = useStyles();
    const h = hotel;
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
          <CardContent className={classes.content}>
            <Typography variant="body2" color="textSecondary" component="p">
              {hotel.nombre} {hotel.estrellas}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Reservar
          </Button>
          <Button size="small" color="primary">
            <Link to={{
              pathname:"/InfoHotel",
              hotelInfo:h
                }}>Más info</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }