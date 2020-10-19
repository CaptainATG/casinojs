import React, {Component} from 'react'

class Footer extends React.Component{
    render(){ 
        return (

          <div>
                <footer class="footer"/>
        <div class="wrapper">
            <a id="back-to-top" href="" title="Back to top"><i class="fa fa-angle-up"></i></a>
            <div class="widgets">
                <div class="footerbox">
                    <h3>Contact us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu ultricies nisl, eu viverra lectus. Aliquam molestie faucibus ullamcorper.</p>
                    <p><i class="fa fa-phone"></i> Phone: 09123456789</p>
                    <p><i class="fa fa-map"></i> Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu ultricies nisl, eu viverra lectus.</p>
                    <p><i class="fa fa-link"></i> Email: helloworld@gmail.com </p>

                </div>
                <div class="footerbox">
                    <h3>Live Casino</h3>
                    <ul>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 1</a></li>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 2</a></li>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 3</a></li>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 4</a></li>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 5</a></li>
                        <li><i class="fa fa-angle-right"></i> <a href="">Link 6</a></li>
                    </ul>
                </div>
                <div class="footerbox">
                    <h3>Game rules</h3>
                    <ul>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 1">Link 1</a></li>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 2">Link 2</a></li>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 3">Link 3</a></li>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 4">Link 4</a></li>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 5">Link 5</a></li>
                        <li><i class="fa fa-angle-right"></i><a href="" title="Link 6">Link 6</a></li>
                    </ul>
                </div>
                <div class="footerbox last">
                    <h3>SCAN QR CODE</h3>
                    <p>Download the app now and enjoy the Live Casino action on your mobile smart phones and tablets!</p>
                    <section class="gen_scan">
                        <div class="bg_scan"><img src="assets/images/ios_qrcode.jpg"/>
                            <p>IOS</p>
                        </div>
                        <div class="bg_scan right"><img src="assets/images/android_qrcode.jpg"/>
                            <p>Android</p>
                        </div>
                    </section>
                    <p>Scan the QR code.Existing players can login with their existing account details.<br /><br /></p>
                </div>
                <br class="clear" />
            </div>

            </div>
            <div class="bottom">
                <center>
                    <p>Copyright &copy; S128 The Gentleman's Game</p>
                </center>
             </div>
            
        </div>
        
        
            


        )

}
}


export default Footer