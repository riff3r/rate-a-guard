import { useMemo, useState } from "react";
import Form, { FormFieldProps } from "./form-wizard-form";
import Stepper from "@/components/ui/stepper";

export interface FormWizardStepProps {
    id: string;
    legend: string;
    fields: Array<FormFieldProps>;
    rules?: object;
}

export interface FormWizardProps {
    steps: FormWizardStepProps[];
    defaultValues: Record<string, unknown>;
    onSubmit(values: Record<string, unknown>): void;
}

const FormWizard: React.FC<Readonly<FormWizardProps>> = (props) => {
    const { steps, defaultValues, onSubmit } = props;
    const [values, setValues] = useState<Record<string, unknown>>({});
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const activeStep = useMemo(() => steps[activeStepIndex], [activeStepIndex, steps]);
    const isLastStep = useMemo(() => activeStepIndex === steps.length - 1, [activeStepIndex, steps.length]);

    const goNextStep = () => {
        setActiveStepIndex((index) => (index += 1));
    };

    const goPrevStep = () => {
        setActiveStepIndex((index) => (index -= 1));
    };

    const handleNextStep = (stepValues: Record<string, unknown>) => {
        const newValues = { ...values, ...stepValues };
        setValues(newValues);

        if (isLastStep) {
            onSubmit(newValues);
        } else {
            goNextStep();
        }
    };

    const handleBackStep = (stepValues: Record<string, unknown>) => {
        const newValues = { ...values, ...stepValues };
        setValues(newValues);
        goPrevStep();
    };

    if (!activeStep) {
        return null;
    }

    return (
        <div>
            <Stepper
                steps={steps}
                currentStep={steps.findIndex((step) => step.id === activeStep.id)}
                className="px-8 mb-8"
            />
            <Form
                key={activeStep.id}
                legend={activeStep.legend}
                fields={activeStep.fields}
                defaultValues={{ ...defaultValues, ...values }}
                showBackButton={!!activeStepIndex}
                onSubmit={handleNextStep}
                onBack={handleBackStep}
                isLastStep={isLastStep}
            />
        </div>
    );
};

export default FormWizard;
