import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMember, selectMemberError } from "../../appReducer/memberSlice";

function AddMemberComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newMember, setNewMember] = useState({
    fullname: "",
    email: "",
    city: "",
  });
  const [showError, setShowError] = useState(false);
  const addMemberError = useSelector(selectMemberError);

  const saveNewMember = async () => {
    await dispatch(addMember(newMember))
      .unwrap()
      .catch(() => setShowError(true));
  };

  useEffect(() => {
    if (addMemberError === "") {
      navigate("/subscriptions");
    }
  }, [addMemberError]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 400,
          width: 400,
        }}
      >
        <Box sx={{ alignSelf: "center", mt: 2 }}>
          <h2>New Member</h2>
        </Box>
        <br />
        {showError && (
          <p style={{ marginLeft: "12px", color: "red" }}>{addMemberError}</p>
        )}

        <Box
          className="addMovieForm"
          style={{ marginLeft: "10px", marginTop: "5px", width: "50%" }}
        >
          <FormControl
            sx={{ width: "25ch", mt: "" }}
            onChange={(e) =>
              setNewMember({ ...newMember, fullname: e.target.value })
            }
          >
            <TextField
              id="standard-basic"
              label="Full Name"
              variant="standard"
            />
          </FormControl>
          <br />
          <br />
          <FormControl
            sx={{ width: "25ch" }}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          >
            <TextField id="standard-basic" label="Email" variant="standard" />
          </FormControl>
          <br />
          <br />
          <FormControl
            sx={{ width: "25ch" }}
            onChange={(e) =>
              setNewMember({ ...newMember, city: e.target.value })
            }
          >
            <TextField id="standard-basic" label="City" variant="standard" />
          </FormControl>
          <br /> <br /><br /><br />
          <Box sx={{ display: "flex", justifyContent: "center", ml: 22 }}>
            <Button size="medium" variant="contained" onClick={saveNewMember}>
              Save
            </Button>
            <Button
              variant="outlined"
              size="medium"
              sx={{ ml: 2 }}
              onClick={() => navigate("/subscriptions")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddMemberComp;
