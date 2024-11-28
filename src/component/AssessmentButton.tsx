import "./AssessmentButton.css";

interface AssessmentButtonProps {
	setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>>;
}

const AssessmentButton = ({
	setCurrentAssessmentStep,
}: AssessmentButtonProps) => {
	return (
		<button
			type="button"
			id="assessment-button"
			onClick={() => setCurrentAssessmentStep(1)}
		>
			<p>Commencer le test</p>
			<img src="../src/assets/picto-test.png" alt="point d'interrogation" />
		</button>
	);
};

export default AssessmentButton;
