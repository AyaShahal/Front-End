
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Component/Header/header'
import { Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="" element={<Home />} />
        <Route path="/404/*" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    </div>
  );
}

export default App;
