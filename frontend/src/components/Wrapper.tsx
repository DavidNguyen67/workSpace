import { Provider } from 'react-redux';
import { store } from '../redux/stores/index.store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import { webRoutes } from '../routes';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../utilities/hooks/reduxHook';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { login } from '../redux/slices/user.slice';

export default function Wrapper() {
  const { userToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userToken) {
      const token = Cookies.get('token');
      if (token) {
        dispatch(login({ token }));
      }
    }
  }, [dispatch, userToken]);

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
        <Toaster />
      </Container>
    </BrowserRouter>
  );
}
