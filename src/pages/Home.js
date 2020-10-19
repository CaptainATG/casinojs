import React, { Component } from "react";

class Home extends React.Component {
  render() {
    return (
      <body>
        <div>
          <header id="header">
            <div id="sticks-to-top">
              <div class="wrapper">
                <section class="mid_header f_before">
                  <ul class="fullmenu menu mblack fade">
                    <li class="">
                      <a href="">
                        <i class="fa-2x fa fa-home"></i> Home
                      </a>
                    </li>
                    <li class="">
                      <a href="">
                        <img src="assets/images/ic_casino.png" />
                        Live Casino
                      </a>
                    </li>
                    <li class="floatr" id="Register">
                      <img id="newhook" src="assets/images/ic_lottery.png" />
                      Register
                    </li>
                    <li class="floatr" id="Howtoplay">
                      <img id="newhook" src="assets/images/ic_lottery.png" />
                      How to Play
                    </li>
                  </ul>

                  {/*  <!--PHONE MENU--> */}
                  <ul class="Phone_menu menu mblack fade">
                    <li class="btn_dark btn_menuphone">
                      <a href="#">
                        <i class="fa fa-bars"></i>
                      </a>
                      <div class="cols2">
                        <div class="col1">
                          <h5>Menu</h5>
                          <ol>
                            <li>
                              <a href="">Home</a>
                            </li>
                            <li>
                              <a href="">Live Casino</a>
                            </li>
                            <li>
                              <a href="">Register</a>
                            </li>
                            <li>
                              <a href="">How to Play</a>
                            </li>
                            <li>
                              <a href="">About Us</a>
                            </li>
                            <li>
                              <a href="">Contact Us</a>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </li>
                  </ul>
                  {/* <!-----END PHONE MENU-----> */}

                  <ul class="menu sblack fade">
                    <li>
                      <a href="">About us</a>
                    </li>

                    <li>
                      <a href="">Contact us</a>
                    </li>
                  </ul>

                  {/*  <!-- LOGIN FORM --> */}
                  <section class="loginfield">
                    <div id="login-form" class="login-form">
                      <a href="#" class="control_btnlogin loginbuttonxx">
                        <i class="fa fa-sign-in"></i>
                      </a>
                      <fieldset id="fldLogin">
                        <form method="post">
                          <ul class="login_input">
                            <li class="pass_w">
                              <input
                                id="username"
                                name="username"
                                tabindex="1"
                                maxlength="20"
                                type="text"
                                placeholder="Username"
                                autocomplete="off"
                              />
                            </li>
                            <li class="pass_w">
                              <input
                                id="password"
                                name="password"
                                tabindex="2"
                                maxlength="20"
                                type="password"
                                placeholder="Password"
                                autocomplete="off"
                              />
                            </li>
                            {/* <?php echo $message; ?> */}
                            <li>
                              <input
                                type="submit"
                                name="login"
                                id="btnLogin"
                                href="javascript:void(0)"
                                class="but_login btn_gen"
                                value="Login"
                              />
                            </li>
                          </ul>
                        </form>
                      </fieldset>
                    </div>
                  </section>
                  {/*   <!-- END LOGIN FORM --> */}

                  <h1 id="logo">
                    <a href="" rel="home" title="">
                      <img src="assets/images/logo.png" />
                    </a>
                  </h1>
                  {/*  <!-----END PHONE MENU-----> */}
                </section>
              </div>
            </div>
          </header>
          {/* <!-- Start Slider -->  */}
          <section class="box_slider subpage">
            <div class="bg_mobile">&nbsp;</div>
            <section class="slider_slot">
              {" "}
              <a href="" class="prev1"></a> <a href="" class="next1"></a>
              <ul id="slides-slots">
                <li class="slide">
                  <div class="wrapper-live-casino wrapper">
                    <div class="slide-text">
                      <p class="sub-heading-upper">Live Casino</p>
                      <p class="big text_effect">Online Casino</p>
                      <p>Lets Play Together!</p> 
                      <a class="btn_gen btn_onslide" href="">
                        Try Now
                      </a>
                    </div>
                    <div class="slide-image">
                      {" "}
                      <img src="assets/images/sliders/slide_lottery1.png" />{" "}
                    </div>
                  </div>
                  <div class="slide-back"></div>
                </li>
                <li class="slide">
                  <div class="wrapper-live-casino wrapper">
                    <div class="slide-text">
                      <p class="sub-heading-upper">Live Casino</p>
                      <p class="big text_effect">Online Casino</p>
                      <p>Lets Play Together!</p>
                      <a class="btn_gen btn_onslide" href="">
                        Try Now
                      </a>
                    </div>
                    <div class="slide-image">
                      {" "}
                      <img src="assets/images/sliders/slide_lottery2.png" />{" "}
                    </div>
                  </div>
                  <div class="slide-back"></div>
                </li>
              </ul>
            </section>
          </section>    


        </div>
    
      </body>
    );
  }
}

export default Home;
