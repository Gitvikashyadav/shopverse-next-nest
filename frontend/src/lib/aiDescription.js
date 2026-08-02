import { api } from "@/lib/api";

export async function generateDescription({ name, price, category = "" }) {
  try {
    const { description } = await api.generateDescription({ name, price, category });
    return description;
  } catch {
    // Local placeholder until the AI endpoint is live
    await new Promise((r) => setTimeout(r, 900));
    return `Crafted with intent, the ${name} balances refined materials with everyday ease. ` +
      `Clean lines, considered proportions and a finish that holds its shape season after season. ` +
      `A quiet statement piece at $${price} — designed to be worn, not stored.`;
  }
}
