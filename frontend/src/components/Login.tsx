import { useCallback, useState } from 'react';
import { loginUser } from '../utilities/services/user.service';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../utilities/hooks/reduxHook';
import { login } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (event: any) => {
    if (event.nativeEvent?.data === ' ') {
      toast.error('Do not have space in here');
      return;
    }

    if (event.target?.name) {
      setUser((user) => ({
        ...user,
        [event.target?.name]: event.target?.value,
      }));
      return;
    }
  };
  const handleLoginUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await loginUser(user);
      if (token && typeof token === 'string') {
        dispatch(login({ token }));
        navigate('/');
      }
    } catch (error: any) {}
    setIsLoading(false);
  }, [dispatch, navigate, user]);

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-4 m-auto mt-4">
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user?.email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user?.password}
            onChange={handleChangeInput}
          />
        </div>
        <button
          className="btn btn-primary col-12 col-md-6 m-auto"
          onClick={handleLoginUser}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner
              animation="border"
              size="sm"
              color="white"
            />
          ) : (
            'Login'
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
