import { Button } from "antd";
import "./App.css";

import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import AppRouter from "./routing/AppRouter";

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={esES}
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;
