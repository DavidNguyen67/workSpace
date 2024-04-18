import { useCallback, useState } from 'react';
import { registerUser } from '../utilities/services/user.service';
import { Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setConfirmPassword(event.target?.value);
  };
  const handleRegisterUser = useCallback(async () => {
    if (confirmPassword !== user.password) {
      toast.error('Mật khẩu không trùng nhau');
      return;
    }
    setIsLoading(true);
    try {
      await registerUser(user);
    } catch (error: any) {}
    setIsLoading(false);
  }, [confirmPassword, user]);

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-4 m-auto mt-4">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label text-white"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={user?.name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-white"
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
            className="form-label text-white "
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
        <div className="mb-3">
          <label
            htmlFor="reEnterPassword"
            className="form-label text-white "
          >
            Re Enter Password
          </label>
          <input
            type="password"
            className="form-control"
            id="reEnterPassword"
            value={confirmPassword}
            onChange={handleChangeInput}
          />
        </div>
        <button
          className="btn btn-primary col-12 col-md-6 m-auto"
          onClick={handleRegisterUser}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner
              animation="border"
              size="sm"
              variant="light"
            />
          ) : (
            'Register'
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
