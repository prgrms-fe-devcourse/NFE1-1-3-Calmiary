import HomeLayout from '../components/HomeLayout';
import HomeLogo from '../components/HomeLogo';
import LoginForm from '../components/LoginForm';

interface LoginData {
  username: string;
  password: string;
}

const HomeMainPage: React.FC = () => {
  const handleSubmit = (loginData: LoginData) => {
    if (loginData.username && loginData.password) {
      //Query 들어갈 부분
    }
  };

  return (
    <HomeLayout>
      <HomeLogo />
      <LoginForm onSubmit={handleSubmit} />
    </HomeLayout>
  );
};

export default HomeMainPage;
