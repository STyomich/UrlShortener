import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShortUrl } from "../../models/entities/shortUrl";
import agent from "../../api/agent";

interface ShortUrlState {
  list: ShortUrl[];
  selectedShortUrl: ShortUrl | null;
}

const initialState: ShortUrlState = {
  list: [],
  selectedShortUrl: null,
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
  async (id: string, { dispatch }) => {
    const shortUrl = await agent.ShortUrls.details(id);
    dispatch(shortUrlSlice.actions.selectShortUrl(shortUrl));
    return shortUrl;
  }
);

export const deleteShortUrl = createAsyncThunk(
  "shortUrls/deleteShortUrl",
  async (id: string) => {
    await agent.ShortUrls.delete(id);
    return id;
  }
);

const shortUrlSlice = createSlice({
  name: "shortUrls",
  initialState,
  reducers: {
    clearSelectedShortUrl(state) {
      state.selectedShortUrl = null;
    },
    selectShortUrl(state, action) {
      state.selectedShortUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(
        fetchShortUrls.fulfilled,
        (state, action: PayloadAction<ShortUrl[]>) => {
          state.list = action.payload;
        }
      )
      // Create ShortUrl
      .addCase(
        createShortUrl.fulfilled,
        (state, action: PayloadAction<ShortUrl>) => {
          state.list.push(action.payload);
        }
      )
      // Fetch Details
      .addCase(
        fetchShortUrlDetails.fulfilled,
        (state, action: PayloadAction<ShortUrl | null>) => {
          state.selectedShortUrl = action.payload || null;
        }
      )
      // Delete ShortUrl
      .addCase(
        deleteShortUrl.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(
            (shortUrl) => shortUrl.id !== action.payload
          );
        }
      );
  },
});

export const { clearSelectedShortUrl, selectShortUrl } = shortUrlSlice.actions;

export default shortUrlSlice.reducer;
