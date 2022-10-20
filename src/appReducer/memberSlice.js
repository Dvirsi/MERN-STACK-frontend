import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberUtils from "../services/membersService";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    try {
      const { data } = await memberUtils.getAllMembers();
      return [...data];
    } catch (err) {
      throw Error(err.response.data.message);
    }
  }
);

export const deleteMemberById = createAsyncThunk(
  "members/deleteMember",
  async (id) => {
    try {
      await memberUtils.deleteMember(id);
      return id;
    } catch (err) {
      throw Error(err.response.data);
    }
  }
);

export const addMember = createAsyncThunk(
  "members/addMember",
  async (newMember) => {
    try {
      const { data } = await memberUtils.addMember(newMember);
      return data;
    } catch (err) {
      throw Error(err.response.data);
    }
  }
);

export const editMember = createAsyncThunk(
  "members/editMember",
  async (obj) => {
    try {
      const updatedMember = await memberUtils.updateMember(obj._id, obj);
      return updatedMember.data;
    } catch (err) {
      throw Error(err.response.data);
    }
  }
);

const initialState = {
  members: [],
  memberToSearch: "",
  editMemberId: "",
  memberStatus: "idle",
  memberError: null,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    searchMember: (state, action) => {
      state.memberToSearch = action.payload.toLowerCase();
    },

    searchMemberById: (state, action) => {
      const member = state.members.find((m) => m._id == action.payload);
      state.memberToSearch = member.fullname.toLowerCase();
    },

    editMemberUI: (state, action) => {
      let stateToUpdate = [...state.members];
      let index = stateToUpdate.findIndex((x) => x._id == action.payload._id);
      if (index > -1) {
        stateToUpdate[index] = action.payload;
      }
      state.members = stateToUpdate;
    },

    addMemberFieldRequiered: (state, action) => {
      state.memberError = "All fields are required";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMembers.pending, (state, action) => {
        state.memberStatus = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.memberStatus = "succeeded";
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.memberStatus = "failed";
        state.memberError = action.error.message;
      })
      .addCase(deleteMemberById.fulfilled, (state, action) => {
        state.members = state.members.filter(
          (member) => member._id !== action.payload
        );
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.members.push(action.payload);
        state.memberError = "";
      })
      .addCase(addMember.rejected, (state, action) => {
        state.memberError = action.error.message;
      })
      .addCase(editMember.fulfilled, (state, action) => {
        editMemberUI(action.payload);
      });
  },
});

export const selectAllMembers = (state) => state.members.members;
export const memberToSearch = (state) => state.members.memberToSearch;
export const selectMemberError = (state) => state.members.memberError;

export const {
  searchMember,
  searchMemberById,
  editMemberUI,
  addMemberFieldRequiered,
} = memberSlice.actions;
export default memberSlice;
