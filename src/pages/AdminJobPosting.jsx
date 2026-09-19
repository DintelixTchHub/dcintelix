import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminJobForm, { AdminJobFormIntro } from '../components/AdminJobForm'
import { createJob } from '../store/careersSlice'

export default function AdminJobPosting() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (jobData) => {
    setSubmitError('')
    setIsSubmitting(true)
    try {
      await dispatch(createJob(jobData)).unwrap()
      navigate('/admin/dashboard')
    } catch (error) {
      setSubmitError(error || 'Failed to create job posting')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-slate-200">
            <AdminJobFormIntro title="Post a job" description="Create a job opportunity for the public careers page." />
          </div>
          <div className="p-5 md:p-6">
            <AdminJobForm
              isSubmitting={isSubmitting}
              defaultOpportunityType="JOB"
              error={submitError}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/admin/dashboard')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
