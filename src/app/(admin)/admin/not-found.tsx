export default function AdminNotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0D6D63]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#0F172A]">
          Admin page not found
        </h1>
        <a
          href="/admin/login"
          className="mt-6 inline-flex rounded-lg bg-[#0D6D63] px-5 py-3 text-sm font-medium text-white"
        >
          Return to admin login
        </a>
      </div>
    </section>
  )
}
