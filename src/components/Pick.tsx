import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

export function Picks({
  steps,
  user,
  interval,
}: {
  steps: string[];
  user: string;
  interval: number;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [time, setTime] = React.useState(interval);

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    setTimeout(() => {
      if (time <= 0) {
        setTime(interval);
        const increment = activeStep + 1;
        if (increment >= steps.length) {
          setActiveStep(0);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        setTime(time - 1000);
      }
    }, 1000);
  });

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={steps[activeStep] !== user}
      >
        Pick ... {time / 1000}
      </Button>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={`${label}-${index}`}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
