import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import useApplicationData from './hooks/useApplicationData';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ImageLoadTest from './components/ImageLoadTest';
import LibraryForm from './components/LibraryForm';
import LibraryPage from './pages/LibraryPage';
import UserPage from './pages/UserPage';
import ScrollToTop from "./ScrollToTop";

export default function App() {
  console.log("TEST ENV", process.env.TEST);
  console.log("REACT_APP TEST ENV", process.env.REACT_APP_TEST);
  return (<div className="App" >
    <BrowserRouter>
      <ScrollToTop/>
      <TopNav />
      <Routes>
        <Route path ="/" element={<HomePage />}/>
        <Route path ="/signup" element={<SignUp />}/>
        <Route path ="/login" element={<Login />}/>
        <Route path ="/upload" element={<ImageLoadTest />}/>
        <Route path ="/libraryForm" element={<LibraryForm />}/>
        <Route path ="/library/:id" element={<LibraryPage />}/>
        <Route path ="/aboutus" element={<AboutUs />}/>
        <Route path ="/userpage" element={<UserPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </div >
  );
}
