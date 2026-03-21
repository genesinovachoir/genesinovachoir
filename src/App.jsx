import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LanguageSync from './components/LanguageSync';

const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));
const Collab = lazy(() => import('./pages/Collab'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Media = lazy(() => import('./pages/Media'));
const MediaDetail = lazy(() => import('./pages/MediaDetail'));
const Podcast = lazy(() => import('./pages/Podcast'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app" style={{ backgroundColor: '#05060a' }}>
        <Header />
        <Suspense fallback={null}>
          <Routes>
            {/* Root → redirect to default language (Turkish) */}
            <Route path="/" element={<Navigate to="/tr/" replace />} />

            {/* Language-prefixed routes */}
            <Route path="/:lang" element={<LanguageSync />}>
              <Route index element={<Home />} />
              <Route path="collab" element={<Collab />} />
              <Route path="store" element={<Store />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="media" element={<Media />} />
              <Route path="media/:slug" element={<MediaDetail />} />
              <Route path="podcast" element={<Podcast />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Catch-all for routes without lang prefix */}
            <Route path="*" element={<Navigate to="/tr/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
