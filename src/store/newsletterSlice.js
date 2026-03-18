import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const subscribeNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to subscribe');
    }
  }
);

export const unsubscribeNewsletter = createAsyncThunk(
  'newsletter/unsubscribe',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unsubscribe');
    }
  }
);

export const fetchSubscribers = createAsyncThunk(
  'newsletter/fetchAll',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await api.get(`/newsletter?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscribers');
    }
  }
);

export const fetchSubscriberStats = createAsyncThunk(
  'newsletter/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/newsletter/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const deleteSubscriber = createAsyncThunk(
  'newsletter/delete',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/newsletter/${encodeURIComponent(email)}`);
      return { email, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete subscriber');
    }
  }
);

export const sendBulkNewsletter = createAsyncThunk(
  'newsletter/sendBulk',
  async ({ subject, content }, { rejectWithValue }) => {
    try {
      const response = await api.post('/newsletter/send', { subject, content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send newsletter');
    }
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState: {
    subscribers: [],
    stats: {
      active: 0,
      unsubscribed: 0,
      total: 0,
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    status: 'idle',
    error: null,
    subscribeStatus: 'idle',
    subscribeError: null,
    sendStatus: 'idle',
    sendError: null,
  },
  reducers: {
    resetSubscribeStatus: (state) => {
      state.subscribeStatus = 'idle';
      state.subscribeError = null;
    },
    resetSendStatus: (state) => {
      state.sendStatus = 'idle';
      state.sendError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe
      .addCase(subscribeNewsletter.pending, (state) => {
        state.subscribeStatus = 'loading';
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.subscribeStatus = 'succeeded';
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.subscribeStatus = 'failed';
        state.subscribeError = action.payload;
      })
      // Unsubscribe
      .addCase(unsubscribeNewsletter.fulfilled, (state) => {
        state.subscribeStatus = 'idle';
      })
      // Fetch subscribers
      .addCase(fetchSubscribers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscribers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch stats
      .addCase(fetchSubscriberStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      })
      // Delete subscriber
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.subscribers = state.subscribers.filter(sub => sub.email !== action.payload.email);
        state.stats.active = Math.max(0, state.stats.active - 1);
        state.stats.total = Math.max(0, state.stats.total - 1);
      })
      // Send bulk newsletter
      .addCase(sendBulkNewsletter.pending, (state) => {
        state.sendStatus = 'loading';
      })
      .addCase(sendBulkNewsletter.fulfilled, (state) => {
        state.sendStatus = 'succeeded';
      })
      .addCase(sendBulkNewsletter.rejected, (state, action) => {
        state.sendStatus = 'failed';
        state.sendError = action.payload;
      });
  },
});

export const { resetSubscribeStatus, resetSendStatus } = newsletterSlice.actions;
export default newsletterSlice.reducer;
