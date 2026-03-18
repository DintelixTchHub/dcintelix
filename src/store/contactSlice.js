import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit contact form');
    }
  }
);

export const fetchContacts = createAsyncThunk(
  'contact/fetchAll',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contact?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
    }
  }
);

export const fetchContactById = createAsyncThunk(
  'contact/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contact/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete contact');
    }
  }
);

export const replyToContact = createAsyncThunk(
  'contact/reply',
  async ({ id, subject, message }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/contact/${id}/reply`, { subject, message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reply');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    selectedContact: null,
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
    replyStatus: 'idle',
    replyError: null,
  },
  reducers: {
    resetSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
    resetReplyStatus: (state) => {
      state.replyStatus = 'idle';
      state.replyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit contact
      .addCase(submitContact.pending, (state) => {
        state.submitStatus = 'loading';
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.payload;
      })
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      // Reply to contact
      .addCase(replyToContact.pending, (state) => {
        state.replyStatus = 'loading';
      })
      .addCase(replyToContact.fulfilled, (state) => {
        state.replyStatus = 'succeeded';
      })
      .addCase(replyToContact.rejected, (state, action) => {
        state.replyStatus = 'failed';
        state.replyError = action.payload;
      });
  },
});

export const { resetSubmitStatus, clearSelectedContact, resetReplyStatus } = contactSlice.actions;
export default contactSlice.reducer;
