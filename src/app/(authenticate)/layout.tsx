export default function AuthenticateLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gradient-to-t from-orange-600 to-orange-200 w-full h-dvh">
      <div className="items-center justify-center flex h-dvh">
        <div className="bg-white rounded-lg shadow-lg w-4/12" style={{ padding: 20 }}>
          {children}
        </div>
      </div>
    </main>
  );
}
