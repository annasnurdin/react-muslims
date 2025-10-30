import { useEffect, useState } from "react";
import { ambilSuratQuran } from "../../api/axios";
import { Link } from "react-router";

type QuranList = {
  name_en: string;
  name_id: string;
  name_long: string;
  name_short: string;
  number: number;
  number_of_verses: number;
};
export default function Quran() {
  const [surats, setSurats] = useState<QuranList[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedSurat = localStorage.getItem("surat");
    if (storedSurat) {
      setLoading(false);
      const parsedData = JSON.parse(storedSurat);
      setSurats(parsedData);
      return;
    }
    const loadSurat = async () => {
      try {
        setLoading(true);
        const data = await ambilSuratQuran();
        // console.log(data);
        setSurats(data);
        localStorage.setItem("surat", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadSurat();
    console.log("ambil surat");
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Quran</div>
          <div className=" flex justify-center items-center flex-col">
            {surats.map((s, index) => (
              <Link
                className="border-2 my-2 flex justify-between w-1/2 rounded-md py-3 px-2 bg-white"
                key={index}
                to={`/quran/${s.number}`}
              >
                <div>{s.number}</div>
                <p className="font-bold">
                  {s.name_id}: {s.number_of_verses}
                </p>
                <div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
