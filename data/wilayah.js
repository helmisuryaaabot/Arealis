// Daftar wilayah Indonesia (provinsi sampai desa) dari API publik Emsifa. Jika gagal dimuat, formulir otomatis beralih ke isian manual.
export const WILAYAH_API = "https://www.emsifa.com/api-wilayah-indonesia/api";
const PATH = { prov: () => "provinces", city: (id) => "regencies/" + id, dist: (id) => "districts/" + id, vill: (id) => "villages/" + id };
export async function getList(level, id) {
  const res = await fetch(WILAYAH_API + "/" + PATH[level](id) + ".json");
  if (!res.ok) throw new Error("gagal memuat wilayah");
  return res.json();
}
