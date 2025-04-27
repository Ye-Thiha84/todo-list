import { supabase } from "../../lib/supabase";

export async function get() {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return new Response(JSON.stringify({ todos: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function post({ request }) {
  try {
    const { text, completed } = await request.json();
    const { data, error } = await supabase
      .from("todos")
      .insert([{ text, completed }])
      .select();
    if (error) throw error;
    return new Response(JSON.stringify(data[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function put({ request }) {
  try {
    const { id, text, completed } = await request.json();
    const updates = {};
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;
    const { error } = await supabase.from("todos").update(updates).eq("id", id);
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function del({ request }) {
  try {
    const { id } = await request.json();
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
