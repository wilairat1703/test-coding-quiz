import React from "react";

type InputBoxProps = {
  inputs: string[];
  inputRefs: React.RefObject<HTMLInputElement | null>[];
  onUpdateInputs: (inputs: string[]) => void;
  onCheckAnswer: (guess: string) => void;
};

const InputBox = ({
  inputs,
  inputRefs,
  onUpdateInputs,
  onCheckAnswer,
}: InputBoxProps) => {
  const fnHandleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z]?$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value.toUpperCase();
    onUpdateInputs(newInputs);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const fnHandleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      const guess = inputs.join("");
      onCheckAnswer(guess);
    }

    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-4">
      {inputs.map((value, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          value={value}
          maxLength={1}
          onChange={(e) => fnHandleChange(e.target.value, index)}
          onKeyDown={(e) => fnHandleKeyDown(e, index)}
          className="border p-2 w-12 text-center text-lg rounded bg-white"
        />
      ))}
    </div>
  );
};

export default InputBox;
