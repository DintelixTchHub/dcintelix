import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiCheckCircle, FiClock, FiDollarSign, FiLoader, FiMapPin, FiSend } from 'react-icons/fi';
import SEO from '../components/SEO';
import { fetchPublicJobById, fetchPublicJobBySlug, resetCareerSubmitStatus, submitJobApplication } from '../store/careersSlice';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  coverLetter: '',
  resumeUrl: '',
};

const formatMoney = (value) => {
  if (value === null || value === undefined || value === '') return 'Compensation details available';
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatClosingDate = (value) => {
  if (!value) return null;
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
};

export default function CareerDetails() {
  const { identifier } = useParams();
  const dispatch = useDispatch();
  const { selectedPublicJob, status, error, submitStatus, submitError } = useSelector((state) => state.careers);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const isTraining = true;
  const isClosed = String(selectedPublicJob?.status || '').toUpperCase() === 'CLOSED'
    || (selectedPublicJob?.closesAt && new Date(selectedPublicJob.closesAt).getTime() <= Date.now());

  useEffect(() => {
    if (!identifier) return;

    if (/^\d+$/.test(identifier)) {
      dispatch(fetchPublicJobById(identifier));
    } else {
      dispatch(fetchPublicJobBySlug(identifier));
    }

    dispatch(resetCareerSubmitStatus());
  }, [dispatch, identifier]);

  useEffect(() => {
    if (submitStatus === 'succeeded') {
      setSubmitted(true);
      setForm(initialForm);
    }
  }, [submitStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedPublicJob) return;

    dispatch(submitJobApplication({
      jobId: selectedPublicJob.id,
      payload: {
        ...form,
        coverLetter: form.coverLetter || '',
      },
    }));
  };

  const responsibilities = useMemo(() => selectedPublicJob?.responsibilities || [], [selectedPublicJob]);
  const requirements = useMemo(() => selectedPublicJob?.requirements || [], [selectedPublicJob]);

  if (status === 'loading' || !selectedPublicJob) {
    return (
      <div className="pt-16 min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-[#0D6D63] flex items-center gap-3 text-lg font-medium">
          <FiLoader className="w-5 h-5 animate-spin" /> Loading training opportunity...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-xl w-full text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Training opportunity unavailable</h1>
          <p className="text-[#475569] mb-6">{error}</p>
          <Link to="/careers" className="inline-flex items-center gap-2 text-[#0D6D63] font-medium">
            <FiArrowLeft className="w-4 h-4" /> Back to careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${selectedPublicJob.title} | DCintelix Careers`}
        description={selectedPublicJob.description}
        url={`https://www.dcintelix.rw/careers/${selectedPublicJob.slug}`}
      />

      <div className="pt-16 bg-[#F8FAFC] min-h-screen">
        <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/careers" className="inline-flex items-center gap-2 text-[#0D6D63] font-medium text-sm mb-6">
              <FiArrowLeft className="w-4 h-4" /> Back to careers
            </Link>

            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="bg-[#0D6D63]/10 text-[#0D6D63] px-2.5 py-1 rounded-full text-xs font-medium">{isTraining ? 'TRAINING' : (selectedPublicJob.opportunityType || 'ROLE')}</span>
                <span className="bg-[#E2E8F0] text-[#475569] px-2.5 py-1 rounded-full text-xs font-medium">{selectedPublicJob.workMode || 'REMOTE'}</span>
                {isClosed && <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium">CLOSED</span>}
              </div>

              <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight">{selectedPublicJob.title}</h1>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#475569]">
                    <span className="inline-flex items-center gap-2"><FiMapPin className="w-4 h-4" /> {selectedPublicJob.location || 'Remote'}</span>
                    <span className="inline-flex items-center gap-2"><FiBriefcase className="w-4 h-4" /> {selectedPublicJob.employmentType || 'FULL_TIME'}</span>
                    <span className="inline-flex items-center gap-2"><FiDollarSign className="w-4 h-4" /> {formatMoney(selectedPublicJob.monthlyFee)}</span>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 h-fit">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#64748B] mb-2">Quick facts</p>
                  <ul className="space-y-3 text-sm text-[#475569]">
                    <li className="flex items-center gap-2"><FiClock className="w-4 h-4 text-[#0D6D63]" /> {selectedPublicJob.durationMonths ? `${selectedPublicJob.durationMonths} months` : 'Flexible duration'}</li>
                    <li className="flex items-center gap-2"><FiBriefcase className="w-4 h-4 text-[#0D6D63]" /> {selectedPublicJob.department || 'Product & Design'}</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="w-4 h-4 text-[#0D6D63]" /> {isClosed ? 'Closed' : 'Open'}</li>
                    {selectedPublicJob.closesAt && <li className="flex items-center gap-2"><FiClock className="w-4 h-4 text-[#0D6D63]" /> Closes {formatClosingDate(selectedPublicJob.closesAt)}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8">
              <div className="space-y-8">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Training description</h2>
                  <p className="text-[#475569] leading-relaxed whitespace-pre-line">{selectedPublicJob.description}</p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Responsibilities</h2>
                  <ul className="space-y-3 text-[#475569]">
                    {responsibilities.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <FiCheckCircle className="w-5 h-5 text-[#0D6D63] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Requirements</h2>
                  <ul className="space-y-3 text-[#475569]">
                    {requirements.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <FiCheckCircle className="w-5 h-5 text-[#0D6D63] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm h-fit">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Apply for training</h2>
                <p className="text-sm text-[#64748B] mb-5">Submit your details to join this training opportunity.</p>

                {isClosed ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Applications are closed</h3>
                    <p className="text-[#475569]">This training opportunity is no longer accepting applications.</p>
                  </div>
                ) : submitted ? (
                  <div className="bg-[#0D6D63]/5 border border-[#0D6D63]/20 rounded-xl p-5 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#0D6D63] text-white flex items-center justify-center mb-3">
                      <FiCheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Application submitted</h3>
                    <p className="text-[#475569]">Thank you for applying. Our team will review your submission and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Full name</label>
                      <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-[#DCE5E8] rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Email address</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-[#DCE5E8] rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCE5E8] rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Portfolio or resume URL</label>
                      <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCE5E8] rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" placeholder="https://..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-2">Why do you want to join this training?</label>
                      <textarea name="coverLetter" rows="6" value={form.coverLetter} onChange={handleChange} className="w-full px-4 py-3 border border-[#DCE5E8] rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" />
                    </div>

                    {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}

                    <button type="submit" disabled={submitStatus === 'loading'} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0D6D63] text-white rounded-lg font-medium hover:bg-[#09534C] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitStatus === 'loading' ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSend className="w-4 h-4" />}
                      {submitStatus === 'loading' ? 'Submitting...' : 'Submit application'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
