import './Footer.css'
import { FaArrowRight} from 'react-icons/fa6'


function Footer() {
    return (
        <>
            <footer>
                <div className='footer-top-sec'>
                    <div className='footer-top-inner'>
                        <a href="">
                            <img src="https://gaviaspreview.com/wp/gowilds/wp-content/uploads/2023/01/icon-headphone.png" alt="" />
                        </a>
                        <div className='footer-p-sec'>
                            <a className='footer-p footer-p-lg' href="">Need any support for tour & travels ?</a>
                        </div>
                        <div className='arrow-sec green'>
                            <a href="">
                                <FaArrowRight className='arrow-icon'/>
                            </a>
                        </div>
                    </div>
                    <div className='footer-top-inner'>
                        <a href="">
                            <img src="https://gaviaspreview.com/wp/gowilds/wp-content/uploads/2023/01/icon-travel.png" alt="" />
                        </a>
                        <div className='footer-p-sec'>
                            <a className='footer-p footer-p-lg' href="">Ready to Get Started With Vacations!</a>
                        </div>
                        <div className='arrow-sec orange'>
                            <a href="">
                                <FaArrowRight className='arrow-icon'/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <div className='footer-bottom-sec'>
                    <div className='footer-bottom-about'>
                        <h1>Məkan</h1>
                        <p>To take trivial example which us
                        ever undertakes laborious physica exercise except obsome.</p>
                        <div className='bottom-socials'>
                            
                        </div>
                    </div>
                    <div className='footer-bottom-pages'>

                    </div>
                    <div className='footer-bottom-newsletters'>

                    </div>
                    <div className='footer-bottom-contact'>

                    </div>
                </div>
                <div className='copyright-sec'>

                </div>
            </footer>
        </>
    )
}

export default Footer
