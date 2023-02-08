import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./reducers/sessionReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const rootPersistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    session: sessionReducer,
});

export const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: [thunk],
});

export const persistor = persistStore(store);