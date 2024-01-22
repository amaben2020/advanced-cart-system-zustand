"use client";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const questions = [
  {
    id: 1,
    is_Correct: true,
    title: "JSX stands for JavaScript and xml",
  },
  {
    id: 2,
    is_Correct: false,
    title: "JSX stands for JavaScript for xml",
  },
  {
    id: 3,
    is_Correct: false,
    title: "JSX stands for JavaScript by xml",
  },
  {
    id: 4,
    is_Correct: false,
    title: "JSX stands for JavaScript to xml",
  },
];

const Terms = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // use react hook form and controller

  // create a list, grab value from it, create a button and send that value, display stuff from a state after the stuff was sent

  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleCheckAnswer = () => {
    if (isSelected && score < 2) {
      setScore(score + 1);
    }
  };

  const handleSend = (data: any) => {
    console.log(data);
    const formData = new FormData();

    console.log(data.image[0]);

    // for directly mutating data object
    data = { ...data, title: data.title, image: data.image[0].name };

    formData.append("terms", JSON.stringify(data));

    const result = formData.get("terms");
    console.log(result);
  };

  return (
    <div>
      Terms and conditions
      <Link href="/terms?type=admin">TO ADMIN </Link>
      <form onSubmit={handleSubmit(handleSend)}>
        <input className="p-3 border-2 rounded-lg" {...register("text")} />

        <label
          htmlFor="image"
          className="relative p-3 border-2 rounded-lg cursor-pointer min-w-40"
        >
          <input
            type="file"
            id="image"
            {...register("image")}
            className="absolute top-0 w-full"
          />
        </label>

        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          render={({ field: { ref, ...field } }) => (
            <input {...field} type="number" id="amount" />
          )}
          rules={{
            max: {
              value: 10,
              message: "Maximum number of servings is 10",
            },
          }}
        />

        <button type="submit">Submit</button>
      </form>
      <div>
        {questions.map((question) => {
          const selectedOption = question.id === selectedId;

          return (
            <button
              style={{
                border: selectedOption ? "1px solid yellow" : "",
              }}
              onClick={() => {
                setIsSelected(question.is_Correct);
                setSelectedId(question.id);
              }}
              key={question.id}
              className="p-3 m-3 border"
            >
              {question.title}
            </button>
          );
        })}
      </div>
      <button onClick={handleCheckAnswer}>Check</button>
      {score}
    </div>
  );
};

export default Terms;
