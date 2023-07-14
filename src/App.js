import Routers from "./router/Routers";
import MUiTest from "./materialUi_test/mUi";
import Paperbase from "./mUi_paperBase/Paperbase";
function getRandomColor(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
function App() {//<div><Paperbase/></div>
  return (
    <div className="App">
        <div>
          <Routers/>
        </div> 
        
        
    </div>
  );
}

export default App;
