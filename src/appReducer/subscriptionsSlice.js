import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subsUtils from "../services/subscriptionService";

export const fetchSubs = createAsyncThunk("subs/fetchSubs", async () => {
  try {
    const { data } = await subsUtils.getAllSubs();
    return [...data];
  } catch (err) {
    throw Error(err.response.data);
  }
});

export const addSubscription = createAsyncThunk(
  "subs/addSubscription",
  async (newSub) => {
    try {
      const newSubData = await subsUtils.addSub(newSub);
      const { data } = await subsUtils.getSubById(newSubData.data._id);
      return data;
    } catch (err) {
      console.log(err.response.data);
      throw Error(err.response.data);
    }
  }
);

const initialState = {
  subs: [],
  subsStatus: "idle",
  subsError: null,
};

const subscriptionsSlice = createSlice({
  name: "subs",
  initialState,
  reducers: {
    deleteAllSubsByMovieId: (state, action) => {
      state.subs = state.subs.filter(
        (sub) => sub.movieId._id !== action.payload
      );
    },
    deleteAllSubsByMemberId: (state, action) => {
      state.subs = state.subs.filter(
        (sub) => sub.memberId._id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubs.pending, (state, action) => {
        state.subsStatus = "loading";
      })
      .addCase(fetchSubs.fulfilled, (state, action) => {
        state.subsStatus = "succeeded";
        state.subs = action.payload;
      })
      .addCase(fetchSubs.rejected, (state, action) => {
        state.subsStatus = "failed";
        state.subsError = action.error.message;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.subsStatus = "succeeded";
        state.subs.push(action.payload);
      });
  },
});

export const selectAllSubs = (state) => state.subs.subs;
export const {
  deleteAllSubsByMovieId,
  deleteAllSubsByMemberId,
  getWatchedSubsForMemberByID,
} = subscriptionsSlice.actions;

export default subscriptionsSlice;
