import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addMemberFieldRequiered,
  searchMember,
} from "../../appReducer/memberSlice";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SubsNavbarComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serachInput, setSerachInput] = useState("");

  const SetSearchMovie = (e) => {
    setSerachInput(e.target.value);
    dispatch(searchMember(e.target.value));
  };

  const clearInput = () => {
    setSerachInput("");
    dispatch(searchMember(""));
  };

  const addMember = () => {
    dispatch(addMemberFieldRequiered());
    navigate("addMember");
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ background: "none", color: "black", boxShadow: "none" }}
      >
        <Toolbar>
          <MenuItem onClick={clearInput}>
            <Typography textAlign="center">Clear search</Typography>
          </MenuItem>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={SetSearchMovie}
              value={serachInput}
              placeholder="Search member…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <MenuItem onClick={addMember}>
            <Typography textAlign="center">Add Member</Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SubsNavbarComp;
