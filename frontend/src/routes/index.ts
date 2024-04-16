import App from '../app/App';
import RegisterForm from '../components/Register';
import Login from '../components/Login';

export const webRoutes: WebRoute[] = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/register',
    component: RegisterForm,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*',
    component: Login,
  },
];
