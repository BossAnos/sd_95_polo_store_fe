import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import { userAuthService } from '../../../services/user';
import { useNavigateLoginPage, useNavigateOrRedirectUrl } from '../../../hook';
import { useUserStore } from '../../store';
import { patchProductForm } from '../../store/action';
import { Form, Input } from 'antd';
import { color } from '@cloudinary/url-gen/qualifiers/background';
// http://themes.pixelstrap.com/multikart/front-end/furniture-2.html#
const Header = () => {

    const [useInfo, setUserInfo] = useState();
    const [navigateLogin] = useNavigateLoginPage();

    const [state, dispatch] = useUserStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (userAuthService.isLogin()) {
            const userInfo = userAuthService.getAuthInfo();
            setUserInfo(userInfo);
        }
    }, [])

    const logoutHandle = () => {
        userAuthService.logout();
        navigateLogin();
    }

    const searchProductHandle = (form) => {
        if (!form.name) {
            return;
        }
        dispatch(patchProductForm({
            name: form.name,
        }))
        navigate('/products/search/', {
            state: {
                name: form.name
            },
            search: '?name=' + form.name
        });
    }

    return <header>
        <div className="top-header top-header-dark2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="header-contact">
                            <ul>
                                <li>Welcome to Our store Men Wardrobe</li>
                                <li><i className="fa fa-phone" aria-hidden="true"></i>Call Us: 0968.86.83.86</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 text-end top-header-right">
                        <ul className="header-dropdown">
                            <li className="onhover-dropdown mobile-account">
                                {userAuthService.isLogin() &&
                                    <div className='userInfo'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        {/* {useInfo?.name} */}
                                        <ul className="onhover-show-div">
                                            <li>
                                                <Link to={'/account'}>
                                                    My Account
                                                </Link>
                                            </li>
                                            <li><Link to={'/orders'}>My Orders</Link></li>
                                            <hr></hr>
                                            <li onClick={logoutHandle}><a>Logout</a></li>
                                        </ul>
                                    </div>
                                }
                                {!userAuthService.isLogin() && <div>
                                    <a onClick={() => navigateLogin()}>Login</a>
                                </div>}

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="main_header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="main-menu">
                            <div className="menu-left">
                                <div className="brand-logo">
                                    <Link to={'/'}>
                                        <img src="https://incucdep.com/wp-content/uploads/2014/12/logo-thoi-trang.jpg" className="img-fluid blur-up lazyloaded" alt="" width={'120px'} />
                                    </Link>
                                </div>
                            </div>

                            <Form
                                className="form_search border-radius-0"
                                onFinish={searchProductHandle}
                            >
                                <Form.Item name={'name'}>
                                    <Input id="query search-autocomplete"
                                        type="search"
                                        placeholder="Search products"
                                        className="nav-search nav-search-field" />
                                </Form.Item>

                                <button type="submit" name="nav-submit-button" className="btn-search">
                                    <i className="fa fa-search"></i>
                                </button>
                            </Form>


                            <div className="menu-right pull-right">
                                <div>
                                    <div className="icon-nav">
                                        <ul>
                                            <li className="onhover-div mobile-cart">
                                                <Link to={'/carts'}>
                                                    <img className="me-3" src="http://themes.pixelstrap.com/multikart/assets/images/icon/cart.png" />
                                                </Link>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>
                       

                    </div>
                    
                </div>
     
            </div>
            
        </div>

        <div className='header_bottom bottom-part bottom-light'>
                            <div className='container'>
                                <div className='main-nav-center'>
                                    <nav id='main-nav'>
                                        <ul id='main-menu'>
                                        <Link to={'/'}>
                                            <li className='text-dark'>HOME</li>
                                        </Link>
                                            <li>FEATURE</li>
                                            <li>SHOP</li>
                                            <li>PRODUCT</li>
                                            <li>PAGE</li>
                                            <li>BLOG</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>


    </header>
}

export {
    Header
}