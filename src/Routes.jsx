import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ElectionResultsArchive from './pages/election-results-archive';
import HistoricalTimelineDashboard from './pages/historical-timeline-dashboard';
import InteractiveConstituencyMap from './pages/interactive-constituency-map';
import CandidateProfileExplorer from './pages/candidate-profile-explorer';
import AuthenticationRegistration from './pages/authentication-registration';
import PartyPerformanceAnalytics from './pages/party-performance-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationRegistration />} />
        <Route path="/election-results-archive" element={<ElectionResultsArchive />} />
        <Route path="/historical-timeline-dashboard" element={<HistoricalTimelineDashboard />} />
        <Route path="/interactive-constituency-map" element={<InteractiveConstituencyMap />} />
        <Route path="/candidate-profile-explorer" element={<CandidateProfileExplorer />} />
        <Route path="/authentication-registration" element={<AuthenticationRegistration />} />
        <Route path="/party-performance-analytics" element={<PartyPerformanceAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
