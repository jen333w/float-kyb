import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import BusinessBasics from './pages/BusinessBasics'
import OwnerInfo from './pages/OwnerInfo'
import Identity from './pages/Identity'
import BusinessNumber from './pages/BusinessNumber'
import Review from './pages/Review'
import Funding from './pages/Funding'
import Done from './pages/Done'
import Command from './pages/Command'
import OnboardingLayout from './components/OnboardingLayout'

export default function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route element={<OnboardingLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/business" element={<BusinessBasics />} />
            <Route path="/owner" element={<OwnerInfo />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/business-number" element={<BusinessNumber />} />
            <Route path="/review" element={<Review />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/done" element={<Done />} />
          </Route>
          <Route path="/command" element={<Command />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
