import { useState, useRef } from "react";
import InputBox from "../components/InputBox";
import ResultTable from "../components/ResultTable";

const correctAnswer = "ABCD";

type Result = {
  guess: string;
  countCorrect: number;
  positionCorrect: number;
};

const Home = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [results, setResults] = useState<Result[]>([]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const checkAnswer = (guess: string) => {
    if (guess.length !== 4) {
      alert("กรุณากรอกตัวอักษรภาษาอังกฤษให้ครบ 4 ตัว");
      return;
    }

    if (results.length + 1 > 10) {
      alert("คุณเดาได้ครบ 10 ครั้งแล้ว \nกรุณากรอกใหม่อีกครั้ง");
      setResults([]);
      setInputs(["", "", "", ""]);
      inputRefs[0].current?.focus();
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
    <div className="p-4 max-w-xl mx-auto">
      <div className="font-prompt text-2xl font-bold mb-4 text-center text-white bg-[#77ade9] rounded-2xl p-2">
        มาทายตัวอักษรภาษาอังกฤษ 4 ตัวกันเถอะ
      </div>

      <InputBox
        inputs={inputs}
        inputRefs={inputRefs}
        onUpdateInputs={setInputs}
        onCheckAnswer={checkAnswer}
      />

      <ResultTable results={results} correctAnswer={correctAnswer} />

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

export default Home;
