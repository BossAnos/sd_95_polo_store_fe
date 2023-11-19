// import React from 'react';
import './Footer.css';

const Footer = () => {
    return <footer className="footer-light">
        <div className="light-layout">
            <div className="container">
                <section className="small-section border-section border-top-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="subscribe">
                                <div>
                                    <h4>KNOW IT ALL FIRST!</h4>
                                    <p>Never Miss Anything From Men Wardrobe By Signing Up To Our Newsletter.</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                            <form className="form-inline subscribe-form auth-form needs-validation" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                                <div className="form-group mx-sm-3">
                                    <input type="text" className="form-control" name="EMAIL" id="mce-EMAIL" placeholder="Enter your email" required="required" />
                                </div>
                                <button type="submit" className="btn btn-solid" id="mc-submit">subscribe</button>
                            </form>
                        </div> */}
                    </div>
                </section>
            </div>
        </div>

        <section className="section-b-space light-layout main-footer">
            <div className="container">
                <div className="row footer-theme partition-f">
                    <div className="col-lg-4 col-md-6">

                        <div className="footer-contant">
                            <div className="footer-logo">

                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                            <div className="footer-social">
                                <ul>
                                    <li>
                                        <a href="#">
                                        <i className="fa-brands fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li><a href="#"><i className="fa-brands fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa-solid fa-wifi" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col offset-xl-1">
                        <div className="sub-title">
                            <div className="footer-title">
                                <h4>my account</h4>
                            </div>
                            <div className="footer-contant">
                                <ul>
                                    <li><a href="#">mens</a></li>
                                    <li><a href="#">womens</a></li>
                                    <li><a href="#">clothing</a></li>
                                    <li><a href="#">accessories</a></li>
                                    <li><a href="#">featured</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="sub-title">
                            <div className="footer-title">
                                <h4>why we choose</h4>
                            </div>
                            <div className="footer-contant">
                                <ul>
                                    <li><a href="#">shipping &amp; return</a></li>
                                    <li><a href="#">secure shopping</a></li>
                                    <li><a href="#">gallary</a></li>
                                    <li><a href="#">affiliates</a></li>
                                    <li><a href="#">contacts</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="sub-title">
                            <div className="footer-title">
                                <h4>store information</h4>
                            </div>
                            <div className="footer-contant">
                                <ul className="contact-list">
                                    <li><i className="fa fa-map-marker"></i>
                                    Men Wardrobe Store, VietNam
                                        </li>
                                    <li><i className="fa fa-phone"></i>Call Us: 0968.86.83.86</li>
                                    <li><i className="fa fa-envelope"></i>Email Us: menwardrobe</li>
                                    <li><i className="fa fa-fax"></i>Fax: 10000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <div className="sub-footer">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="footer-end">
                            <p><i className="fa fa-copyright" aria-hidden="true"></i> 2023-24 themeforest powered by
                                pixelstrap</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12">
                        <div className="payment-card-bottom">
                            <ul>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/visa.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/mastercard.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/paypal.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/american-express.png" alt=""/></a>
                                </li>
                                <li>
                                    <a href="#"><img src="http://themes.pixelstrap.com/multikart/assets/images/icon/discover.png" alt=""/></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}

    </footer>
}

export {
    Footer
}