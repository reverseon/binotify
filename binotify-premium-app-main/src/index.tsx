import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import '@fontsource/poppins'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
