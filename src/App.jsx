
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import A2oJ from "./pages/A2oj_page";
import Rating_Ladder from "./pages/rating_wise";
import Division_Ladder from "./pages/division_wise";
import CP31 from "./pages/cp31_page";
import CP31_ladder from "./pages/cp31_ladder";
import CoursePage from "./pages/course_page";
import UpcomingContestsPage from "./pages/upcoming_contest";
import Cp_Sheets from "./pages/cp_sheets";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursePage />} />
        <Route path="/Upcoming_contests" element={<UpcomingContestsPage/>} />
        <Route path="/Cp_Sheets" element={<Cp_Sheets/>} />
        <Route path="/A2oj" element={<A2oJ/>} />
        <Route path="/Rating_ladder" element={<Rating_Ladder/>} />
        <Route path="/Division_ladder" element={<Division_Ladder/>} />
        <Route path="/CP31" element={<CP31/>} />
        <Route path="/CP31_ladder" element={<CP31_ladder/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
