import { useForm } from "react-hook-form";

export default function Checkbox() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  const { register } = useForm();

  return (
    <div>
      <form>
        <label>
          <input
            {...register("carbohydrates")}
            type="checkbox"
            name="carbohydrates"
          />
          Carbohydrates
        </label>
        <label>
          <input
            {...register("carbohydrates")}
            type="checkbox"
            name="calories"
          />
          Calories
        </label>
        <label>
          <input
            {...register("carbohydrates")}
            type="checkbox"
            name="protein"
          />
          Protein
        </label>
        <label>
          <input {...register("carbohydrates")} type="checkbox" name="fat" />
          Fat
        </label>
        <label>
          <input {...register("carbohydrates")} type="checkbox" name="fiber" />
          Fiber
        </label>
        <label>
          <input {...register("carbohydrates")} type="checkbox" name="sodium" />
          Sodium
        </label>
      </form>
    </div>
  );
}
