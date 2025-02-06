import { Fragment } from "react";
import { FormWizardStepProps } from "./form-wizard";

interface IProps {
    steps: FormWizardStepProps[];
    currentStep: number;
    className?: string;
}

const Stepper = ({ steps, currentStep, className }: IProps) => {
    return (
        <div className={`flex items-baseline w-full relative ${className}`}>
            {steps.map((step, index) => (
                <Fragment key={index}>
                    {index !== 0 && (
                        <div className={`flex-1 h-[2px] ${index <= currentStep ? "bg-black" : "bg-gray-300"}`}></div>
                    )}

                    <div className="flex flex-col items-center max-w-[3.5rem]">
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                index <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <span
                            className={`mt-2 text-sm text-center ${
                                index <= currentStep ? "text-gray-700 font-semibold" : "text-gray-500"
                            }`}
                        >
                            {step.legend}
                        </span>
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default Stepper;
