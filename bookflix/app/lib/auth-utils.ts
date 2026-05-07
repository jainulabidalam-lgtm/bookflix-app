import { createClient } from "./supabase/client";

export async function devLogin() {
  const mockUser = {
    id: "dev-user-id",
    email: "dev@example.com",
    user_metadata: {
      full_name: "Developer Admin",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev"
    }
  };
  localStorage.setItem("dev_user", JSON.stringify(mockUser));
  window.location.reload();
}

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("Google Auth Error:", error.message);
    return devLogin();
  }

  return { data, error: null };
}

export async function signOut() {
  // Clear any legacy mock sessions
  localStorage.removeItem("mock_session");
  localStorage.removeItem("dev_user");

  const supabase = createClient();
  
  await supabase.auth.signOut();
  window.location.href = "/";
}

