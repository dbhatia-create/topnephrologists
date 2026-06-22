import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getCache, setCache } from "@/lib/availabilityCache";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const credentials = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

// GET /api/cities/availability?city=Denver&state=CO
// Returns { taken: boolean } — one Featured slot per city total
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  if (!city || !state) {
    return NextResponse.json({ taken: false });
  }

  const cacheKey = `${city}|${state}`;
  const cached = getCache(cacheKey);
  if (cached !== null) {
    return NextResponse.json({ taken: cached.length > 0 });
  }

  const auth = getAuth();
  const sheetId = process.env.LEADS_SHEET_ID;
  if (!auth || !sheetId) {
    return NextResponse.json({ taken: false });
  }

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client as never });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Featured-Placement-City!A:E",
    });

    const rows = res.data.values ?? [];
    let taken = false;

    for (const row of rows.slice(1)) {
      const [rowState, rowCity, status] = row as string[];
      if (!rowState || !rowCity || status === "cancelled") continue;
      if (rowCity === city && rowState === state) {
        taken = true;
        break;
      }
    }

    setCache(cacheKey, taken ? [cacheKey] : []);
    return NextResponse.json({ taken });
  } catch (err) {
    console.error("[availability] Sheet read error:", err);
    return NextResponse.json({ taken: false });
  }
}
