import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMemberById } from "../../appReducer/memberSlice";
import PersonIcon from "@mui/icons-material/Person";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";

const WatchedSubComp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState("");

  useEffect(() => {
    setMovieId(props.movieId);
  }, [props]);

  const subs = useSelector((state) => state.subs.subs).filter(
    (sub) => sub.movieId?._id === movieId
  );

  const moveToMemberPage = (id) => {
    dispatch(searchMemberById(id));
    navigate("/subscriptions");
  };

  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Member subscriptions
      </Typography>

      <Box
        sx={{
          width: "100%",
          width: 360,
          height: 100,
          bgcolor: "background.paper",
        }}
      >
        <List>
          {Array.isArray(subs)
            ? subs.map((sub) => {
                return (
                  <ListItem
                    key={sub._id}
                    sx={{ height: 7, mb: 2.5, mt: 1, pl: 0 }}
                  >
                    <ListItemButton
                      onClick={() => moveToMemberPage(sub.memberId._id)}
                    >
                      <ListItemText>
                        <ListItemIcon>
                          <PersonIcon sx={{ mr: 1.5 }} />
                          <p style={{ marginTop: 3 }}>
                            {sub.memberId?.fullname +
                              " " +
                              sub.date.slice(0, 10)}
                          </p>
                        </ListItemIcon>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })
            : null}
        </List>
      </Box>
    </Box>
  );
};

export default WatchedSubComp;
