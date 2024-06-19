import React, { useState, useContext, useEffect} from 'react';
import Footer from './components/Footer/Footer';
import ImageGallery from './components/current/Current';
import Banerswaper from './components/banerswaper/Banerswaper';
import Header from './components/header/Header';
import Promo from './components/promo/Promo';
import Subtitle from './components/subtitle/Subtitle';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './components/http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer (() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
        try {
            const data = await check();
            user.setUser(data);
            user.setIsAuth(true);
        } catch (error) {
            console.error('Failed to verify user:', error);
            user.setIsAuth(false);
        } finally {
            setLoading(false);
        }
    };

    setTimeout(() => {
        verifyUser();
    });
}, []);

if (loading) {
    return <Spinner animation={"grow"} />;
}

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;