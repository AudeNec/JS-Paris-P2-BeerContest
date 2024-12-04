import { useState } from "react";

import "./Game.css";

import GameSet from "../component/GameSet";
import PopUp from "../component/PopUp";
import UserStatsDisplay from "../component/UserStatsDisplay";

function Game() {
	const GAME_STATES = { start: 0, ingame: 1, end: 2 };
	const [currentGameState, setCurrentGameState] = useState<number>(
		GAME_STATES.start,
	);
	const [alcoholLevel, setAlcoholLevel] = useState<number>(0);
	const [statsDisplayed, setStatsDisplayed] = useState<boolean>(false);
	const ALCOHOL_LEVEL_CAT =
		alcoholLevel < 10
			? "gameLowAlcohol"
			: alcoholLevel >= 25
				? "gameHighAlcohol"
				: "gameMiddleAlcohol";

	return (
		<main id="game-main">
			{currentGameState !== GAME_STATES.ingame ? (
				<PopUp
					currentGameState={currentGameState}
					gameStates={GAME_STATES}
					setCurrentGameState={setCurrentGameState}
					alcoholLevelCategory={ALCOHOL_LEVEL_CAT}
				/>
			) : (
				<></>
			)}
			<section>
				<div id="game-stats">
					<button
						type="button"
						className="game-buttons"
						id="button-stats"
						onClick={() => {
							setStatsDisplayed(!statsDisplayed);
						}}
					>
						{statsDisplayed
							? "Masquer mes statistiques"
							: "Afficher mes statistiques"}
					</button>
					{statsDisplayed ? <UserStatsDisplay /> : <></>}
				</div>
			</section>
			<section id="game-gameset">
				<GameSet
					currentGameState={currentGameState}
					gameStates={GAME_STATES}
					setCurrentGameState={setCurrentGameState}
					setAlcoholLevel={setAlcoholLevel}
					alcoholLevel={alcoholLevel}
					alcoholLevelCategory={ALCOHOL_LEVEL_CAT}
				/>
			</section>
			<section>
				<article id="game-rules">
					<h3>Comment jouer ?</h3>
					<p>
						Bienvenue dans le jeu des bières ! <br />
						Joue 5 manches contre le barman. Le plus bas taux gagne. Chaque
						défaite augmente ton taux d'alcoolémie virtuel.
						<br />
						Bon jeu, et santé !
					</p>
				</article>
			</section>
			<section id="mobile-version">
				<p>
					Pour une meilleure expérience, je t'invite à jouer sur ton ordinateur.
				</p>
			</section>
		</main>
	);
}

export default Game;
