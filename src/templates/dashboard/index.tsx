import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login'); // Redireciona para login depois do logout
    };
    return <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Página protegida!</h1>

        {user ? (
            <div className="mb-4">
                <p className="text-lg">Usuário logado: <strong>{user.first_name}</strong></p>
                <p className="text-lg">Email: <strong>{user.email}</strong></p>
            </div>
        ) : (
            <p>Carregando informações do usuário...</p>
        )}

        <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            Sair
        </button>
    </div>;
}