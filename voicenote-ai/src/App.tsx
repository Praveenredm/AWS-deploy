import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import RecordingPage from './pages/RecordingPage';
import HistoryPage from './pages/HistoryPage';
import NoteDetail from './pages/NoteDetail';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import * as React from 'react';
import { useAppStore } from './store/useAppStore';

export default function App() {
    const theme = useAppStore(state => state.theme);

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="record" element={<RecordingPage />} />
                    <Route path="history" element={<HistoryPage />} />
                    <Route path="note/:id" element={<NoteDetail />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
