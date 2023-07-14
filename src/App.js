import { RecoilRoot } from "recoil";
import Routers from "./router/Routers";


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routers />
      </div>
    </RecoilRoot>
  );
}

export default App;
