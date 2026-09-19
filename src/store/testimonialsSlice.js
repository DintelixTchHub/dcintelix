import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const submitTestimonial = createAsyncThunk(
  'testimonials/submit',
  async ({ name, email, role, testimonial }, { rejectWithValue }) => {
    try {
      const response = await api.post('/testimonials', { name, email, role, testimonial });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit testimonial');
    }
  }
);

export const fetchApprovedTestimonials = createAsyncThunk(
  'testimonials/fetchApproved',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/testimonials');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
    }
  }
);

export const fetchAdminTestimonials = createAsyncThunk(
  'testimonials/fetchAdmin',
  async ({ page = 1, limit = 10, status } = {}, { rejectWithValue }) => {
    try {
      const search = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) search.set('status', status);

      const response = await api.get(`/testimonials/admin?${search.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin testimonials');
    }
  }
);

export const fetchAdminTestimonialById = createAsyncThunk(
  'testimonials/fetchAdminById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/testimonials/admin/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonial');
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/update',
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/testimonials/admin/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/testimonials/admin/${id}`);
      return { id, message: response.data?.message || 'Testimonial deleted' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
    }
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: [],
    adminItems: [],
    selectedTestimonial: null,
    pagination: {
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
  },
  reducers: {
    resetTestimonialSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearSelectedTestimonial: (state) => {
      state.selectedTestimonial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTestimonial.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitTestimonial.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitTestimonial.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.payload;
      })
      .addCase(fetchApprovedTestimonials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApprovedTestimonials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload?.data || [];
      })
      .addCase(fetchApprovedTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminTestimonials.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAdminTestimonials.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminItems = action.payload?.data || [];
        state.pagination = action.payload?.pagination || state.pagination;
      })
      .addCase(fetchAdminTestimonials.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminTestimonialById.fulfilled, (state, action) => {
        state.selectedTestimonial = action.payload?.data || null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.adminItems = state.adminItems.filter((item) => item.id !== action.payload.id);
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;

        state.adminItems = state.adminItems.map((item) => (item.id === updated.id ? updated : item));
        state.items = state.items.map((item) => (item.id === updated.id ? updated : item));
        if (state.selectedTestimonial?.id === updated.id) {
          state.selectedTestimonial = updated;
        }
      });
  },
});

export const { resetTestimonialSubmitStatus, clearSelectedTestimonial } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
