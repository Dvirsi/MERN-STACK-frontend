import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WatchedMoviesComp from "./WatchedMovies";
import { deleteMemberById } from "../../appReducer/memberSlice";
import {
  deleteAllSubsByMemberId,
  selectAllSubs,
} from "../../appReducer/subscriptionsSlice";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  Typography,
  Box,
  Popover,
} from "@mui/material";
import SubNewMovieComp from "./AddNewSub";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

const MemberComp = (props) => {
  const [member, setMember] = useState({});
  const [addNewMovie, setAddNewMovie] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMember(props.member);
  }, []);

  const subs = useSelector(selectAllSubs).filter(
    (sub) => sub.memberId?._id === member._id
  );

  const deleteMember = async () => {
    dispatch(deleteMemberById(member._id));
    dispatch(deleteAllSubsByMemberId(member._id));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const pupUpId = open ? "simple-popover" : undefined;

  const handleClickApproveDelete = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseApproveDelete = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 345,
        height: 450,
        ml: 3,
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{member.fullname}</Typography>
          <Typography variant="h6">{member.email}</Typography>
          <Typography variant="h6">{member.city}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => navigate(member._id)} sx={{ ml: 0.5 }}>
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
          <Typography sx={{ p: 2, color: "red" }}>
            Are you sure you want to delete this member?
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ ml: 1 }}
              onClick={deleteMember}
            >
              Delete
            </Button>
          </Typography>
        </Popover>
        <Button
          size="small"
          startIcon={<AddToQueueIcon />}
          onClick={() => setAddNewMovie(!addNewMovie)}
          sx={{ backgroundColor: addNewMovie ? "rgb(220,220,220)" : "", pl: 7 }}
        >
          Add Movie
        </Button>
      </CardActions>
      <CardContent>
        {addNewMovie && (
          <SubNewMovieComp
            memberId={member._id}
            closeSubNewMovie={() => setAddNewMovie(false)}
            sx={{ alignItems: "flex-end" }}
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {subs.length > 0 && (
            <Box sx={{ mr: 2 }}>
              <WatchedMoviesComp memberId={member._id} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberComp;
