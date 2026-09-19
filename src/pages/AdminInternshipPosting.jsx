import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminJobForm, { AdminJobFormIntro } from '../components/AdminJobForm'
import { createJob } from '../store/careersSlice'

export default function AdminInternshipPosting() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (internshipData) => {
    setSubmitError('')
    setIsSubmitting(true)
    try {
      await dispatch(createJob({
        ...internshipData,
        opportunityType: 'JOB',
        employmentType: 'INTERNSHIP',
      })).unwrap()
      navigate('/admin/dashboard')
    } catch (error) {
      setSubmitError(error || 'Failed to create internship posting')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-slate-200">
            <AdminJobFormIntro title="Post an internship" description="Create an internship opportunity for the public careers page." />
          </div>
          <div className="p-5 md:p-6">
            <AdminJobForm
              defaultOpportunityType="JOB"
              defaultEmploymentType="INTERNSHIP"
              lockOpportunityType
              lockEmploymentType
              isSubmitting={isSubmitting}
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