import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones para obtener datos de Supabase
export const getTiposDeHelados = async () => {
  try {
    const { data, error } = await supabase
      .from("tipodehelados")
      .select("*")
      .order("precio", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener tipos de helados:", error);
    return [];
  }
};

export const getGustosDeHelados = async () => {
  try {
    const { data, error } = await supabase
      .from("helados")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      console.error("❌ ERROR SUPABASE:", JSON.stringify(error, null, 2));
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error al obtener gustos de helados:", error);
    return [];
  }
};

export const getPostresHelados = async () => {
  try {
    const { data, error } = await supabase
      .from("postreshelados")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener postres helados:", error);
    return [];
  }
};
