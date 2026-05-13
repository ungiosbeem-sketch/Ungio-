// store/AuthContext.tsx dhexdiisa
import { supabase } from '../lib/supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // Markuu app-ku shidmo, hubi haddii qof hore u soo galay uu jiro
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const login = async (email: string) => {
    // Kani wuxuu qofka u soo dirayaa "Magic Link" ama Password hubin
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
