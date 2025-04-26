import { useState, useRef } from "react";

const correctAnswer = "ABCD";

type Result = {
  guess: string;
  countCorrect: number;
  positionCorrect: number;
};

const Test = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [results, setResults] = useState<Result[]>([]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const fnHandleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z]?$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value.toUpperCase();
    setInputs(newInputs);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const fnHandleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const checkAnswer = () => {
    const guess = inputs.join("");

    if (guess.length !== 4) {
      alert("กรุณากรอกตัวอักษรภาษาอังกฤษให้ครบ 4 ตัว");
      return;
    }

    let correctCount = 0;
    let positionCorrect = 0;
    const answerUsed = Array(4).fill(false);
    const guessUsed = Array(4).fill(false);

    for (let i = 0; i < 4; i++) {
      if (guess[i] === correctAnswer[i]) {
        positionCorrect++;
        answerUsed[i] = true;
        guessUsed[i] = true;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessUsed[i]) continue;
      for (let j = 0; j < 4; j++) {
        if (!answerUsed[j] && guess[i] === correctAnswer[j]) {
          correctCount++;
          answerUsed[j] = true;
          break;
        }
      }
    }

    const totalCorrect = correctCount + positionCorrect;

    const newResult: Result = {
      guess,
      countCorrect: totalCorrect,
      positionCorrect,
    };

    setResults([...results, newResult]);
    setInputs(["", "", "", ""]);
    inputRefs[0].current?.focus();

    if (positionCorrect === 4) {
      alert(`คำตอบถูกต้อง! คุณเดาทั้งหมด ${results.length + 1} ครั้ง`);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto ">
      <div className="font-prompt text-2xl font-bold mb-4 text-center text-white bg-[#77ade9] rounded-2xl p-2">
        {" "}
        ตรวจคำตอบ
      </div>
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

      <table className="table-auto w-full mt-6">
        <thead>
          <tr className="bg-[#f5bed1]">
            <th className="border px-2 py-1 font-medium">คำตอบ</th>
            <th className="border px-2 py-1 font-medium">สุ่ม</th>
            <th className="border px-2 py-1 font-medium">ถูก/ทั้งหมด</th>
            <th className="border px-2 py-1 font-medium">ถูก/ตำแหน่ง</th>
            <th className="border px-2 py-1 font-medium">ครั้งที่</th>
          </tr>
        </thead>
        <tbody className="">
          {results.map((result, index) => (
            <tr key={index} className="text-center">
              <td className="border px-2 py-1 font-medium bg-[#a1cdcc]">
                {correctAnswer}
              </td>
              <td className="border px-2 py-1 font-medium">{result.guess}</td>
              <td className="border px-2 py-1 font-medium">
                {result.countCorrect}
              </td>
              <td className="border px-2 py-1 font-medium">
                {result.positionCorrect}
              </td>
              <td className="border px-2 py-1 font-medium">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {results.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded"
            onClick={() => {
              setResults([]);
              setInputs(["", "", "", ""]);
              inputRefs[0].current?.focus();
            }}
          >
            ล้างข้อมูล
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;
