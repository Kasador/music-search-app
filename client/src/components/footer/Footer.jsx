import './Footer.scss';

function Footer() {
    const time = () => {
        const getData = new Date();
        const fullYear = getData.getFullYear();

        return fullYear;
    }

    return (
        <footer>
          <h2>Copyright &copy; {time()}</h2> | <a href="https://hunterstevenshaw.com/" target='_blank'>Hunter Steven Shaw</a>
        </footer>
    )
}

export default Footer;