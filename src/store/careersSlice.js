import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const appendFormData = (formData, data) => {
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(key, file));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
      return;
    }
    formData.append(key, value);
  });
};

export const fetchPublicJobs = createAsyncThunk(
  'careers/fetchPublicJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/careers/jobs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

export const fetchPublicJobById = createAsyncThunk(
  'careers/fetchPublicJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/careers/jobs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job');
    }
  }
);

export const fetchPublicJobBySlug = createAsyncThunk(
  'careers/fetchPublicJobBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/careers/jobs/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job');
    }
  }
);

export const submitJobApplication = createAsyncThunk(
  'careers/submitJobApplication',
  async ({ jobId, payload }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      appendFormData(formData, payload);

      const response = await api.post(`/careers/jobs/${jobId}/applications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit job application');
    }
  }
);

export const submitGeneralApplication = createAsyncThunk(
  'careers/submitGeneralApplication',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      appendFormData(formData, payload);

      const response = await api.post('/careers/general-applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit application');
    }
  }
);

export const fetchAdminJobs = createAsyncThunk(
  'careers/fetchAdminJobs',
  async ({ page = 1, limit = 10, status } = {}, { rejectWithValue }) => {
    try {
      const search = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) search.set('status', status);

      const response = await api.get(`/admin/careers/jobs?${search.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin jobs');
    }
  }
);

export const fetchAdminJobById = createAsyncThunk(
  'careers/fetchAdminJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/careers/jobs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job details');
    }
  }
);

export const createJob = createAsyncThunk(
  'careers/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/careers/jobs', jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create job');
    }
  }
);

export const updateJob = createAsyncThunk(
  'careers/updateJob',
  async ({ id, ...jobData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/careers/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update job');
    }
  }
);

export const deleteJob = createAsyncThunk(
  'careers/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/careers/jobs/${id}`);
      return { id, message: response.data?.message || 'Job deleted' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete job');
    }
  }
);

export const fetchAdminApplications = createAsyncThunk(
  'careers/fetchAdminApplications',
  async ({ page = 1, limit = 10, status } = {}, { rejectWithValue }) => {
    try {
      const search = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) search.set('status', status);

      const response = await api.get(`/admin/careers/applications?${search.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const fetchAdminApplicationById = createAsyncThunk(
  'careers/fetchAdminApplicationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/careers/applications/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch application');
    }
  }
);

export const updateApplication = createAsyncThunk(
  'careers/updateApplication',
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/careers/applications/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update application');
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'careers/deleteApplication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/careers/applications/${id}`);
      return { id, message: response.data?.message || 'Application deleted' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete application');
    }
  }
);

const careersSlice = createSlice({
  name: 'careers',
  initialState: {
    publicJobs: [],
    selectedPublicJob: null,
    adminJobs: [],
    adminApplications: [],
    selectedAdminJob: null,
    selectedAdminApplication: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    appPagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    status: 'idle',
    error: null,
    submitStatus: 'idle',
    submitError: null,
    adminStatus: 'idle',
    adminError: null,
  },
  reducers: {
    resetCareerSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearSelectedPublicJob: (state) => {
      state.selectedPublicJob = null;
    },
    clearSelectedAdminJob: (state) => {
      state.selectedAdminJob = null;
    },
    clearSelectedAdminApplication: (state) => {
      state.selectedAdminApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPublicJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publicJobs = action.payload?.data || [];
      })
      .addCase(fetchPublicJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchPublicJobById.fulfilled, (state, action) => {
        state.selectedPublicJob = action.payload?.data || null;
      })
      .addCase(fetchPublicJobBySlug.fulfilled, (state, action) => {
        state.selectedPublicJob = action.payload?.data || null;
      })
      .addCase(submitJobApplication.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitJobApplication.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.payload;
      })
      .addCase(submitGeneralApplication.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitGeneralApplication.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitGeneralApplication.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.payload;
      })
      .addCase(fetchAdminJobs.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminJobs = action.payload?.data || [];
        state.pagination = action.payload?.pagination || state.pagination;
      })
      .addCase(fetchAdminJobs.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.adminError = action.payload;
      })
      .addCase(fetchAdminJobById.fulfilled, (state, action) => {
        state.selectedAdminJob = action.payload?.data || null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        const created = action.payload?.data;
        if (created) {
          state.adminJobs = [created, ...state.adminJobs];
        }
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;
        state.adminJobs = state.adminJobs.map((item) => (item.id === updated.id ? updated : item));
        if (state.selectedAdminJob?.id === updated.id) {
          state.selectedAdminJob = updated;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.adminJobs = state.adminJobs.filter((item) => item.id !== action.payload.id);
      })
      .addCase(fetchAdminApplications.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAdminApplications.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminApplications = action.payload?.data || [];
        state.appPagination = action.payload?.pagination || state.appPagination;
      })
      .addCase(fetchAdminApplications.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.adminError = action.payload;
      })
      .addCase(fetchAdminApplicationById.fulfilled, (state, action) => {
        state.selectedAdminApplication = action.payload?.data || null;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;
        state.adminApplications = state.adminApplications.map((item) => (item.id === updated.id ? updated : item));
        if (state.selectedAdminApplication?.id === updated.id) {
          state.selectedAdminApplication = updated;
        }
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.adminApplications = state.adminApplications.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const {
  resetCareerSubmitStatus,
  clearSelectedPublicJob,
  clearSelectedAdminJob,
  clearSelectedAdminApplication,
} = careersSlice.actions;

export default careersSlice.reducer;
