// 🔗 BASE API (Supabase REST)
const BASE = "https://zxewnhxxojggatsyukif.supabase.co/rest/v1/";

// 🔑 API KEY
const KEY = "sb_publishable_AGpmkNidqBHY_dnz_TRJ0g_ZarfbeQi";

// 📦 HEADER dùng chung
function headers() {
  return {
    "apikey": KEY,
    "Authorization": "Bearer " + KEY,
    "Content-Type": "application/json",
    "Prefer": "return=representation" // 👉 giúp trả về data sau khi insert/update
  };
}
