import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persisitReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persisitedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [
  process.env.NODE_ENV == "development" && logger,
  sagaMiddleware,
].filter(Boolean);

const componsedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persisitedReducer,
  undefined,
  componsedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
