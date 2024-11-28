import { Link } from "react-router-dom";

import "../component/Nav.css";

import logo from "../assets/Beer Contest.png";
import burger from "../assets/burger.png";
import close from "../assets/close.png";
import information from "../assets/picto-about.png";
import play from "../assets/picto-game.png";
import home from "../assets/picto-home.png";
import question from "../assets/picto-test.png";

import { useState } from "react";

function Navigation() {
	const [navDisplayed, setNavDisplayed] = useState<boolean>(false);

	const handleNavMobile = () => {
		setNavDisplayed(!navDisplayed);
	};

	return (
		<>
			<nav id="navigation-bar">
				<Link to="/" onClick={() => setNavDisplayed(false)} id="logo-button">
					<img src={logo} alt="Logo" id="logo" />
				</Link>
				<section id="nav-links">
					<Link to="/" className="nav-link">
						<img src={home} alt="Accueil" className="nav-img" />
						<p>Accueil</p>
					</Link>
					<Link to="/game" className="nav-link">
						<img src={play} alt="Jouer" className="nav-img" />
						<p>Jouer</p>
					</Link>
					<Link to="/test" className="nav-link">
						<img src={question} alt="Test" className="nav-img" />
						<p>Test</p>
					</Link>
					<Link to="/about" className="nav-link">
						<img src={information} alt="A propos" className="nav-img" />
						<p>A propos</p>
					</Link>
				</section>
				<img
					src={navDisplayed ? close : burger}
					alt={
						navDisplayed
							? "fermer le menu de navigation"
							: "ouvrir le menu de navigation"
					}
					id="burger"
					onClick={handleNavMobile}
					onKeyUp={handleNavMobile}
				/>
			</nav>
			{navDisplayed ? (
				<main id="nav-mobile">
					<Link to="/" onClick={handleNavMobile} onKeyUp={handleNavMobile}>
						<img src={home} alt="Accueil" className="nav-img" />
						<p>Accueil</p>
					</Link>
					<Link to="/game" onClick={handleNavMobile} onKeyUp={handleNavMobile}>
						<img src={play} alt="Jouer" className="nav-img" />
						<p>Jouer</p>
					</Link>
					<Link to="/test" onClick={handleNavMobile} onKeyUp={handleNavMobile}>
						<img src={question} alt="Test" className="nav-img" />
						<p>Test</p>
					</Link>
					<Link to="/about" onClick={handleNavMobile} onKeyUp={handleNavMobile}>
						<img src={information} alt="A propos" className="nav-img" />
						<p>A propos</p>
					</Link>
				</main>
			) : (
				<></>
			)}
		</>
	);
}

export default Navigation;
