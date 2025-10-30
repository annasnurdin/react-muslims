/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { ambilJadwalJogja } from "../api/axios";
interface JadwalSholatProps {
  children: React.ReactNode;
}
interface JadwalContextValue {
  jadwal: JadwalSholat[];
  loading: boolean;
}
export type JadwalSholat = {
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

const defaultJadwal: JadwalContextValue = {
  jadwal: [],
  loading: false,
};
export const JadwalContext = createContext<JadwalContextValue>(defaultJadwal);

export const useJadwalSholat = () => useContext(JadwalContext);

export default function JadwalSholatContext({ children }: JadwalSholatProps) {
  const [jadwal, setJadwal] = useState<JadwalSholat[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadJadwalJogja = async () => {
      try {
        setLoading(true);
        const data = await ambilJadwalJogja();
        setJadwal(data.jadwal);
        console.log("Ambil Jadwal");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadJadwalJogja();
  }, []);

  const ProviderValue = {
    jadwal,
    loading,
  };
  return <JadwalContext value={ProviderValue}>{children}</JadwalContext>;
}
