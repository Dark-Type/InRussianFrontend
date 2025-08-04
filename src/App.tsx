import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/auth/AuthProvider.tsx';
import {AuthPage} from './components/AuthPage.tsx';
import {AdminPanel} from './components/AdminPanel';
import {ExpertPanel} from './components/ExpertPanel';
import {ContentPanel} from './components/ContentPanel.tsx';
import {ThemeProvider} from './context/theme/ThemeProvider.tsx';
import {RoleProtectedRoute} from './components/RoleProtectedRoute';
import {UserRoleEnum} from './api';
import {ProfileProvider} from "./context/profile/ProfileProvider.tsx";
import {ContentProvider} from "./context/content/ContentProvider.tsx";
import {AdminProvider} from "./context/admin/AdminProvider.tsx";
import {ExpertProvider} from "./context/expert/ExpertProvider.tsx";

export const App = () => (
    <ThemeProvider>
        <AuthProvider>
            <ProfileProvider>
                <ContentProvider>
                    <AdminProvider>
                        <ExpertProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<AuthPage/>}/>
                                    <Route
                                        path="/admin"
                                        element={
                                            <RoleProtectedRoute allowedRole={UserRoleEnum.Admin}>
                                                <AdminPanel/>
                                            </RoleProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/expert"
                                        element={
                                            <RoleProtectedRoute allowedRole={UserRoleEnum.Expert}>
                                                <ExpertPanel/>
                                            </RoleProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/content"
                                        element={
                                            <RoleProtectedRoute allowedRole={UserRoleEnum.ContentModerator}>
                                                <ContentPanel/>
                                            </RoleProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </ExpertProvider>
                    </AdminProvider>
                </ContentProvider>
            </ProfileProvider>
        </AuthProvider>
    </ThemeProvider>
);
export default App;