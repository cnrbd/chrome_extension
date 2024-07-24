import React from "react";
import { useForm } from "react-hook-form";

type CheckboxProps = {
  setFunction: (data: CheckboxFormValues) => void;
  button: React.ReactNode;
};

export type CheckboxFormValues = {
  calories?: boolean;
  carbohydrates?: boolean;
  protein?: boolean;
  fat?: boolean;
  fiber?: boolean;
  sodium?: boolean;
};

export default function Checkbox({ setFunction, button }: CheckboxProps) {
  const { register, handleSubmit } = useForm<CheckboxFormValues>();

  const onSubmit = (data: CheckboxFormValues) => {
    console.log(data);
    setFunction(data);
  };

  return (
    <>
      <h2 className="text-lg">Please select the metrics to calculate:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-yellow-100 flex flex-col my-3 p-2 "
      >
        <div className="flex justify-start items-center">
          <label className=" flex items-center my-2 text-lg font-bold">
            <input
              {...(register("calories"), { required: true })}
              type="checkbox"
              name="calories"
              className="mr-3"
            />
            Calories
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className=" flex items-center my-2 text-lg font-bold">
            <input
              {...register("carbohydrates")}
              type="checkbox"
              name="carbohydrates"
              className="mr-3"
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
              className="mr-3"
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
              className="mr-3"
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
              className="mr-3"
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
              className="mr-3"
            />
            Sodium
          </label>
        </div>
        {button}
      </form>
    </>
  );
}
