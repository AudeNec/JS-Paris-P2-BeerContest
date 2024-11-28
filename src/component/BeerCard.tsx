import "./Beercard.css";
import { useState } from "react";
import type React from "react";

interface BeerCardProps {
	beer: {
		sku: string;
		name: string;
		sub_category_1: string;
		sub_category_2?: string;
		sub_category_3?: string;
		country: string;
		abv: string;
		tasting_notes: string;
		food_pairing: string;
	};
	handleUserCardSelect?: (beer: {
		sku: string;
		name: string;
		sub_category_1: string;
		sub_category_2?: string;
		sub_category_3?: string;
		country: string;
		abv: string;
		tasting_notes: string;
		food_pairing: string;
	}) => void;
}

const BeerCard = ({ beer, handleUserCardSelect }: BeerCardProps) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const abvNumber = Number.parseFloat(beer.abv.replace("%", ""));
	let getColorByAlcoholLevelClass = "";
	if (abvNumber < 4.99) {
		getColorByAlcoholLevelClass = "second-color";
	}
	if (abvNumber >= 5 && abvNumber < 8) {
		getColorByAlcoholLevelClass = "light-color";
	}
	if (abvNumber >= 7.99) {
		getColorByAlcoholLevelClass = "dark-color";
	}

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleClick = (e: React.MouseEvent) => {
		if (
			e.target instanceof HTMLElement &&
			e.target.classList.contains("container-I-card")
		) {
			e.stopPropagation();
		}
		handleFlip();
	};

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (
			e.target instanceof HTMLElement &&
			e.target.classList.contains("container-I-card")
		) {
			e.stopPropagation();
		}
		if (e.key === "Enter" || e.key === " ") {
			handleFlip();
		}
	};

	const handleSelectCard = () => {
		handleUserCardSelect ? handleUserCardSelect(beer) : undefined;
	};

	return (
		<div className={`beer-card ${isFlipped ? "flipped" : ""}`}>
			<div className="beer-card-font">
				<div className="container-name">
					<h2>{beer.name}</h2>
				</div>

				<button
					className="card-user-selctioned"
					type="button"
					onClick={handleSelectCard}
					onKeyUp={handleSelectCard}
				>
					Sélectionner
				</button>

				<div className={`container-number ${getColorByAlcoholLevelClass}`}>
					<h3>{beer.abv.slice(0, -2)}%</h3>
				</div>

				<button
					className="container-I-card"
					onClick={handleClick}
					onKeyUp={handleKeyUp}
					tabIndex={0}
					type="button"
				>
					<h3>i</h3>
				</button>
			</div>

			<div className="beer-card-back">
				<p>
					<strong>Food Pairing:</strong> <br /> {beer.food_pairing}
				</p>

				<button
					className="card-user-selctioned"
					type="button"
					onClick={handleSelectCard}
					onKeyUp={handleSelectCard}
				>
					Sélectionner
				</button>

				<button
					className="container-I-card"
					onClick={handleClick}
					onKeyUp={handleKeyUp}
					tabIndex={0}
					type="button"
				>
					i
				</button>
				<div className={`container-number-back ${getColorByAlcoholLevelClass}`}>
					<h3>{beer.abv.slice(0, -2)}%</h3>
				</div>
			</div>
		</div>
	);
};

export default BeerCard;
