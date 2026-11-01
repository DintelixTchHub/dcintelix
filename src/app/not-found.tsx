import PublicShell from '../components/PublicShell'

export default function NotFound() {
  return (
    <PublicShell>
      <section className="flex min-h-[65vh] items-center justify-center bg-[#F8FAFC] px-4 pt-16 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0D6D63]">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#0F172A]">
            Page not found
          </h1>
          <p className="mt-3 text-[#475569]">
            The page you are looking for does not exist.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#0D6D63] px-5 py-3 text-sm font-medium text-white"
          >
            Return home
          </a>
        </div>
      </section>
    </PublicShell>
  )
}
