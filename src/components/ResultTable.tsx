type Result = {
  guess: string;
  countCorrect: number;
  positionCorrect: number;
};

type ResultTableProps = {
  results: Result[];
  correctAnswer: string;
};

const ResultTable = ({ results, correctAnswer }: ResultTableProps) => {
  return (
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
      <tbody>
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
  );
};

export default ResultTable;
