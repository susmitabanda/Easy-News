import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <div>
                        <div className="newslogo">
                            <h1>Easy<span>News</span></h1>
                        </div>
                    </div>
                    <div className="news-topics">
                        <ul className='ulnewstopic'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/politics">Politics</Link></li>
                            <li><Link to="/entertainment">Entertainment</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                            <li><Link to="/world">World</Link></li>
                            <li><Link to="/technology">Technology</Link></li>

                        </ul>
                    </div>
                </nav>
            </header>
            <div className='latestnews'>
                <h1>latest news:
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, accusantium.
                    the croller bar , latest news will scorll here
                    animations will be added so it will scroll itself</h1>
            </div>



        </>
    )
}
export default Header;