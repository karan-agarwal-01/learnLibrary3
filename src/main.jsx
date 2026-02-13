import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './Redux/app/store';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    {/* <RecoilRoot> */}
      <App />
    {/* </RecoilRoot> */}
    {/* </Provider>  */}
  </StrictMode>,
)
