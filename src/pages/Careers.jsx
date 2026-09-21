import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiCheckCircle, FiLoader } from 'react-icons/fi';
import SEO from '../components/SEO';
import { fetchPublicJobs } from '../store/careersSlice';

const formatMoney = (value) => {
  if (value === null || value === undefined || value === '') return 'Not disclosed';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Careers() {
  const dispatch = useDispatch();
  const { publicJobs, status, error } = useSelector((state) => state.careers);

  useEffect(() => {
    dispatch(fetchPublicJobs());
  }, [dispatch]);

  return (
    <>
      <SEO
        title="Careers at DCintelix"
        description="Join DCintelix and help build digital products for businesses across Rwanda and beyond."
        url="https://www.dcintelix.rw/careers"
      />

      <div className="pt-16 bg-[#F8FAFC] min-h-screen">
        <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-[0.18em] mb-3">
                Careers
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight">
                Build with us.
              </h1>
              <p className="mt-4 text-sm md:text-lg text-[#475569] leading-relaxed">
                We’re building digital experiences for businesses that want serious growth. If you care about clean execution, thoughtful design, and practical impact, you’ll fit right in.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D6D63]/10 text-[#0D6D63] flex items-center justify-center">
                    <FiBriefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">Opportunities</h3>
                </div>
                <p className="text-2xl font-bold text-[#0F172A]">{publicJobs.length}</p>
                <p className="text-sm text-[#64748B] mt-1">Open roles</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D6D63]/10 text-[#0D6D63] flex items-center justify-center">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">Location</h3>
                </div>
                <p className="text-2xl font-bold text-[#0F172A]">Remote</p>
                <p className="text-sm text-[#64748B] mt-1">Hybrid ready</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D6D63]/10 text-[#0D6D63] flex items-center justify-center">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A]">Model</h3>
                </div>
                <p className="text-2xl font-bold text-[#0F172A]">Remote</p>
                <p className="text-sm text-[#64748B] mt-1">Global teams</p>
              </div>
            </div>

            {status === 'loading' ? (
              <div className="flex items-center justify-center py-20 text-[#0D6D63]">
                <FiLoader className="w-6 h-6 animate-spin mr-3" />
                Loading roles...
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
                {error}
              </div>
            ) : publicJobs.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-2">No roles posted yet</h2>
                <p className="text-[#475569]">Check back soon for new opportunities and internship openings.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {publicJobs.map((job) => (
                  <article
                    key={job.id}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                          <span className="bg-[#0D6D63]/10 text-[#0D6D63] px-2.5 py-1 rounded-full">
                            {job.opportunityType || 'ROLE'}
                          </span>
                          <span className="bg-[#E2E8F0] text-[#475569] px-2.5 py-1 rounded-full">
                            {job.workMode || 'REMOTE'}
                          </span>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold text-[#0F172A]">{job.title}</h2>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#475569]">
                            <span className="inline-flex items-center gap-2"><FiMapPin className="w-4 h-4" /> {job.location || 'Remote'}</span>
                            <span className="inline-flex items-center gap-2"><FiBriefcase className="w-4 h-4" /> {job.employmentType || 'FULL_TIME'}</span>
                            <span className="inline-flex items-center gap-2"><FiDollarSign className="w-4 h-4" /> {formatMoney(job.monthlyFee)}</span>
                          </div>
                        </div>

                        <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-3xl">
                          {job.description?.slice(0, 180)}{job.description?.length > 180 ? '...' : ''}
                        </p>
                      </div>

                      <div className="xl:text-right">
                        <Link
                          to={`/careers/${job.id}`}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-[#0D6D63] text-white text-sm font-medium rounded-lg hover:bg-[#09534C] transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#0D6D63]/20"
                        >
                          View role
                          <FiArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0D6D63] rounded-3xl p-8 md:p-12 text-white shadow-xl">
              <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-6 items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/75 mb-3">Why join us</p>
                  <h3 className="text-2xl md:text-4xl font-bold leading-tight">Work on meaningful digital products with a focused team.</h3>
                </div>
                <div className="space-y-3 text-sm text-white/90">
                  <div className="flex items-center gap-3"><FiCheckCircle className="w-5 h-5 text-[#F59E0B]" /> Practical product work</div>
                  <div className="flex items-center gap-3"><FiCheckCircle className="w-5 h-5 text-[#F59E0B]" /> Remote-friendly collaboration</div>
                  <div className="flex items-center gap-3"><FiCheckCircle className="w-5 h-5 text-[#F59E0B]" /> Growth-focused culture</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
