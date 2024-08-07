import React from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

type CheckboxProps = {
  // setFunction: (data: CheckboxFormValues) => void;
  button: React.ReactNode;
  navigateFunction: NavigateFunction;
  ingredients: string[];
};

export type CheckboxFormValues = {
  calories?: boolean;
  carbohydrates?: boolean;
  protein?: boolean;
  fat?: boolean;
  fiber?: boolean;
  sodium?: boolean;
};

export default function Checkbox({
  button,
  navigateFunction,
  ingredients,
}: CheckboxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CheckboxFormValues>();

  const onSubmit = (data: CheckboxFormValues) => {
    const oneSelected = Object.values(data).some((value) => value === true);

    if (!oneSelected) {
      console.log(oneSelected);
      setError("root.serverError", {
        type: "custom",
        message: "Please select at least one metric",
      });
      console.log(errors.root?.serverError);
      return;
    }

    clearErrors("root.serverError");
    console.log(data);
    // setFunction(data);
    navigateFunction("/Page2", {
      state: { formValues: data, ingredients },
    });
  };



  return (
    <>
      <h2 className="text-lg font-LibreBodoni font-bold">Please select the <span className="underline">metrics</span> to calculate:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mb-2 p-2 font-LibreBodoni"
      >
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("calories")}
              type="checkbox"
              name="calories"
              className="checkbox"
            />
            Calories
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("carbohydrates")}
              type="checkbox"
              name="carbohydrates"
              className="checkbox"
            />
            Carbohydrates
          </label>
        </div>

        <div className="flex justify-start items-center">
          <label className=" flex items-center my-2 text-lg font-bold">
            <input
              {...register("protein")}
              type="checkbox"
              name="protein"
              className="checkbox"
            />
            Protein
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("fat")}
              type="checkbox"
              name="fat"
              className="checkbox"
            />
            Fat
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("fiber")}
              type="checkbox"
              name="fiber"
              className="checkbox"
            />
            Fiber
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("sodium")}
              type="checkbox"
              name="sodium"
              className="checkbox"
            />
            Sodium
          </label>
        </div>
        {button}
        {errors.root?.serverError && (
          <p className="text-red-500">{errors.root.serverError.message}</p>
        )}
      </form>
    </>
  );
}
