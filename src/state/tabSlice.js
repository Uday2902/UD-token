import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedTab: "profile"
}

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload.selectedTab
        }
    }
})


export const { setSelectedTab } = tabSlice.actions;
export default tabSlice.reducer;