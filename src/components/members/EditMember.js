import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editMember, editMemberUI } from "../../appReducer/memberSlice";

function EditMemberComp() {
  const [member, setMember] = useState({
    _id: "",
    fullname: "",
    email: "",
    city: "",
  });
  const navigate = useNavigate();
  const { memberId } = useParams();
  const dispatch = useDispatch();

  const memberToEdit = useSelector((state) => state.members.members).find(
    (x) => x._id === memberId
  );

  useEffect(() => {
    if (memberToEdit) {
      setMember({ ...memberToEdit });
    }
  }, [memberToEdit]);

  const saveChanges = async () => {
    dispatch(editMember(member));
    dispatch(editMemberUI(member));
    navigate("/subscriptions");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{ flexDirection: "column", height: 400, width: 400 }}
        >
          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <h2>Edit Member</h2>
          </Box>
          <br />
          <div
            className="addMovieForm"
            style={{ marginLeft: "10px", marginTop: "5px", width: "50%" }}
          >
            <FormControl
              sx={{ width: "25ch", mt: "" }}
              onChange={(e) =>
                setMember({ ...member, fullname: e.target.value })
              }
            >
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                value={member.fullname}
              />
            </FormControl>
            <br />
            <FormControl
              sx={{ width: "25ch" }}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
            >
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                value={member.email}
              />
            </FormControl>
            <br />
            <FormControl
              sx={{ width: "25ch" }}
              onChange={(e) => setMember({ ...member, city: e.target.value })}
            >
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                value={member.city}
              />
            </FormControl>
            <br />
            <br />
            <Button size="medium" variant="contained" onClick={saveChanges}>
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
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default EditMemberComp;
