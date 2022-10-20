import MemberComp from "./Member";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { selectAllMembers, memberToSearch } from "../../appReducer/memberSlice";
import SubsNavbarComp from "./SubNavbar";

function AllSubsComp() {
  const members = useSelector(selectAllMembers);
  const searchTerms = useSelector(memberToSearch);

  return (
    <div>
      <br />
      <SubsNavbarComp />
      <Grid
        container
        columnSpacing={6}
        rowSpacing={6}
        sx={{ maxWidth: "90%", mx: "auto" }}
      >
        {members
          .filter((member) => {
            if (searchTerms === "" || searchTerms === undefined) {
              return member;
            } else if (member.fullname.toLowerCase().includes(searchTerms)) {
              return member;
            }
          })
          .map((member) => {
            return (
              <Grid xs={12} sm={6} md={4} key={member?._id}>
                <MemberComp member={member} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default AllSubsComp;
