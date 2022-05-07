import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppLayout } from "./layout/layout";
import { AppRoutes } from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC<{}> = () => {
  return (
    <AppLayout>
      <AppRoutes />
      <ToastContainer />
    </AppLayout>
  );
};

export default App;
