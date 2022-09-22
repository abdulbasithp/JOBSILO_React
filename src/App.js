import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PageNotFound from './components/common/PageNotFound';
import CommonPage from './components/common/CommonPage';
import NavBar from './components/common/NavBar';
import Login from './components/common/Login';
import Register from './components/common/Register';
import 'react-toastify/dist/ReactToastify.css';
import SeekerHome from './components/seeker/SeekerHome';
import RecruiterLayout from './components/recruiter/RecruiterLayout';
import { ToastContainer } from 'react-toastify';
import SheduleLayout from './components/recruiter/SheduleLayout';


function App() {


  return (
    <>

      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            {/* public routes */}
            <Route path='/' element={<CommonPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* protercted routes */}
            <Route path='seeker'>
              <Route path='home' element={<SeekerHome />} />
            </Route>

            <Route path='recruiter'  >
              <Route path='home' element={<RecruiterLayout />} >
                {/* <Route path=':id' element={<JobDetail />} /> */}
              </Route>
              <Route path='shedules' element={<SheduleLayout />}/>
            </Route>

            {/* not found route */}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;