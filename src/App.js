import { Route, Routes } from "react-router-dom";
import LoginComp from "./components/Login/Login";
import RegisterComp from "./components/Login/Register";
import MainComp from "./components/Main";
import AllMoviesComp from "./components/movies/AllMovies";
import AddMovieComp from "./components/movies/AddMovie";
import SubscriptionsComp from "./components/members/SubscriptionsMain";
import AddMemberComp from "./components/members/AddMember";
import AllSubsComp from "./components/members/AllMembers";
import EditMemberComp from "./components/members/EditMember";

function App() {
  return (
    <div>
      <Routes>
        <Route path="register" element={<RegisterComp />} />
        <Route path="login" element={<LoginComp />} />
        <Route path="" element={<MainComp />}>
          <Route path="" element={<AllMoviesComp />} />
          <Route path="addMovie" element={<AddMovieComp />} />
          <Route path="subscriptions" element={<SubscriptionsComp />}>
            <Route path="" element={<AllSubsComp />} />
            <Route path="addMember" element={<AddMemberComp />} />
            <Route path=":memberId" element={<EditMemberComp />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
