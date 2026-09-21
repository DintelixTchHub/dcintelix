import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  FiMessageSquare, 
  FiUsers, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight,
  FiMenu,
  FiX,
  FiUser,
  FiSend,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiBriefcase,
  FiPlus,
  FiEdit
} from 'react-icons/fi';
import { fetchContacts, deleteContact, replyToContact } from '../store/contactSlice';
import { fetchSubscribers, fetchSubscriberStats, deleteSubscriber, sendBulkNewsletter, resetSendStatus } from '../store/newsletterSlice';
import { fetchAdminTestimonials, updateTestimonial, deleteTestimonial } from '../store/testimonialsSlice';
import {
  fetchAdminJobs,
  fetchAdminApplications,
  updateJob,
  deleteJob,
  updateApplication,
  deleteApplication,
} from '../store/careersSlice';
import { logout, checkAuth } from '../store/authSlice';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [replyForm, setReplyForm] = useState({ subject: '', message: '' });
  const [newsletterForm, setNewsletterForm] = useState({ subject: '', content: '' });
  const [toast, setToast] = useState(null);
  
  const { user, isAuthenticated, status: authStatus } = useSelector((state) => state.auth);
  const { contacts, pagination: contactPagination, status: contactStatus, replyStatus } = useSelector((state) => state.contact);
  const { subscribers, stats, pagination: subscriberPagination, status: subscriberStatus, sendStatus } = useSelector((state) => state.newsletter);
  const { adminItems: testimonials, adminStatus: testimonialsStatus } = useSelector((state) => state.testimonials);
  const {
    adminJobs,
    adminApplications,
    adminStatus: careersStatus,
    pagination: jobPagination,
    appPagination,
  } = useSelector((state) => state.careers);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authStatus === 'idle' && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authStatus, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
      dispatch(fetchSubscribers());
      dispatch(fetchSubscriberStats());
      dispatch(fetchAdminTestimonials());
      dispatch(fetchAdminJobs());
      dispatch(fetchAdminApplications());
    }
  }, [dispatch, isAuthenticated]);

  // Handle reply status
  useEffect(() => {
    if (replyStatus === 'succeeded') {
      setToast({ type: 'success', message: 'Reply sent successfully!' });
      setShowReplyModal(false);
      setReplyForm({ subject: '', message: '' });
    } else if (replyStatus === 'failed') {
      setToast({ type: 'error', message: 'Failed to send reply' });
    }
  }, [replyStatus]);

  // Handle send newsletter status
  useEffect(() => {
    if (sendStatus === 'succeeded') {
      setToast({ type: 'success', message: 'Newsletter sent successfully!' });
      setShowNewsletterModal(false);
      setNewsletterForm({ subject: '', content: '' });
      dispatch(resetSendStatus());
    } else if (sendStatus === 'failed') {
      setToast({ type: 'error', message: 'Failed to send newsletter' });
      dispatch(resetSendStatus());
    }
  }, [sendStatus, dispatch]);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const loadTabData = (tab) => {
    switch (tab) {
      case 'contacts':
        dispatch(fetchContacts(1));
        break;
      case 'newsletter':
        dispatch(fetchSubscribers(1));
        dispatch(fetchSubscriberStats());
        break;
      case 'testimonials':
        dispatch(fetchAdminTestimonials({ page: 1, limit: 10 }));
        break;
      case 'jobs':
        dispatch(fetchAdminJobs({ page: 1, limit: 10 }));
        break;
      case 'applications':
        dispatch(fetchAdminApplications({ page: 1, limit: 10 }));
        break;
      default:
        break;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadTabData(tab);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      dispatch(deleteContact(id));
      setToast({ type: 'success', message: 'Contact deleted successfully' });
    }
  };

  const handleDeleteSubscriber = (email) => {
    if (window.confirm(`Are you sure you want to delete subscriber: ${email}?`)) {
      dispatch(deleteSubscriber(email));
      setToast({ type: 'success', message: 'Subscriber deleted successfully' });
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowTestimonialModal(true);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleReply = () => {
    if (!replyForm.subject || !replyForm.message) {
      setToast({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    dispatch(replyToContact({ 
      id: selectedContact.id, 
      subject: replyForm.subject, 
      message: replyForm.message 
    }));
  };

  const handleApprovalToggle = (id, currentStatus) => {
    dispatch(updateTestimonial({
      id,
      status: currentStatus === 'APPROVED' ? 'PENDING' : 'APPROVED',
    }));
    setToast({ type: 'success', message: 'Testimonial status updated' });
  };

  const handleDeleteTestimonial = (id) => {
    dispatch(deleteTestimonial(id));
    setToast({ type: 'success', message: 'Testimonial deleted' });
  };

  const handleToggleJobStatus = (id, currentStatus) => {
    dispatch(updateJob({
      id,
      status: currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
    }));
    setToast({ type: 'success', message: 'Job status updated' });
  };

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
    setToast({ type: 'success', message: 'Job deleted' });
  };

  const handleApplicationStatusUpdate = (id, currentStatus) => {
    const nextStatus = currentStatus === 'REVIEWING' ? 'SHORTLISTED' : 'REVIEWING';
    dispatch(updateApplication({ id, status: nextStatus }));
    setToast({ type: 'success', message: 'Application status updated' });
  };

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
    setToast({ type: 'success', message: 'Application deleted' });
  };

  const handleSendNewsletter = () => {
    if (!newsletterForm.subject || !newsletterForm.content) {
      setToast({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    dispatch(sendBulkNewsletter({ 
      subject: newsletterForm.subject, 
      content: newsletterForm.content 
    }));
  };

  const handlePageChange = (page) => {
    if (activeTab === 'contacts') {
      dispatch(fetchContacts(page));
    } else if (activeTab === 'newsletter') {
      dispatch(fetchSubscribers(page));
    }
  };

  const pageTitle = {
    contacts: 'Messages',
    newsletter: 'Subscribers',
    testimonials: 'Testimonials',
    jobs: 'Jobs',
    applications: 'Applications',
  }[activeTab] || 'Dashboard';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border ${
          toast.type === 'success' ? 'border-green-200 bg-green-600 text-white' : 'border-red-200 bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">Message Details</h3>
                  <p className="text-sm text-[#64748B]">{formatDate(selectedContact.createdAt)}</p>
                </div>
                <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Name</p>
                  <p className="font-medium text-[#0F172A]">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Email</p>
                  <p className="font-medium text-[#0F172A]">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Phone</p>
                    <p className="font-medium text-[#0F172A]">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Subject</p>
                  <p className="font-medium text-[#0F172A]">{selectedContact.subject}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] mb-2">Message</p>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[#475569] whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              {selectedContact.attachment && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Attachment</p>
                  <a 
                    href={`http://localhost:5000/${selectedContact.attachment}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0D6D63] hover:text-[#0b5c53] font-medium"
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
              <button 
                onClick={() => handleDeleteContact(selectedContact.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
              <button 
                onClick={() => {
                  setShowContactModal(false);
                  setReplyForm({ 
                    subject: `Re: ${selectedContact.subject}`, 
                    message: '' 
                  });
                  setShowReplyModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors shadow-lg shadow-[#0D6D63]/20"
              >
                <FiSend className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {showReplyModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-xl w-full border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0F172A]">Reply to {selectedContact.name}</h3>
                <button onClick={() => setShowReplyModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-[#64748B]">To: {selectedContact.email}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Subject</label>
                <input
                  type="text"
                  value={replyForm.subject}
                  onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#D9E1E7] rounded-xl focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] outline-none bg-white text-[#0F172A]"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Message</label>
                <textarea
                  value={replyForm.message}
                  onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-[#D9E1E7] rounded-xl focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] outline-none resize-none bg-white text-[#0F172A]"
                  placeholder="Enter your message"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-end gap-3">
              <button 
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2.5 text-[#475569] hover:bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReply}
                disabled={replyStatus === 'loading'}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors disabled:opacity-50 shadow-lg shadow-[#0D6D63]/20"
              >
                {replyStatus === 'loading' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <FiSend className="w-4 h-4" />
                )}
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-xl w-full border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0F172A]">Send Newsletter</h3>
                <button onClick={() => setShowNewsletterModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-[#64748B]">To: All {stats.active} active subscribers</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Subject</label>
                <input
                  type="text"
                  value={newsletterForm.subject}
                  onChange={(e) => setNewsletterForm({ ...newsletterForm, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#D9E1E7] rounded-xl focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] outline-none bg-white text-[#0F172A]"
                  placeholder="Enter newsletter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Content</label>
                <textarea
                  value={newsletterForm.content}
                  onChange={(e) => setNewsletterForm({ ...newsletterForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-[#D9E1E7] rounded-xl focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] outline-none resize-none bg-white text-[#0F172A]"
                  placeholder="Enter newsletter content"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-end gap-3">
              <button 
                onClick={() => setShowNewsletterModal(false)}
                className="px-4 py-2.5 text-[#475569] hover:bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendNewsletter}
                disabled={sendStatus === 'loading'}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors disabled:opacity-50 shadow-lg shadow-[#0D6D63]/20"
              >
                {sendStatus === 'loading' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <FiSend className="w-4 h-4" />
                )}
                Send to All
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#070707]">Application Details</h3>
                <p className="text-sm text-[#64748B]">{formatDate(selectedApplication.createdAt || selectedApplication.date || new Date().toISOString())}</p>
              </div>
              <button onClick={() => setShowApplicationModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Applicant</p>
                  <p className="font-medium text-[#000000]">{selectedApplication.name}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Email</p>
                  <p className="font-medium text-[#000000]">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Role</p>
                  <p className="font-medium text-[#000000]">{selectedApplication.job?.title || 'General application'}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Status</p>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${selectedApplication.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' : selectedApplication.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>

              {selectedApplication.phone && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Phone</p>
                  <p className="font-medium text-[#000000]">{selectedApplication.phone}</p>
                </div>
              )}

              {(selectedApplication.coverLetter || selectedApplication.message) && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] mb-2">Cover Letter / Message</p>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[#475569] whitespace-pre-wrap">
                    {selectedApplication.coverLetter || selectedApplication.message || '—'}
                  </div>
                </div>
              )}

              {(selectedApplication.cv || selectedApplication.resume || selectedApplication.attachment) && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Attachment</p>
                  <a
                    href={selectedApplication.cv || selectedApplication.resume || selectedApplication.attachment}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0D6D63] hover:text-[#0b5c53] font-medium"
                  >
                    Open attachment
                  </a>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
              <button onClick={() => handleDeleteApplication(selectedApplication.id)} className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100">
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
              <button onClick={() => handleApplicationStatusUpdate(selectedApplication.id, selectedApplication.status)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors shadow-lg shadow-[#0D6D63]/20">
                <FiCheckCircle className="w-4 h-4" />
                {selectedApplication.status === 'SHORTLISTED' ? 'Move Back' : 'Advance'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestimonialModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-xl w-full border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Testimonial Details</h3>
                <p className="text-sm text-[#64748B]">{selectedTestimonial.name}</p>
              </div>
              <button onClick={() => setShowTestimonialModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Name</p>
                  <p className="font-medium text-[#0F172A]">{selectedTestimonial.name}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Role</p>
                  <p className="font-medium text-[#0F172A]">{selectedTestimonial.role || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Status</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${selectedTestimonial.status === 'APPROVED' ? 'bg-green-100 text-green-700' : selectedTestimonial.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {selectedTestimonial.status}
                </span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] mb-2">Message</p>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[#475569] whitespace-pre-wrap">
                  {selectedTestimonial.testimonial || selectedTestimonial.message || '—'}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
              <button onClick={() => handleDeleteTestimonial(selectedTestimonial.id)} className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100">
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
              <button onClick={() => handleApprovalToggle(selectedTestimonial.id, selectedTestimonial.status)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors shadow-lg shadow-[#0D6D63]/20">
                <FiCheckCircle className="w-4 h-4" />
                {selectedTestimonial.status === 'APPROVED' ? 'Set Pending' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_rgba(15,23,42,0.18)] max-w-xl w-full border border-[#E2E8F0]">
            <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">Job Details</h3>
                <p className="text-sm text-[#64748B]">{selectedJob.title}</p>
              </div>
              <button onClick={() => setShowJobModal(false)} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#475569]">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Location</p>
                  <p className="font-medium text-[#0F172A]">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Type</p>
                  <p className="font-medium text-[#0F172A]">{selectedJob.employmentType}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Status</p>
                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${selectedJob.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
                  {selectedJob.status}
                </span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] mb-2">Description</p>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[#475569] whitespace-pre-wrap">
                  {selectedJob.description || 'No description provided.'}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#E2E8F0] flex justify-between">
              <button onClick={() => handleDeleteJob(selectedJob.id)} className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100">
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
              <button onClick={() => navigate(`/admin/jobs/${selectedJob.id}/edit`)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors shadow-lg shadow-[#0D6D63]/20">
                <FiEdit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminSidebar
        user={user}
        activeTab={activeTab}
        isOpen={sidebarOpen}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-[#F8FAFC] text-[#475569]">
            {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-semibold text-[#0F172A]">{pageTitle}</h2>
          <a href="/" className="text-[#0D6D63] hover:text-[#0b5c53] text-xs font-medium">View Site →</a>
        </header>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            {[{ label: 'Messages', value: contactPagination.total, icon: FiMessageSquare, color: 'bg-[#0D6D63]/10 text-[#0D6D63]' }, { label: 'Active Subs', value: stats.active, icon: FiUsers, color: 'bg-[#0D6D63]/10 text-[#0D6D63]' }, { label: 'Total Subs', value: stats.total, icon: FiSend, color: 'bg-purple-100 text-purple-600' }, { label: 'Testimonials', value: testimonials.length, icon: FiUser, color: 'bg-amber-100 text-amber-600' }, { label: 'Jobs', value: adminJobs.length, icon: FiBriefcase, color: 'bg-indigo-100 text-indigo-600' }, { label: 'Applications', value: adminApplications.length, icon: FiCheckCircle, color: 'bg-emerald-100 text-emerald-600' }].map((item) => (
              <div key={item.label} className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">{item.label}</p>
                    <p className="text-xl font-bold text-[#0F172A] mt-1">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            {activeTab === 'contacts' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Name</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Email</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Subject</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Status</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Date</th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {contactStatus === 'loading' ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#0D6D63]"></div>
                          </div>
                        </td>
                      </tr>
                    ) : contacts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-[#64748B]">No messages yet — you're all caught up!</td>
                      </tr>
                    ) : (
                      contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium text-[#0F172A]">{contact.name}</p>
                            {contact.phone && <p className="text-xs text-[#64748B]">{contact.phone}</p>}
                          </td>
                          <td className="px-4 py-3 text-[#475569]">{contact.email}</td>
                          <td className="px-4 py-3 text-[#475569]">{contact.subject}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${contact.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {contact.isRead ? 'Read' : 'Unread'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#64748B] text-xs">{formatDate(contact.createdAt)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleViewContact(contact)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] text-[11px] font-medium" title="View details">
                                <FiEye className="w-3 h-3" />
                                Details
                              </button>
                              <button onClick={() => handleDeleteContact(contact.id)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-[11px] font-medium" title="Delete">
                                <FiTrash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {contactPagination.pages > 1 && (
                  <div className="px-4 py-3 border-t border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                    <p className="text-xs text-[#64748B]">Page {contactPagination.page} of {contactPagination.pages}</p>
                    <div className="flex gap-1">
                      <button onClick={() => handlePageChange(contactPagination.page - 1)} disabled={contactPagination.page === 1} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-[#E2E8F0]">
                        <FiChevronLeft className="w-4 h-4 text-[#475569]" />
                      </button>
                      <button onClick={() => handlePageChange(contactPagination.page + 1)} disabled={contactPagination.page === contactPagination.pages} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-[#E2E8F0]">
                        <FiChevronRight className="w-4 h-4 text-[#475569]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'newsletter' ? (
              <div>
                <div className="p-4 border-b border-[#E2E8F0] flex justify-end bg-[#F8FAFC]">
                  <button onClick={() => setShowNewsletterModal(true)} disabled={stats.active === 0} className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0D6D63]/20">
                    <FiSend className="w-4 h-4" />
                    Send Newsletter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <tr>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Email</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Status</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Subscribed</th>
                        <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {subscriberStatus === 'loading' ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#0D6D63]"></div>
                            </div>
                          </td>
                        </tr>
                      ) : subscribers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-[#64748B]">No subscribers yet — time to spread the word!</td>
                        </tr>
                      ) : (
                        subscribers.map((subscriber) => (
                          <tr key={subscriber.email} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-4 py-3 text-[#0F172A]">{subscriber.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${subscriber.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {subscriber.isActive ? 'Active' : 'Unsubscribed'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#64748B] text-xs">{formatDate(subscriber.subscribedAt)}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => handleDeleteSubscriber(subscriber.email)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-[11px] font-medium" title="Delete subscriber">
                                <FiTrash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {subscriberPagination.pages > 1 && (
                    <div className="px-4 py-3 border-t border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                      <p className="text-xs text-[#64748B]">Page {subscriberPagination.page} of {subscriberPagination.pages}</p>
                      <div className="flex gap-1">
                        <button onClick={() => handlePageChange(subscriberPagination.page - 1)} disabled={subscriberPagination.page === 1} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-[#E2E8F0]">
                          <FiChevronLeft className="w-4 h-4 text-[#475569]" />
                        </button>
                        <button onClick={() => handlePageChange(subscriberPagination.page + 1)} disabled={subscriberPagination.page === subscriberPagination.pages} className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-[#E2E8F0]">
                          <FiChevronRight className="w-4 h-4 text-[#475569]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === 'testimonials' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Name</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Role</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Status</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Message</th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {testimonialsStatus === 'loading' ? (
                      <tr><td colSpan="5" className="px-4 py-8 text-center text-[#64748B]">Loading...</td></tr>
                    ) : testimonials.length === 0 ? (
                      <tr><td colSpan="5" className="px-4 py-8 text-center text-[#64748B]">No testimonials found.</td></tr>
                    ) : testimonials.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-4 py-3 text-[#0F172A]">{item.name}</td>
                        <td className="px-4 py-3 text-[#475569]">{item.role || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${item.status === 'APPROVED' ? 'bg-green-100 text-green-700' : item.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#475569] max-w-md break-words">{item.testimonial || item.message}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleViewTestimonial(item)} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]">
                              <FiEye className="w-3 h-3" />
                              View
                            </button>
                            <button onClick={() => handleApprovalToggle(item.id, item.status)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-[#0D6D63] text-white hover:bg-[#0b5c53]">{item.status === 'APPROVED' ? 'Set Pending' : 'Approve'}</button>
                            <button onClick={() => handleDeleteTestimonial(item.id)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'jobs' ? (
              <div>
                <div className="p-4 border-b border-[#E2E8F0] flex flex-wrap justify-end gap-2 bg-[#F8FAFC]">
                  <button onClick={() => navigate('/admin/jobs/new')} className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6D63] text-white rounded-xl hover:bg-[#0b5c53] transition-colors shadow-lg shadow-[#0D6D63]/20">
                    <FiPlus className="w-4 h-4" />
                    Post a job
                  </button>
                  <button onClick={() => navigate('/admin/training/new')} className="flex items-center gap-2 px-4 py-2.5 bg-[#F59E0B] text-white rounded-xl hover:bg-[#d97706] transition-colors shadow-lg shadow-[#F59E0B]/20">
                    <FiPlus className="w-4 h-4" />
                    Post training
                  </button>
                  <button onClick={() => navigate('/admin/internships/new')} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                    <FiPlus className="w-4 h-4" />
                    Post internship
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <tr>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Title</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Status</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Location</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Type</th>
                        <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {careersStatus === 'loading' ? (
                        <tr><td colSpan="5" className="px-4 py-8 text-center text-[#64748B]">Loading...</td></tr>
                      ) : adminJobs.length === 0 ? (
                        <tr><td colSpan="5" className="px-4 py-8 text-center text-[#64748B]">No jobs found.</td></tr>
                      ) : adminJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-4 py-3 text-[#0F172A]">{job.title}</td>
                          <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${job.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>{job.status}</span></td>
                          <td className="px-4 py-3 text-[#475569]">{job.location}</td>
                          <td className="px-4 py-3 text-[#475569]">{job.employmentType}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleViewJob(job)} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]">
                                <FiEye className="w-3 h-3" />
                                View
                              </button>
                              <button onClick={() => navigate(`/admin/jobs/${job.id}/edit`)} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]">
                                <FiEdit className="w-3 h-3" />
                                Edit
                              </button>
                              <button onClick={() => handleToggleJobStatus(job.id, job.status)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-[#0D6D63] text-white hover:bg-[#0b5c53]">{job.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</button>
                              <button onClick={() => handleDeleteJob(job.id)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Applicant</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Role</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Status</th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.16em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {careersStatus === 'loading' ? (
                      <tr><td colSpan="4" className="px-4 py-8 text-center text-[#64748B]">Loading...</td></tr>
                    ) : adminApplications.length === 0 ? (
                      <tr><td colSpan="4" className="px-4 py-8 text-center text-[#64748B]">No applications found.</td></tr>
                    ) : adminApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-4 py-3 text-[#0F172A]">{app.name}</td>
                        <td className="px-4 py-3 text-[#475569]">{app.job?.title || 'General'}</td>
                        <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${app.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' : app.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{app.status}</span></td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleViewApplication(app)} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]">
                              <FiEye className="w-3 h-3" />
                              View
                            </button>
                            <button onClick={() => handleApplicationStatusUpdate(app.id, app.status)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-[#0D6D63] text-white hover:bg-[#0b5c53]">Advance</button>
                            <button onClick={() => handleDeleteApplication(app.id)} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

