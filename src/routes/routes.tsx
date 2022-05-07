import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditPetComponent } from "../components/editPet/editPet.component";
import { NewPetComponent } from "../components/newPet/newPet.component";
import { PetList } from "../components/petsList/petsList.component";

export const AppRoutes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/newPet" element={<NewPetComponent />} />
        <Route path="/edit/:petId" element={<EditPetComponent />} />
      </Routes>
    </BrowserRouter>
  );
};
