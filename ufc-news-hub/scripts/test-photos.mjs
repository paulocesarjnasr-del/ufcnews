async function getPhoto(name) {
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const url = "https://www.ufc.com/athlete/" + slug;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
      redirect: "follow",
    });
    if (res.status !== 200) return { name, status: res.status, photo: null };
    const html = await res.text();
    const match = html.match(/athlete_bio_full_body\/s3\/([^"?\s]+)/);
    if (match) {
      return { name, status: 200, photo: "https://ufc.com/images/styles/athlete_bio_full_body/s3/" + match[1] };
    }
    return { name, status: 200, photo: "not found in page" };
  } catch (e) {
    return { name, status: "error", photo: e.message };
  }
}

const names = [
  "Alex Pereira", "Jon Jones", "Ilia Topuria", "Dricus Du Plessis",
  "Conor McGregor", "Amanda Nunes", "Anderson Silva", "Islam Makhachev"
];

for (const name of names) {
  const r = await getPhoto(name);
  const ok = r.status === 200 && r.photo && !r.photo.includes("not found");
  console.log(ok ? "OK  " : "FAIL", "|", name, "|", String(r.photo).substring(0, 90));
  await new Promise(r => setTimeout(r, 500));
}
