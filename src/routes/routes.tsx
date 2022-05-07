import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PetList } from "../components/petsList.component";

export const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PetList />} />
      </Routes>
    </BrowserRouter>
  );
};
