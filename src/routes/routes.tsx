import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NewPetComponent } from "../components/newPet/newPet.component";
import { PetList } from "../components/petsList/petsList.component";

export const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/newPet" element={<NewPetComponent />} />
      </Routes>
    </BrowserRouter>
  );
};
