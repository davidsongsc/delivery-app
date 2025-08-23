import HeaderPage from '@/components/header/site'
import FooterSection from '@/components/MiniComponents/Footer'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPage />
      <main className="flex-1">
        {children}
      </main>
      <FooterSection />
    </div>
  )
}
