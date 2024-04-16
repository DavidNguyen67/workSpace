import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import { webRoutes } from '../routes';
import { Toaster } from 'react-hot-toast';

export default function Wrapper() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          {webRoutes.map((item, index) => (
            <Route
              path={item.path}
              key={index}
              element={<item.component />}
            />
          ))}
        </Routes>
        <Toaster position="top-right" />
      </Container>
    </BrowserRouter>
  );
}
