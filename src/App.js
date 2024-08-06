import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';
import Login from './components/Login';
import Register from './components/Register';
import Calculator from './components/Calculator';
import Records from './components/Records';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Calculator App
          </Typography>
          {isAuthenticated ? (
            <>
              <Button color="inherit" href="/calculator">Calculator</Button>
              <Button color="inherit" href="/records">Records</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calculator" element={<PrivateRoute component={Calculator} />} />
          <Route path="/records" element={<PrivateRoute component={Records} />} />
          <Route path="*" element={<Navigate to="/calculator" />} />
        </Routes>
      </Container>
    </Router>
  );
}

function PrivateRoute({ component: Component }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default App;