import { useEffect, useState } from "react";
import { ambilJadwalJogja } from "../api/axios";

type JadwalSholat = {
  subuh: string;
  ashar: string;
  date: string;
  dhuha: string;
  dzuhur: string;
  imsak: string;
  isya: string;
  maghrib: string;
  tanggal: string;
  terbit: string;
};

export default function Home() {
  const [jadwalSholat, setJadwalSholat] = useState<JadwalSholat[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedJadwal = localStorage.getItem("jadwal-sholat");
    if (storedJadwal) {
      setLoading(false);
      const parsedData = JSON.parse(storedJadwal);
      setJadwalSholat(parsedData);
      return;
    }
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await ambilJadwalJogja();
        console.log(data.jadwal);
        console.log("AMbil jadwal");
        setJadwalSholat(data.jadwal);
        localStorage.setItem("jadwal-sholat", JSON.stringify(data.jadwal));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    console.log("ambil surat");
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Jadwal Sholat</h1>
            <h2 className="text-lg">D. I. Yogyakarta</h2>
            <select name="kab" id="kab" className="border-2 rounded px-3 py-1">
              <option value="">Pilih</option>
              <option value="">Pilih</option>
              <option value="">Pilih</option>
              <option value="">Pilih</option>
            </select>
            <div className="flex justify-center py-3">
              <table>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Subuh</th>
                    <th>Imsak</th>
                    <th>Dhuhur</th>
                    <th>Ashar</th>
                    <th>Maghrib</th>
                    <th>Isya</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalSholat.map((j, index) => (
                    <tr key={index}>
                      <td>{j.tanggal}</td>
                      <td>{j.subuh}</td>
                      <td>{j.imsak}</td>
                      <td>{j.dzuhur}</td>
                      <td>{j.ashar}</td>
                      <td>{j.maghrib}</td>
                      <td>{j.isya}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
