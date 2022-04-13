import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import useApplicationData from './hooks/useApplicationData';
import HomePage from './pages/HomePage';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ImageLoadTest from './components/ImageLoadTest';
import LibraryForm from './components/LibraryForm';
import LibraryPage from './pages/LibraryPage';

export default function App() {

  return (<div className="App" >
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path ="/" element={<HomePage />}/>
        <Route path ="/signup" element={<SignUp />}/>
        <Route path ="/login" element={<Login />}/>
        <Route path ="/upload" element={<ImageLoadTest />}/>
        <Route path ="/libraryForm" element={<LibraryForm />}/>
        <Route path ="/library/:id" element={<LibraryPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </div >
  );
}
