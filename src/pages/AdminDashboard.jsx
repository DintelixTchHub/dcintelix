import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  FiMessageSquare, 
  FiMail, 
  FiUsers, 
  FiLogOut, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight,
  FiMenu,
  FiX,
  FiUser,
  FiSend,
  FiEye,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { fetchContacts, deleteContact, replyToContact } from '../store/contactSlice';
import { fetchSubscribers, fetchSubscriberStats, deleteSubscriber, sendBulkNewsletter, resetSendStatus } from '../store/newsletterSlice';
import { logout, checkAuth } from '../store/authSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyForm, setReplyForm] = useState({ subject: '', message: '' });
  const [newsletterForm, setNewsletterForm] = useState({ subject: '', content: '' });
  const [toast, setToast] = useState(null);
  
  const { user, isAuthenticated, status: authStatus } = useSelector((state) => state.auth);
  const { contacts, pagination: contactPagination, status: contactStatus, replyStatus } = useSelector((state) => state.contact);
  const { subscribers, stats, pagination: subscriberPagination, status: subscriberStatus, sendStatus } = useSelector((state) => state.newsletter);

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
    } else {
      dispatch(fetchSubscribers(page));
    }
  };

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
    <div className="min-h-screen bg-slate-100 flex">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {toast.type === 'success' ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Contact Details Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Message Details</h3>
                  <p className="text-sm text-slate-500">{formatDate(selectedContact.createdAt)}</p>
                </div>
                <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Name</p>
                  <p className="font-medium text-slate-800">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Email</p>
                  <p className="font-medium text-slate-800">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Phone</p>
                    <p className="font-medium text-slate-800">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 uppercase">Subject</p>
                  <p className="font-medium text-slate-800">{selectedContact.subject}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase mb-2">Message</p>
                <div className="bg-slate-50 p-4 rounded-lg text-slate-700 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              {selectedContact.attachment && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">Attachment</p>
                  <a 
                    href={`http://localhost:5000/${selectedContact.attachment}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700"
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-between">
              <button 
                onClick={() => handleDeleteContact(selectedContact.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <FiSend className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Reply to {selectedContact.name}</h3>
                <button onClick={() => setShowReplyModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500">To: {selectedContact.email}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={replyForm.subject}
                  onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  value={replyForm.message}
                  onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Enter your message"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReply}
                disabled={replyStatus === 'loading'}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
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

      {/* Send Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">Send Newsletter</h3>
                <button onClick={() => setShowNewsletterModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500">To: All {stats.active} active subscribers</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newsletterForm.subject}
                  onChange={(e) => setNewsletterForm({ ...newsletterForm, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter newsletter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea
                  value={newsletterForm.content}
                  onChange={(e) => setNewsletterForm({ ...newsletterForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Enter newsletter content"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewsletterModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendNewsletter}
                disabled={sendStatus === 'loading'}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
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

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-slate-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>
        <div className="p-4">
          <h1 className="text-lg font-bold">DCintelix</h1>
          <p className="text-slate-400 text-xs">Dashboard</p>
        </div>
        <div className="px-4 py-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        </div>
        <nav className="px-3 py-3">
          <button onClick={() => setActiveTab('contacts')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'contacts' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <FiMessageSquare className="w-4 h-4" />
            Messages
          </button>
          <button onClick={() => setActiveTab('newsletter')} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors mt-1 ${activeTab === 'newsletter' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <FiMail className="w-4 h-4" />
            Newsletter
          </button>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg text-sm transition-colors">
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 min-h-screen">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-semibold text-slate-800">{activeTab === 'contacts' ? 'Messages' : 'Subscribers'}</h2>
          <a href="/" className="text-teal-600 hover:text-teal-700 text-xs font-medium">View Site →</a>
        </header>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Messages</p>
                <p className="text-xl font-bold text-slate-800">{contactPagination.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Subs</p>
                <p className="text-xl font-bold text-slate-800">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiSend className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Subs</p>
                <p className="text-xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {activeTab === 'contacts' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {contactStatus === 'loading' ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-teal-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : contacts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No messages yet — you're all caught up!</td>
                      </tr>
                    ) : (
                      contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-800">{contact.name}</p>
                            {contact.phone && <p className="text-xs text-slate-500">{contact.phone}</p>}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{contact.email}</td>
                          <td className="px-4 py-3 text-slate-600">{contact.subject}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${contact.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {contact.isRead ? 'Read' : 'Unread'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(contact.createdAt)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button 
                                onClick={() => handleViewContact(contact)} 
                                className="p-1.5 text-teal-600 hover:bg-teal-50 rounded transition-colors" 
                                title="View"
                              >
                                <FiEye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteContact(contact.id)} 
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" 
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {contactPagination.pages > 1 && (
                  <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-xs text-slate-500">Page {contactPagination.page} of {contactPagination.pages}</p>
                    <div className="flex gap-1">
                      <button onClick={() => handlePageChange(contactPagination.page - 1)} disabled={contactPagination.page === 1} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FiChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => handlePageChange(contactPagination.page + 1)} disabled={contactPagination.page === contactPagination.pages} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="p-4 border-b border-slate-200 flex justify-end">
                  <button 
                    onClick={() => setShowNewsletterModal(true)}
                    disabled={stats.active === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend className="w-4 h-4" />
                    Send Newsletter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Subscribed</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {subscriberStatus === 'loading' ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-teal-600"></div>
                            </div>
                          </td>
                        </tr>
                      ) : subscribers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-8 text-center text-slate-500">No subscribers yet — time to spread the word!</td>
                        </tr>
                      ) : (
                        subscribers.map((subscriber) => (
                          <tr key={subscriber.email} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-slate-800">{subscriber.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${subscriber.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {subscriber.isActive ? 'Active' : 'Unsubscribed'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(subscriber.subscribedAt)}</td>
                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => handleDeleteSubscriber(subscriber.email)} 
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" 
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {subscriberPagination.pages > 1 && (
                    <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                      <p className="text-xs text-slate-500">Page {subscriberPagination.page} of {subscriberPagination.pages}</p>
                      <div className="flex gap-1">
                        <button onClick={() => handlePageChange(subscriberPagination.page - 1)} disabled={subscriberPagination.page === 1} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                          <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => handlePageChange(subscriberPagination.page + 1)} disabled={subscriberPagination.page === subscriberPagination.pages} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
