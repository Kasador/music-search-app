import './Home.scss';
import homeBG from '../../assets/images/home_bg.png';
import Search from '../search/Search'
import Footer from '../footer/Footer'
import Logout from '../logout/Logout'

function Home() {
    return (
        <main className="HomePage">
          <img src={homeBG} alt='home background image' id="Home_BG" />
          <Logout />
          <Search />
          <Footer />
        </main>
    )
}

export default Home;