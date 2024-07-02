import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signer: null,
    contract: null,
    provider: null,
    currentNetwork: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSigner: (state, action) => {
            state.signer = action.payload.signer;
        },
        setProvider: (state, action) => {
            state.provider = action.payload.provider;
        },
        setContract: (state, action) => {
            state.contract = action.payload.contract;
        },
        setCurrentNetwork: (state, action) => {
            state.currentNetwork = action.payload.currentNetwork;
        }
    }
})


export const { setSigner, setContract, setProvider, setCurrentNetwork } = userSlice.actions;
export default userSlice.reducer;