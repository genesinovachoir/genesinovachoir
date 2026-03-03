import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));
const Collab = lazy(() => import('./pages/Collab'));
const Blog = lazy(() => import('./pages/Blog'));
const Media = lazy(() => import('./pages/Media'));
const Podcast = lazy(() => import('./pages/Podcast'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app" style={{ backgroundColor: '#05060a' }}>
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collab" element={<Collab />} />
            <Route path="/store" element={<Store />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/media" element={<Media />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
