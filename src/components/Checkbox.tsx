import { useForm } from "react-hook-form";

export default function Checkbox() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  const { register } = useForm();

  return (
    <>
      <h2 className="text-lg">Please select the metrics to calculate:</h2>
      <form className="bg-yellow-100 flex flex-col my-3 p-2 ">
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
              {...register("carbohydrates")}
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
              name="protein"
              className="mr-3"
            />
            Protein
          </label>
        </div>
        <div className="flex justify-start items-center">
          <label className="flex items-center my-2 text-lg font-bold">
            <input
              {...register("carbohydrates")}
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
              {...register("carbohydrates")}
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
              {...register("carbohydrates")}
              type="checkbox"
              name="sodium"
              className="mr-3"
            />
            Sodium
          </label>
        </div>
      </form>
    </>
  );
}
