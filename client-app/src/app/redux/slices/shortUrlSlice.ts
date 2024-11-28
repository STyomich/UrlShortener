import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShortUrl } from "../../models/entities/shortUrl";
import agent from "../../api/agent";

interface ShortUrlState {
  list: ShortUrl[];
  selectedShortUrl: ShortUrl | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ShortUrlState = {
  list: [],
  selectedShortUrl: null,
  status: "idle",
  error: null,
};

export const fetchShortUrls = createAsyncThunk(
  "shortUrls/fetchShortUrls",
  async () => {
    return await agent.ShortUrls.list();
  }
);

export const createShortUrl = createAsyncThunk(
  "shortUrls/createShortUrl",
  async (shortUrl: ShortUrl, { rejectWithValue }) => {
    try {
      await agent.ShortUrls.create(shortUrl);
      return shortUrl;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create short URL");
    }
  }
);

export const fetchShortUrlDetails = createAsyncThunk(
  "shortUrls/fetchShortUrlDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      return await agent.ShortUrls.details(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch short URL details"
      );
    }
  }
);

export const deleteShortUrl = createAsyncThunk(
  "shortUrls/deleteShortUrl",
  async (id: string, { rejectWithValue }) => {
    try {
      await agent.ShortUrls.delete(id);
      return id; // Return the deleted ID to update the state.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete short URL");
    }
  }
);

const shortUrlSlice = createSlice({
  name: "shortUrls",
  initialState,
  reducers: {
    clearSelectedShortUrl(state) {
      state.selectedShortUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchShortUrls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchShortUrls.fulfilled,
        (state, action: PayloadAction<ShortUrl[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchShortUrls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Create ShortUrl
      .addCase(createShortUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createShortUrl.fulfilled,
        (state, action: PayloadAction<ShortUrl>) => {
          state.status = "succeeded";
          state.list.push(action.payload);
        }
      )
      .addCase(createShortUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Fetch Details
      .addCase(fetchShortUrlDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchShortUrlDetails.fulfilled,
        (state, action: PayloadAction<ShortUrl>) => {
          state.status = "succeeded";
          state.selectedShortUrl = action.payload;
        }
      )
      .addCase(fetchShortUrlDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Delete ShortUrl
      .addCase(deleteShortUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteShortUrl.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.list = state.list.filter(
            (shortUrl) => shortUrl.id !== action.payload
          );
        }
      )
      .addCase(deleteShortUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedShortUrl } = shortUrlSlice.actions;

export default shortUrlSlice.reducer;
