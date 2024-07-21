import { BrowserRouter,Routes, Route } from "react-router-dom";
import Providers from './providers-main/Providers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Providers></Providers>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
