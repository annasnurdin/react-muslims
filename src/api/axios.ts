import axios from "axios";

const today = new Date();
const BULAN = today.getMonth() + 1;

//BASE URL
export const muslimApi = axios.create({
  baseURL: "https://api.myquran.com/v2",
});

//Ambil Jadwal Sholat Jogja
export const ambilJadwalJogja = async () => {
  console.log(BULAN);
  const data = await muslimApi({
    url: `sholat/jadwal/1505/2025/${BULAN}`,
    method: "get",
  });
  return data.data.data;
};

export const ambilSuratQuran = async () => {
  const data = await muslimApi({
    url: "quran/surat/semua",
    method: "get",
  });
  return data.data.data;
};

const AYAT_PER_HALAMAN = 30;

export const ambilAyatSatuSurat = async (
  nomorSurat: string | undefined,
  page: number
) => {
  try {
    const { number_of_verses, name_id } = await muslimApi({
      url: `quran/surat/${nomorSurat}`,
    }).then((res) => res.data.data);

    const startAyat = (page - 1) * AYAT_PER_HALAMAN + 1;

    //Ambil data 30 ayat saja
    const data = await muslimApi({
      url: `quran/ayat/${nomorSurat}/${startAyat}/30`,
      method: "get",
    });

    const dataAyat = data.data.data;
    const totalPages = Math.ceil(number_of_verses / AYAT_PER_HALAMAN);

    return {
      data: dataAyat,
      namaSurat: name_id,
      pages: totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

export const ambilAsmaulHusna = async () => {
  const data = await muslimApi({
    url: `husna/semua`,
    method: "get",
  });
  return data.data.data;
};
