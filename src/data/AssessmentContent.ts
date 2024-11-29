const assessmentContent = {
	question1: {
		question: "Vous êtes plutôt bière…",
		answer: [
			{ type: "golden", sentence: "En terrasse au printemps" },
			{ type: "belgian", sentence: "Au chaud dans un estaminet belge" },
			{ type: "ipa", sentence: "Rapide en before avant de sortir en boîte" },
			{ type: "hazy", sentence: "Ambiancé dans un pub irlandais" },
		],
	},
	question2: {
		question:
			"Si vous deviez choisir un plat pour le reste de vos jours, ce serez :",
		answer: [
			{ type: "golden", sentence: "Une salade grecque, l'été et la santé" },
			{
				type: "belgian",
				sentence:
					"Le plat signature de vos parents : la nostalgie nourrit l'âme",
			},
			{
				type: "ale",
				sentence: "Des pâtes pesto : simple, efficace, on ne s’en lasse pas",
			},
			{
				type: "ipa",
				sentence: "Une bonne pizza au four : la gourmandise et la qualité",
			},
		],
	},
	question3: {
		question: "Les vacances idéales à vos yeux :",
		answer: [
			{
				type: "golden",
				sentence: "Une semaine sur la plage, relax et ensoleillée.",
			},
			{
				type: "belgian",
				sentence:
					"Une immersion dans une ville pour découvrir sa culture et sa cuisine.",
			},
			{
				type: "ipa",
				sentence: "Un road-trip pour découvrir des endroits inexplorés.",
			},
			{
				type: "hazy",
				sentence:
					"Une aventure en montagne, avec des randonnées et des paysages à couper le souffle.",
			},
		],
	},
	question4: {
		question: "Comment décrirais-tu ta personnalité ?",
		answer: [
			{ type: "belgian", sentence: "Créatif(ve) et unique" },
			{ type: "ale", sentence: "Détendu(e) et calme" },
			{ type: "ipa", sentence: "Aventurier(e) et curieux(se)" },
			{ type: "hazy", sentence: "Intense et passionné(e)" },
		],
	},
	question5: {
		question: "Que commandes-tu généralement au bar ?",
		answer: [
			{ type: "golden", sentence: "Une boisson douce, sucrée ou fruitée" },
			{ type: "ale", sentence: "Quelque chose de léger et rafraîchissant" },
			{ type: "ipa", sentence: "Quelque chose de local et original" },
			{ type: "hazy", sentence: "Une boisson avec beaucoup de caractère" },
		],
	},
	question6: {
		question: "Quel est ton type de musique préféré ?",
		answer: [
			{ type: "belgian", sentence: "Rock ou punk énergique" },
			{ type: "ale", sentence: "Jazz ou blues relaxant" },
			{ type: "ipa", sentence: "Pop ou folk douce et joyeuse" },
			{ type: "hazy", sentence: "Musique électronique et festive" },
		],
	},
	question7: {
		question: "Quel bar préfères-tu ?",
		answer: [
			{
				type: "golden",
				sentence: "Un rade perdu dans la campagne face à un beau paysage",
			},
			{ type: "belgian", sentence: "Un classique Pub bien rustique" },
			{
				type: "ale",
				sentence: "Un bar restaurant, deux en un pour satisfaire tout le monde",
			},
			{
				type: "ipa",
				sentence: "Le bar populaire du centre où on retrouve tous les copains",
			},
		],
	},
	question8: {
		question: "Tes sports favoris sont plutôt...",
		answer: [
			{
				type: "golden",
				sentence: "Les sports de plein air, comme la randonnée ou le vélo",
			},
			{
				type: "belgian",
				sentence: "Les sports d'équipe, le collectif et le partage",
			},
			{
				type: "ale",
				sentence: "Regarder les autres en faire avec des chips et une boisson",
			},
			{
				type: "hazy",
				sentence: "Les sports extrêmes qui sortent de l'ordinaire",
			},
		],
	},
	question9: {
		question: "Dans un groupe d'amis, tu es...",
		answer: [
			{
				type: "belgian",
				sentence: "La personne calme et rassurante, qui équilibre le groupe",
			},
			{
				type: "ale",
				sentence: "Le ou la fêtard(e) qui s’assure que tout le monde s’amuse",
			},
			{
				type: "ipa",
				sentence: "Celui ou celle qui lance de nouvelles idées et aventures",
			},
			{
				type: "hazy",
				sentence: "L'original(e), toujours avec des suggestions inattendues",
			},
		],
	},
	question10: {
		question: "Quel geek es-tu ?",
		answer: [
			{
				type: "belgian",
				sentence:
					"Le visionnaire UX : Tu aimes que tout soit intuitif et bien pensé",
			},
			{
				type: "ale",
				sentence:
					"Le chill du vendredi soir : Un(e) pro du clean code qui sait apprécier une pause bien méritée",
			},
			{
				type: "ipa",
				sentence:
					"L’explorateur tech : Tu aimes expérimenter de nouvelles technologies",
			},
			{
				type: "hazy",
				sentence:
					"Le débuggeur déterminé : Tu es prêt(e) à résoudre les bugs les plus complexes",
			},
		],
	},
} as const;

export default assessmentContent;
