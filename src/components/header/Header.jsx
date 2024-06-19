import React, { useContext, useState } from 'react'; // Добавлен useState
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCurrentCategory } from '../../store/reducers/uiSlice';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite'; // Добавлен import observer
import './header.css';
import { useNavigate } from 'react-router-dom'; 
import {REGISTRATION_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE} from '../../utils/consts';

import userImg from './../../main_menu/header/user.png';
import lickedImg from './../../main_menu/header/liked.png';
import bagImg from './../../main_menu/header/bag.png';

const Header = observer(() => { // Обернуто в observer


  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [activeButton, setActiveButton] = useState(null);

  
  const categories = useSelector(state => state.rootReducer.uiSlice.categories);
  const dispatch = useDispatch();
  
  const handleClick = (el) => {
      setActiveButton(el.id);
      dispatch(changeCurrentCategory(el.id));
  };

  const handleLogout = () => {
      user.setIsAuth(false);
      user.setUser({});
      navigate(LOGIN_ROUTE);
  };

  return (
      <header className="header">
          <div className="container_hed">
              <div className="header_row">
                  <div className="header_logo">
                      <Link to={SHOP_ROUTE} className="logo-link">
                          <span>Logo</span>
                      </Link>
                  </div>
                  <div className="header_nav">
                      <ul>
                          {categories.map(el => (
                              <li key={el.id}>
                                  <button
                                      className={`bt ${activeButton === el.id ? 'active' : ''}`}
                                      onClick={() => handleClick(el)}
                                  >
                                      {el.text}
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="header_user">
                      <div className="input-wrapper">
                          <input className="input" type="text" placeholder="Поиск"></input>
                          <svg viewBox="0 0 24 24"></svg>
                      </div>
                      {!user.isAuth ? (
                          <div>
                              <button className="bt" onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</button>
                          </div>
                      ) : (
                          <div>
                              <button className="bt" onClick={() => navigate(ADMIN_ROUTE)}>Админ</button>
                              <button className="bt" onClick={handleLogout}>Выйти</button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </header>
  );
});

export default Header;