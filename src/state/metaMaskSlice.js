import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMetaMaskConnected: false,
    allTransactions: []
}

export const metaMaskSlice = createSlice({
    name: 'metamask',
    initialState,
    reducers: {
        setMetamaskStatus: (state, action) => {
            state.isMetaMaskConnected = action.payload.isMetaMaskConnected;
        },
        setAllTransactions: (state, action) => {
            state.allTransactions = action.payload.allTransactions;
        }
    }
})


export const { setMetamaskStatus, setAllTransactions } = metaMaskSlice.actions;
export default metaMaskSlice.reducer;