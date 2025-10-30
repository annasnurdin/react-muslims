import { useEffect, useState } from "react";
import { ambilAsmaulHusna } from "../api/axios";

type AsmaulHusna = {
  arab: string;
  id: number;
  indo: string;
  latin: string;
};
export default function AsmaulHusna() {
  const [asma, setAsma] = useState<AsmaulHusna[]>([]);
  const [loading, setLoading] = useState(false);
  const [jumlahKolom, setJumlahKolom] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await ambilAsmaulHusna();
        setAsma(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleJumlahKolom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJumlahKolom(e.target.value);
  };
  const getKolom = (kolom: string) => {
    switch (kolom) {
      case "1":
        return "lg:w-full";
      case "2":
        return "lg:w-[40%]";
      case "3":
        return "lg:w-[30%]";
      case "4":
        return "lg:w-[20%]";
      case "5":
        return "lg:w-[16%]";
      case "6":
        return "lg:w-[15%]";
      case "7":
        return "lg:w-[13%]";
      case "8":
        return "lg:w-[11%]";
      case "9":
        return "lg:w-[10%]";
    }
  };

  return (
    <>
      Sort: Kolom:
      {/* <input type="text" placeholder="Jumlah Kolom" onChange={handleJumlahKolom} /> */}
      <select name="kolom" id="kolom" onChange={handleJumlahKolom}>
        <option value="">Pilih jumlah Kolom</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <div
        className="w-full flex flex-wrap justify-center items-center"
        dir="rtl"
      >
        {asma.map((a) => (
          <div
            key={a.id}
            className={`bg-fuchsia-300 shadow-lg rounded mx-1 my-2 px-1 py-4 ${getKolom(
              jumlahKolom
            )} text-center rtl`}
          >
            {a.arab}
          </div>
        ))}
      </div>
    </>
  );
}
