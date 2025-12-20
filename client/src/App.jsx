import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Register from './pages/Register.jsx';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard.jsx';
import CreateTask from './pages/CreateTask.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>
        }
        />
        <Route path='/CreateTask'
        element={
          <ProtectedRoute>
              <CreateTask/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
