import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCopyright } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faGithub,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return <footer className="footer">
        <div className="social-icons">
            <a href="" target="_blank"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
        <h3><FontAwesomeIcon icon={faCopyright} /> Copyright by Kisha Manalo</h3>
    </footer>
}