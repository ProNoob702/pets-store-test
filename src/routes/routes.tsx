import { BrowserRouter, Route } from "react-router-dom";
import { PetList } from "../components/petsList.component";

export const Routes: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Route path="/" element={<PetList />} />
    </BrowserRouter>
  );
};
