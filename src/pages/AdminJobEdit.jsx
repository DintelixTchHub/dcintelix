import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminJobForm, { AdminJobFormIntro } from '../components/AdminJobForm'
import { fetchAdminJobById, updateJob } from '../store/careersSlice'

export default function AdminJobEdit() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let active = true

    const loadJob = async () => {
      setIsLoading(true)
      setLoadError('')
      try {
        const response = await dispatch(fetchAdminJobById(id)).unwrap()
        if (active) setJob(response?.data || null)
      } catch (error) {
        if (active) setLoadError(error || 'Failed to load job details')
      } finally {
        if (active) setIsLoading(false)
      }
    }

    if (id) loadJob()
    return () => {
      active = false
    }
  }, [dispatch, id])

  const handleSubmit = async (jobData) => {
    setSubmitError('')
    setIsSubmitting(true)
    try {
      await dispatch(updateJob({ id, ...jobData })).unwrap()
      navigate('/admin/dashboard')
    } catch (error) {
      setSubmitError(error || 'Failed to update job posting')
    } finally {
      setIsSubmitting(false)
    }
  }

  const opportunityType = job?.opportunityType || 'JOB'
  const employmentType = job?.employmentType || 'FULL_TIME'

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-slate-200">
            <AdminJobFormIntro title="Edit opportunity" description="Update the job, training program, or internship details." />
          </div>
          <div className="p-5 md:p-6">
            {isLoading ? (
              <p className="py-10 text-center text-sm text-slate-500">Loading opportunity...</p>
            ) : loadError ? (
              <div className="space-y-4">
                <p className="text-sm text-red-600" role="alert">{loadError}</p>
                <button type="button" onClick={() => navigate('/admin/dashboard')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                  Back to dashboard
                </button>
              </div>
            ) : job ? (
              <AdminJobForm
                initialJob={job}
                defaultOpportunityType={opportunityType}
                defaultEmploymentType={employmentType}
                lockOpportunityType
                lockEmploymentType
                isSubmitting={isSubmitting}
                error={submitError}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/admin/dashboard')}
              />
            ) : (
              <p className="py-10 text-center text-sm text-slate-500">Opportunity not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
