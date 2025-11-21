import TodoApp from "../components/TodoApp";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-12 sm:px-8">
      <TodoApp />
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-8 text-slate-300">
        <h2 className="text-xl font-semibold text-white">Why it works</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Elegant Tailwind design keeps the focus on content.</li>
          <li>State updates are immutable, so UI feedback stays in sync.</li>
          <li>Filters, empty states, and validation cover daily scenarios.</li>
        </ul>
      </section>
    </main>
  );
}
