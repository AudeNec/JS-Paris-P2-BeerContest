import "./PopUp.css";

import barman from "../assets/barman.png";
import { useUserStats } from "../context/UserStats";

import boost from "../src/assets/boost.png";

interface PopUpProps {
	currentGameState: number;
	gameStates: { start: number; ingame: number; end: number };
	setCurrentGameState: React.Dispatch<React.SetStateAction<number>>;
	alcoholLevelCategory: string;
}

function PopUp({
	currentGameState,
	gameStates,
	setCurrentGameState,
	alcoholLevelCategory,
}: PopUpProps) {
	const startGame = () => {
		setCurrentGameState(gameStates.ingame);
	};

	const { userAssessmentScore, BEER_CATEGORIES, userMaxKey } = useUserStats();

	return (
		<section id="pop-up">
			<img src={barman} alt="Un barman accueillant" id="barman" />
			{currentGameState === gameStates.start ? (
				<div className="pop-up-txt">
					<h2>Bienvenue dans le jeu des bières !</h2>
					<p>
						Découvre ton deck et celui de ton opposant(moi). Si tu veux tu peux
						toujours en charger des nouveaux. <br />
						Le jeu est en 5 manches, tu dois choisir les bières les plus douces
						pour profiter de la soirée en toute sérénité. Chaque défaite
						augmente ton taux d'alcoolémie virtuel. <br />
						Attention à ne pas dépasser tes limites... <br />
						Bon jeu, et santé !
					</p>
					{!Object.values(userAssessmentScore).every((value) => value === 0) ? (
						<>
							<p className="filtered-decks">
								Bravo, tu es adepte de {BEER_CATEGORIES[userMaxKey]} ! Nous
								allons donc jouer avec ces bières.{" "}
							</p>
							<div id="boost-desc">
								<img
									src={boost}
									alt="boost"
									width="20px"
									height="20px"
									id="boost-img"
								/>
								<p className="filtered-decks">
									Ton expertise te donne un peu d'avance, ton premier verre ne
									compte pas.
								</p>
							</div>
						</>
					) : (
						<></>
					)}
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Commencer la partie
					</button>
				</div>
			) : (
				<></>
			)}
			{currentGameState === gameStates.end &&
			alcoholLevelCategory === "gameLowAlcohol" ? (
				<div className="pop-up-txt">
					<h2>Bravo, tu as gardé le contrôle !</h2>
					<p>
						Ton taux d'alcoolémie est encore raisonnable, tu pourrais presque
						passer un test de sobriété haut la main ! 🚗👍
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
			{currentGameState === gameStates.end &&
			alcoholLevelCategory === "gameMiddleAlcohol" ? (
				<div className="pop-up-txt">
					<h2>Ça commence à monter... 🍻</h2>
					<p>
						Tu sens que la soirée est bien entamée. Peut-être pas au point de
						tout confondre, mais un verre d'eau ne ferait pas de mal.
					</p>
					<button type="button" onClick={startGame} onKeyDown={startGame}>
						Recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
			{currentGameState === gameStates.end &&
			alcoholLevelCategory === "gameHighAlcohol" ? (
				<div className="pop-up-txt">
					<h2>Oulà, là tu vois double ! 🍺🍺</h2>
					<p>
						Mieux vaut t'asseoir un moment et profiter d'un peu d'eau. La
						prochaine partie attendra un peu que tu reprennes tes esprits !{" "}
					</p>
					<button type="button" onClick={startGame} onKeyUp={startGame}>
						Boire un verre d'eau et recommencer une partie
					</button>
				</div>
			) : (
				<></>
			)}
		</section>
	);
}

export default PopUp;
