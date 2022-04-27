import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import {cryptoOrdersApi} from"../services/binanceApi";
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoOrdersApi.reducerPath]: cryptoOrdersApi.reducer,

    },
});