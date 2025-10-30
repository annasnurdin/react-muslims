import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ambilAyatSatuSurat } from "../../api/axios";
type Ayats = {
  id: string;
  arab: string;
  ayah: string;
  latin: string;
};
export default function Surat() {
  const [ayats, setAyats] = useState<Ayats[]>([]);
  const [namaSurat, setNamaSurat] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { nomorSurat } = useParams<string>();

  useEffect(() => {
    const loadAyat = async (cp: number) => {
      try {
        // console.log("cp " + cp);
        setLoading(true);
        const hasil = await ambilAyatSatuSurat(nomorSurat, cp);
        setAyats(hasil?.data || []);
        setNamaSurat(hasil?.namaSurat || "");
        setTotalPages(hasil?.pages || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadAyat(currentPage);
  }, [currentPage]);

  const pagesArray = [...Array(totalPages).keys()].map((i) => i + 1);
  const handleChangeCurrentPage = (n: number) => {
    setCurrentPage(n);
  };
  return (
    <>
      <div>
        <Link to="/quran">Quran</Link> / {namaSurat}
      </div>
      <div className=" flex justify-center items-center flex-col">
        {loading ? (
          <div>Loading...</div>
        ) : (
          ayats.map((a) => (
            <div
              className="text-lg my-2 flex justify-between w-full py-3 px-2 bg-white border-b-2 border-gray-200"
              key={a.id}
            >
              <div className="flex-none pr-3 text-gray-500">( {a.ayah} )</div>
              <div>
                <div className="text-right font-[Noto_Naskh_Arabic] text-2xl">
                  {a.arab}
                </div>
                <div className="text-right">{a.latin}</div>
              </div>
            </div>
          ))
        )}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl border-gray-700 p-3 animate-fade-in">
              <button
                onClick={() => handleChangeCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
              >
                <i className="fa fa-chevron-left mr-2"></i> Previous
              </button>

              {pagesArray.map((p) => (
                <button
                  key={p}
                  onClick={() => handleChangeCurrentPage(p)}
                  className={`px-4 py-2 ${
                    p === currentPage
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gradient text-white"
                  }  rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => handleChangeCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
              >
                Next <i className="fa fa-chevron-right ml-2"></i>
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
