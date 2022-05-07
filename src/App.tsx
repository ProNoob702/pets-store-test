import "./App.css";
import { AppLayout } from "./layout/layout";
import { AppRoutes } from "./routes/routes";

const App: React.FC<{}> = () => {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
};

export default App;
