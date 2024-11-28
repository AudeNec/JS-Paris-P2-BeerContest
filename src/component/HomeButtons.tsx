import { Link } from "react-router-dom";

import "./HomeButtons.css";

import logoDeck from "../src/assets/deck.png";
import logoBeer from "../src/assets/picto-beer.png";

const HomeButtons = () => {
	return (
		<div id="home-buttons">
			<Link to="/Test">
				<button type="button" className="home-button">
					<p id="deck-button-text">Construire mon deck</p>
					<img src={logoDeck} alt="logo deck" id="logo-deck" />
				</button>
			</Link>
			<Link to="/game">
				<button type="button" className="home-button">
					<p>Jouer</p>
					<img src={logoBeer} alt="logo bière" />
				</button>
			</Link>
		</div>
	);
};

export default HomeButtons;
