import { useEffect, useState } from "react";
import WatchedSubComp from "./WatchedSub";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Popover,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { deletMovie, editMovieId } from "../../appReducer/movieSlice";
import {
  deleteAllSubsByMovieId,
  selectAllSubs,
} from "../../appReducer/subscriptionsSlice";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function MovieComp(props) {
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setMovie(props.movie);
  }, []);

  const subs = useSelector(selectAllSubs).filter(
    (sub) => sub.movieId._id === movie._id
  );

  const deleteMovie = () => {
    dispatch(deletMovie(movie._id));
    dispatch(deleteAllSubsByMovieId(movie._id));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickApproveDelete = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseApproveDelete = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pupUpId = open ? "simple-popover" : undefined;

  return (
    <Card sx={{ width: "350px", p: 2 }}>
      <CardActionArea>
        <Box sx={{ display: "flex" }}>
          <Box
            className="image"
            sx={{ width: "160px", height: "220px", objectFit: "cover" }}
          >
            <CardMedia
              sx={{}}
              height="100%"
              component="img"
              image={movie.image}
              alt={movie.name}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              ml: 2,
              width: "50%",
            }}
          >
            <h3>{movie.name}</h3> <br />
            <h4>{movie.premieredYear}</h4> <br />
            {movie.genres?.map((genre, index) => {
              return (
                <Breadcrumbs
                  key={index}
                  aria-label="breadcrumb"
                  sx={{ mb: 0.5 }}
                >
                  <StyledBreadcrumb component="a" href="#" label={genre} />
                </Breadcrumbs>
              );
            })}
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {subs.length > 0 && <WatchedSubComp movieId={movie._id} />}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => dispatch(editMovieId(movie._id))} size="small">
          Edit
        </Button>
        <Button size="small" color="error" onClick={handleClickApproveDelete}>
          Delete
        </Button>
        <Popover
          id={pupUpId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseApproveDelete}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 1.5, color: "red" }}>
            Are you sure you want to delete this movie?
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ ml: 1 }}
              onClick={deleteMovie}
            >
              Delete
            </Button>
          </Typography>
        </Popover>
      </CardActions>
    </Card>
  );
}

export default MovieComp;
