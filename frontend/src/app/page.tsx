'use client'

export default function Home() {
  return (
    <div className="flex items-center justify-around min-h-[calc(100vh-8rem)]">
      <div className="flex">
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/"}>home</div>
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/login"}>login</div>
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/dashboard"}>dashboard</div>
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/produtos"}>produtos</div>
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/novo-pedido"}>novo pedido</div>
        <div className="h-10 min-w-32 items-center text-center" onClick={() => window.location.href="/pedidos"}>pedidos</div>
      </div>
    </div>
  );
}
