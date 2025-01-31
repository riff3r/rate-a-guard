import { BasicInput } from "@/components/ui/basic-input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    rules?: object;
}

export interface FormProps {
    legend: string;
    fields: Array<FormFieldProps>;
    defaultValues: Record<string, unknown>;
    showBackButton?: boolean;
    onSubmit(values: Record<string, unknown>): void;
    onBack(values: Record<string, unknown>): void;
    isLastStep: boolean;
}

const Form: React.FC<Readonly<FormProps>> = (props) => {
    const { fields, defaultValues, legend, onSubmit, isLastStep } = props;
    const { showBackButton, onBack } = props;

    const formInstance = useForm({
        defaultValues: useMemo(() => defaultValues, [defaultValues]),
    });
    const { handleSubmit, register, reset } = formInstance;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleBack = () => {
        const values = formInstance.getValues();
        onBack(values);
    };

    return (
        <FormProvider {...formInstance}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className="space-y-4">
                    <legend className="text-xl font-semibold text-gray-800">{legend}</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map(({ name, placeholder, label, type, rules }) => (
                            <FormField
                                key={name}
                                rules={rules}
                                {...register(name)}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <BasicInput
                                                type={type}
                                                placeholder={placeholder}
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </fieldset>

                <div className="flex align-center space-x-2">
                    <Button
                        variant={"outline"}
                        className="w-full rounded-full font-semibold focus: outline-none"
                        onClick={handleBack}
                        disabled={!showBackButton}
                    >
                        Back
                    </Button>

                    <Button
                        type="submit"
                        className="w-full rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                    >
                        {isLastStep ? "Submit" : "Next"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default Form;
