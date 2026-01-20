import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import SharedExpenses from './pages/SharedExpenses';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/add-expense" element={
                    <PrivateRoute>
                        <AddExpense />
                    </PrivateRoute>
                } />
                <Route path="/shared" element={
                    <PrivateRoute>
                        <SharedExpenses />
                    </PrivateRoute>
                } />
                <Route path="/categories" element={
                    <PrivateRoute>
                        <Categories />
                    </PrivateRoute>
                } />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
