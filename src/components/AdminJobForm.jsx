import { useEffect, useState } from 'react'
import { FiArrowLeft, FiBriefcase, FiLoader, FiSave } from 'react-icons/fi'

const defaultValues = {
  title: '',
  slug: '',
  description: '',
  responsibilities: '',
  requirements: '',
  location: 'Remote',
  employmentType: 'FULL_TIME',
  opportunityType: 'TRAINING',
  workMode: 'REMOTE',
  monthlyFee: '',
  durationMonths: '',
  department: '',
  salaryRange: '',
  closesAt: '',
  status: 'DRAFT',
}

const inputClass = 'w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'

function toLines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function fromLines(value) {
  return Array.isArray(value) ? value.join('\n') : value || ''
}

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function AdminJobForm({
  initialJob,
  defaultOpportunityType = 'TRAINING',
  defaultEmploymentType = 'FULL_TIME',
  lockOpportunityType = false,
  lockEmploymentType = false,
  isSubmitting = false,
  error,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    ...defaultValues,
    opportunityType: defaultOpportunityType,
    employmentType: defaultEmploymentType,
  })

  useEffect(() => {
    if (!initialJob) return
    setForm({
      ...defaultValues,
      ...initialJob,
      opportunityType: defaultOpportunityType,
      employmentType: defaultEmploymentType,
      responsibilities: fromLines(initialJob.responsibilities),
      requirements: fromLines(initialJob.requirements),
      closesAt: initialJob.closesAt ? initialJob.closesAt.slice(0, 16) : '',
    })
  }, [defaultEmploymentType, defaultOpportunityType, initialJob])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...form,
      slug: form.slug.trim() || createSlug(form.title),
      opportunityType: defaultOpportunityType,
      employmentType: defaultEmploymentType,
      responsibilities: toLines(form.responsibilities),
      requirements: toLines(form.requirements),
      monthlyFee: form.monthlyFee === '' ? undefined : Number(form.monthlyFee),
      durationMonths: form.durationMonths === '' ? undefined : Number(form.durationMonths),
      closesAt: form.closesAt ? new Date(form.closesAt).toISOString() : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">Job title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Digital Marketing Training Program" />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1.5">URL slug <span className="font-normal text-slate-400">(optional)</span></label>
          <input id="slug" name="slug" value={form.slug} onChange={handleChange} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className={inputClass} placeholder="Generated from the title if blank" />
        </div>

        <div>
          <label htmlFor="closesAt" className="block text-sm font-medium text-slate-700 mb-1.5">Closes at</label>
          <input id="closesAt" name="closesAt" type="datetime-local" value={form.closesAt} onChange={handleChange} className={inputClass} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows="5" className={inputClass} placeholder="Describe the role and its impact..." />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
          <input id="location" name="location" value={form.location} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
          <input id="department" name="department" value={form.department} onChange={handleChange} className={inputClass} placeholder="Product & Design" />
        </div>

        <div>
          <label htmlFor="employmentType" className="block text-sm font-medium text-slate-700 mb-1.5">Employment type</label>
          <select id="employmentType" name="employmentType" value={form.employmentType} onChange={handleChange} disabled={lockEmploymentType} className={inputClass}>
            <option value="FULL_TIME">Full time</option>
            <option value="PART_TIME">Part time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="opportunityType" className="block text-sm font-medium text-slate-700 mb-1.5">Opportunity type</label>
          <select id="opportunityType" name="opportunityType" value={form.opportunityType} onChange={handleChange} disabled={lockOpportunityType} className={inputClass}>
            <option value="TRAINING">Training</option>
            <option value="JOB">Job</option>
          </select>
        </div>

        <div>
          <label htmlFor="workMode" className="block text-sm font-medium text-slate-700 mb-1.5">Work mode</label>
          <select id="workMode" name="workMode" value={form.workMode} onChange={handleChange} className={inputClass}>
            <option value="REMOTE">Remote</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ONSITE">On-site</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div>
          <label htmlFor="monthlyFee" className="block text-sm font-medium text-slate-700 mb-1.5">
            {form.opportunityType === 'TRAINING' ? 'Monthly training fee' : 'Monthly fee'}
          </label>
          <input id="monthlyFee" name="monthlyFee" type="number" min="0" step="0.01" value={form.monthlyFee} onChange={handleChange} required={form.opportunityType === 'TRAINING'} className={inputClass} placeholder={form.opportunityType === 'TRAINING' ? 'Fee per month' : 'Optional'} />
        </div>
        <div>
          <label htmlFor="durationMonths" className="block text-sm font-medium text-slate-700 mb-1.5">
            {form.opportunityType === 'TRAINING' ? 'Cohort duration in months' : 'Duration in months'}
          </label>
          <input id="durationMonths" name="durationMonths" type="number" min="1" max="120" value={form.durationMonths} onChange={handleChange} required={form.opportunityType === 'TRAINING'} className={inputClass} placeholder={form.opportunityType === 'TRAINING' ? 'Duration of the cohort' : 'Optional'} />
        </div>

        {form.opportunityType !== 'TRAINING' && (
          <div>
            <label htmlFor="salaryRange" className="block text-sm font-medium text-slate-700 mb-1.5">Salary range</label>
            <input id="salaryRange" name="salaryRange" value={form.salaryRange} onChange={handleChange} className={inputClass} placeholder="Optional, e.g. 500,000 - 800,000 RWF" />
          </div>
        )}

        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-slate-700 mb-1.5">Responsibilities</label>
          <textarea id="responsibilities" name="responsibilities" value={form.responsibilities} onChange={handleChange} required rows="7" className={inputClass} placeholder="One responsibility per line" />
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-slate-700 mb-1.5">Requirements</label>
          <textarea id="requirements" name="requirements" value={form.requirements} onChange={handleChange} required rows="7" className={inputClass} placeholder="One requirement per line" />
        </div>
      </div>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
        <button type="button" onClick={onCancel} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
          <FiArrowLeft className="w-4 h-4" />
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
          {isSubmitting ? 'Saving...' : 'Save job posting'}
        </button>
      </div>
    </form>
  )
}

export function AdminJobFormIntro({ title = 'Post a training opportunity', description = 'Create a training opportunity for the public careers page.' }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
        <FiBriefcase className="w-5 h-5" />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  )
}
