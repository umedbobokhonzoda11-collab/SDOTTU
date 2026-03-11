/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useEffect } from 'react';
import { Eye, EyeOff, List, Calendar, BarChart3, User, Phone, LogOut, MoreHorizontal, Menu as MenuIcon, AlertTriangle, Home, ChevronRight, Settings, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'lessons' | 'exams' | 'grades' | 'profile' | 'contact';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('jamolkhon/23');
  const [password, setPassword] = useState('jamolkhon/23');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const userScale = 0.7; // User requested 70% scale
      if (isDesktopView) {
        const baseTargetWidth = 1440;
        const targetWidth = baseTargetWidth / userScale; // approx 2057px
        const currentWidth = window.innerWidth;
        const newScale = currentWidth / targetWidth;
        setScaleFactor(newScale);
      } else {
        setScaleFactor(userScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isDesktopView]);

  const [studentData, setStudentData] = useState(() => {
    const savedData = typeof window !== 'undefined' ? localStorage.getItem('student_data') : null;
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }
    return {
      fullName: 'Бобохонзода Умедҷон Ҷамолхон',
      photo: '/profile.jpg',
      id: '8647',
      isOrphan: 'Ятим нест',
      country: 'Тоҷикистон',
      region: 'Маълумот нест',
      city: 'Маълумот нест',
      address: 'В.Хатлон ш.Кӯлоб Ҷ.Д.Зираки д.Хоҷаисҳоқ',
      faculty: 'Энергетикӣ',
      specialty: '1-430101 - Нерӯгоҳҳои барқӣ',
      course: '4',
      group: 'Б',
      formOfStudy: 'Буҷавӣ',
      degree: 'Бакалавр',
      status: 'Фаъол',
      phone: '988479974',
      email: 'jamolkhon@example.com',
      gender: 'Мард',
      birthday: '11.12.2004',
      age: '21',
      passport: 'Маълумот нест',
      visits: '373',
      nationality: 'Тоҷик',
      login: 'jamolkhon/23',
      lastVisit: '08 Март 2026, 15:25:22'
    };
  });

  useEffect(() => {
    localStorage.setItem('student_data', JSON.stringify(studentData));
  }, [studentData]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('lessons');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // On smaller screens or as requested, close the menu after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <div 
        className={isDesktopView ? "fixed inset-0 overflow-auto bg-black" : "min-h-screen bg-[#F3F4F6]"}
        style={isDesktopView ? { width: '100vw', height: '100vh' } : {}}
      >
        <div
          style={{
            width: isDesktopView ? `${1440 / 0.7}px` : `${100 / scaleFactor}%`,
            minHeight: '100%',
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top left',
            transition: 'transform 0.3s ease-out',
            overflow: isDesktopView ? 'auto' : 'visible',
            paddingBottom: '100px' // Increased padding at the bottom for better scrolling experience
          }}
        >
          <AnimatePresence mode="wait">
          {!isLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
            style={{ 
              backgroundImage: `url('https://ttu.tj/wp-content/uploads/2021/04/IMG_20210420_111054-scaled.jpg')`,
              filter: 'brightness(0.5)'
            }}
          />
          
          {/* Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md px-8 flex flex-col items-center text-center space-y-8"
          >
            {/* Logo */}
            <div className="w-48 h-48 relative mb-2 flex items-center justify-center">
              <img 
                src="https://ttu.tj/wp-content/uploads/2021/04/logo-ttu-1.png" 
                alt="TTU Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Title */}
            <div className="space-y-1 text-white">
              <h1 className="text-4xl font-bold leading-tight tracking-wide">Системаи</h1>
              <h1 className="text-4xl font-bold leading-tight tracking-wide">иттилоотии</h1>
              <h2 className="text-3xl font-bold leading-tight mt-2">Донишгоҳи техникии</h2>
              <h2 className="text-3xl font-bold leading-tight">Тоҷикистон ба номи</h2>
              <h2 className="text-3xl font-bold leading-tight">академик М.С.Осимӣ</h2>
            </div>

            {/* Login Form */}
            <div className="w-full space-y-6 mt-6">
              <div className="flex flex-col items-start space-y-2">
                <label className="text-white text-sm font-medium ml-1 opacity-90">Логин</label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full bg-[#E8F0FE] text-gray-900 px-4 py-4 rounded-sm outline-none border-b-[4px] border-purple-600 transition-all duration-300 text-xl shadow-lg"
                />
              </div>

              <div className="flex flex-col items-start space-y-2">
                <label className="text-white text-sm font-medium ml-1 opacity-90">Парол</label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#E8F0FE] text-gray-900 px-4 py-4 rounded-sm outline-none border-b-[4px] border-purple-600 transition-all duration-300 text-xl pr-14 shadow-lg"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="w-full mt-10 py-5 rounded-full bg-gradient-to-r from-[#33CCFF] to-[#B249F0] text-white font-bold text-xl tracking-widest shadow-2xl transition-all duration-300 uppercase"
              >
                ДАРОМАДАН
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen w-full bg-[#F3F4F6] flex flex-col font-sans"
        >
          {/* Header */}
          <header className="h-16 bg-[#1F2937] flex items-center justify-between px-4 shadow-md z-30 sticky top-0">
            <div className="flex items-center space-x-4">
              <button onClick={toggleSidebar} className="text-white hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <MenuIcon size={24} />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-lg tracking-wider">SDO.TTU.TJ</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 relative">
              <div className="hidden sm:flex items-center space-x-2 mr-2">
                <span className="text-gray-300 text-xs font-medium">{studentData.fullName.split(' ')[0]}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 bg-gray-700 flex items-center justify-center">
                  {studentData.photo ? (
                    <img src={studentData.photo} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-gray-400" />
                  )}
                </div>
              </div>
              <button 
                onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                className="text-white hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <MoreHorizontal size={24} />
              </button>

              <AnimatePresence>
                {isHeaderMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsHeaderMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden"
                    >
                      <button 
                        onClick={() => {
                          setIsDesktopView(false);
                          setIsHeaderMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-3 transition-colors ${!isDesktopView ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isDesktopView ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-600'}`}>
                          <Phone size={18} />
                        </div>
                        <span className="font-medium">Версияи телефони</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsDesktopView(true);
                          setIsHeaderMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-3 transition-colors ${isDesktopView ? 'text-purple-600 bg-purple-50' : 'text-gray-700'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDesktopView ? 'bg-purple-100 text-purple-600' : 'bg-purple-50 text-purple-600'}`}>
                          <List size={18} />
                        </div>
                        <span className="font-medium">Версияи компютери</span>
                      </button>
                      <div className="h-px bg-gray-100 my-1" />
                      <button 
                        onClick={() => {
                          setIsHeaderMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                          <LogOut size={18} />
                        </div>
                        <span className="font-medium">Баромад</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute inset-0 bg-black/50 z-10 lg:hidden"
                />
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside 
              initial={false}
              animate={{ 
                width: isSidebarOpen ? 288 : 0,
                x: isSidebarOpen ? 0 : -288
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#1F2937] flex flex-col border-t border-gray-700 shrink-0 z-20 absolute lg:relative h-full overflow-hidden"
            >
              <div className="px-6 py-4 whitespace-nowrap">
                <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Меню</span>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                <SidebarItem 
                  icon={<List size={20} />} 
                  label="Рӯйхати дарсҳо" 
                  active={activeTab === 'lessons'} 
                  onClick={() => handleTabChange('lessons')}
                />
                <SidebarItem 
                  icon={<Calendar size={20} />} 
                  label="Ҷадвали имтиҳонҳо" 
                  active={activeTab === 'exams'} 
                  onClick={() => handleTabChange('exams')}
                />
                <SidebarItem 
                  icon={<BarChart3 size={20} />} 
                  label="Баҳоҳои ман" 
                  active={activeTab === 'grades'} 
                  onClick={() => handleTabChange('grades')}
                />
                <SidebarItem 
                  icon={<User size={20} />} 
                  label="Маълумотномаи ман" 
                  active={activeTab === 'profile'} 
                  onClick={() => handleTabChange('profile')}
                />
                <SidebarItem 
                  icon={<Phone size={20} />} 
                  label="Тамос" 
                  active={activeTab === 'contact'} 
                  onClick={() => handleTabChange('contact')}
                />
                <SidebarItem 
                  icon={<LogOut size={20} />} 
                  label="Баромад" 
                  onClick={handleLogout}
                />
              </nav>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 bg-[#F3F4F6] ${isDesktopView ? 'overflow-auto' : 'overflow-visible'}`}>
              {activeTab === 'lessons' && <MyLessonsView studentData={studentData} />}

              {activeTab === 'grades' && <GradesView />}
              {activeTab === 'profile' && <ProfileView studentData={studentData} />}
              {activeTab === 'contact' && <ContactView />}
              {activeTab === 'exams' && <ExamsView />}
            </main>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
        </div>
      </div>

      {/* Floating Settings Button - Always visible */}
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-white/60 backdrop-blur-sm p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-300 group"
        title="Танзимот"
      >
        <Settings size={16} className="text-gray-500 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b flex items-center justify-between bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Settings size={24} className="text-purple-600" />
                  Танзимоти маълумот
                </h3>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                      {studentData.photo ? (
                        <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-gray-300" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                      <Upload className="text-white" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Check file size (limit to 2MB for localStorage)
                            if (file.size > 2 * 1024 * 1024) {
                              alert("Акс хеле калон аст. Лутфан аксеро интихоб кунед, ки ҳаҷмаш аз 2МБ хурдтар бошад.");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setStudentData({ ...studentData, photo: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 italic">Аксро иваз кунед</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ному насаб</label>
                    <input 
                      type="text" 
                      value={studentData.fullName}
                      onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">ID-и донишҷӯ</label>
                    <input 
                      type="text" 
                      value={studentData.id}
                      onChange={(e) => setStudentData({ ...studentData, id: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ятим</label>
                    <select 
                      value={studentData.isOrphan}
                      onChange={(e) => setStudentData({ ...studentData, isOrphan: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    >
                      <option value="Ятим нест">Ятим нест</option>
                      <option value="Ятим">Ятим</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Кишвар</label>
                    <input 
                      type="text" 
                      value={studentData.country}
                      onChange={(e) => setStudentData({ ...studentData, country: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Вилоят / Минтақа</label>
                    <input 
                      type="text" 
                      value={studentData.region}
                      onChange={(e) => setStudentData({ ...studentData, region: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ноҳия / Шаҳр</label>
                    <input 
                      type="text" 
                      value={studentData.city}
                      onChange={(e) => setStudentData({ ...studentData, city: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ҷои зист</label>
                    <input 
                      type="text" 
                      value={studentData.address}
                      onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Факултет</label>
                    <input 
                      type="text" 
                      value={studentData.faculty}
                      onChange={(e) => setStudentData({ ...studentData, faculty: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ихтисос</label>
                    <input 
                      type="text" 
                      value={studentData.specialty}
                      onChange={(e) => setStudentData({ ...studentData, specialty: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Курс</label>
                    <input 
                      type="text" 
                      value={studentData.course}
                      onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Гурӯҳ</label>
                    <input 
                      type="text" 
                      value={studentData.group}
                      onChange={(e) => setStudentData({ ...studentData, group: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Шакли таҳсил</label>
                    <input 
                      type="text" 
                      value={studentData.formOfStudy}
                      onChange={(e) => setStudentData({ ...studentData, formOfStudy: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Дараҷаи таҳсил</label>
                    <input 
                      type="text" 
                      value={studentData.degree}
                      onChange={(e) => setStudentData({ ...studentData, degree: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ҳолат</label>
                    <input 
                      type="text" 
                      value={studentData.status}
                      onChange={(e) => setStudentData({ ...studentData, status: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Телефон</label>
                    <input 
                      type="text" 
                      value={studentData.phone}
                      onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                    <input 
                      type="email" 
                      value={studentData.email}
                      onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ҷинс</label>
                    <select 
                      value={studentData.gender}
                      onChange={(e) => setStudentData({ ...studentData, gender: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    >
                      <option value="Мард">Мард</option>
                      <option value="Зан">Зан</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Рӯзи таваллуд</label>
                    <input 
                      type="text" 
                      value={studentData.birthday}
                      onChange={(e) => setStudentData({ ...studentData, birthday: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Миллат</label>
                    <input 
                      type="text" 
                      value={studentData.nationality}
                      onChange={(e) => setStudentData({ ...studentData, nationality: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">№ Шинонома</label>
                    <input 
                      type="text" 
                      value={studentData.passport}
                      onChange={(e) => setStudentData({ ...studentData, passport: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Логин</label>
                    <input 
                      type="text" 
                      value={studentData.login}
                      onChange={(e) => setStudentData({ ...studentData, login: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Сину сол</label>
                    <input 
                      type="text" 
                      value={studentData.age}
                      onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Шумораи воридшавӣ</label>
                    <input 
                      type="text" 
                      value={studentData.visits}
                      onChange={(e) => setStudentData({ ...studentData, visits: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end items-center gap-4">
                {showSaveSuccess && (
                  <motion.span 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-600 font-medium text-sm"
                  >
                    Маълумот захира шуд!
                  </motion.span>
                )}
                <button 
                  onClick={() => {
                    setShowSaveSuccess(true);
                    setTimeout(() => {
                      setShowSaveSuccess(false);
                      setIsSettingsOpen(false);
                    }, 1500);
                  }}
                  className="bg-purple-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
                >
                  Захира кардан
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MyLessonsView({ studentData }: { studentData: any }) {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <Home size={16} />
        <ChevronRight size={14} />
        <span>Дарсҳои ман</span>
        <ChevronRight size={14} />
        <span>2025-2026</span>
        <ChevronRight size={14} />
        <span>Нимсолаи 2</span>
      </div>

      {/* Announcement Banner */}
      <div className="bg-red-600 text-white rounded-lg p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="bg-white p-4 rounded-full">
            <AlertTriangle size={48} className="text-red-600" />
          </div>
          <h2 className="text-4xl font-black tracking-widest">ЭЪЛОН!!!</h2>
          
          <div className="space-y-4 text-lg font-bold leading-relaxed max-w-5xl">
            <p>
              Ба таваҷҷӯҳи донишҷӯёни шуъбаи РӮЗОНА, ФОСИЛАВӢ ва МАГИСТРАНТОН расонида мешавад, ки мувофиқи нақшаи раванди таълим ТРИМЕСТР барои нимсолаи якуми соли таҳсили 2025-2026 АЗ САНАИ 12.01.2026 ТО 24.01.2026 ба роҳ монда мешавад.
            </p>
            <p>
              Барои бартараф намудани қарзҳои академӣ ба садорати факултет муроҷиат намоед.
            </p>
            <p>
              Равзанаи «ХУДРО БИСАНҶ» доимо фаъол аст. Дар равзанаи мазкур Шумо имкон доред, ки омода будани худро барои супоридани имтиҳонҳои тестӣ санҷед. Дар ҳолати пайдошудани нофаҳмӣ оид ба саволномаҳо, шумо метавонед ба садорати факултет ва омӯзгори дарсбаранда муроҷиат намоед.
            </p>
          </div>
          
          <div className="pt-4">
            <span className="text-[#CCFF00] text-2xl font-bold italic">
              Раёсати ДТТ ба номи академик М.С.Осимӣ
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Дарсҳои ман</h2>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-red-600">ID-и Шумо: {studentData.id}</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1F2937] text-white">
                  <th className="border border-gray-700 p-3 text-center w-12">№</th>
                  <th className="border border-gray-700 p-3 text-left">Номгӯи фанҳо</th>
                  <th className="border border-gray-700 p-3 text-center">Миқдори кредитҳо</th>
                  <th className="border border-gray-700 p-3 text-center">Холи Р1</th>
                  <th className="border border-gray-700 p-3 text-center">Холи Р2</th>
                  <th className="border border-gray-700 p-3 text-center">Холи имтиҳон</th>
                  <th className="border border-gray-700 p-3 text-center">Холи умумӣ</th>
                  <th className="border border-gray-700 p-3 text-center">Баҳо</th>
                  <th className="border border-gray-700 p-3 text-left">Омӯзгор(он)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 p-3 text-center font-bold">1.</td>
                  <td className="border border-gray-200 p-3">Таҷрибаомӯзии пешаздипломӣ</td>
                  <td className="border border-gray-200 p-3 text-center">6</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">F (0)</td>
                  <td className="border border-gray-200 p-3">Қасобов Лоиқ Сафарович</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 p-3 text-center font-bold">2.</td>
                  <td className="border border-gray-200 p-3">Имтиҳони давлатӣ</td>
                  <td className="border border-gray-200 p-3 text-center">3</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">F (0)</td>
                  <td className="border border-gray-200 p-3">
                    Султонзода Шерхон Муртазо<br />
                    Зокирзода Аминҷон Раҳмон
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 p-3 text-center font-bold">3.</td>
                  <td className="border border-gray-200 p-3">Кори тахассусии хатм</td>
                  <td className="border border-gray-200 p-3 text-center">9</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">0</td>
                  <td className="border border-gray-200 p-3 text-center">F (0)</td>
                  <td className="border border-gray-200 p-3">
                    Султонзода Шерхон Муртазо, Зокирзода Аминҷон Раҳмон, Пирова Шамсия Ҳотамовна, Ғаниев Зокирҷон Султонович, Давлатшоев Доробшо Сафарович, Қасобов Лоиқ Сафарович, Қирғизов Алифбек Қирғизович, Раҳимзода Ҷамшед Бобомурод, Раҳимзода Фирдавс
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <Home size={16} />
        <ChevronRight size={14} />
        <span>Тамос</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Тамос</h2>
          
          <div className="flex flex-col items-center text-center space-y-8 py-10">
            <div className="self-start text-gray-600 text-sm font-medium">
              10.152.18.158
            </div>

            <div className="w-64 h-64">
              <img 
                src="https://ttu.tj/wp-content/uploads/2021/04/logo-ttu-1.png" 
                alt="TTU Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-6 max-w-3xl">
              <h3 className="text-2xl font-bold text-gray-800">
                Донишгоҳи техникии Тоҷикистон ба номи академик М.С. Осимӣ
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-base">
                  Ҷумҳурии Тоҷикистон, шаҳри Душанбе – 735140, кӯчаи академик Раҷабов 10
                </p>
                
                <p className="text-base">
                  Тел: +992 918 45 56 65 - Ашурзода Баҳром Хайриддин - Мудири шуъбаи автоматикунонии раванди таълим
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileView({ studentData }: { studentData: any }) {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <Home size={16} />
        <ChevronRight size={14} />
        <span>Маълумотномаи ман</span>
        <ChevronRight size={14} />
        <span>2025-2026</span>
        <ChevronRight size={14} />
        <span>Нимсолаи 2</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Маълумотнома</h2>
          
          {/* Personal Info Grid */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Photo Placeholder */}
            <div className="w-44 h-56 shrink-0 border-4 border-white shadow-xl rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
              {studentData.photo ? (
                <img src={studentData.photo} alt="Profile" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              ) : (
                <User size={80} className="text-gray-400" />
              )}
            </div>

            {/* Info Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 w-1/4 text-gray-600">Ному насаб:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800">{studentData.fullName}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Ятим:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800">{studentData.isOrphan}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Кишвар:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800">{studentData.country}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Вилоят / Минтақа:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800 flex items-center space-x-1">
                      {studentData.region === 'Маълумот нест' && <AlertTriangle size={14} className="text-red-600" />}
                      <span className={studentData.region === 'Маълумот нест' ? 'text-red-600' : ''}>{studentData.region}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Ноҳия / Шаҳр:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800 flex items-center space-x-1">
                      {studentData.city === 'Маълумот нест' && <AlertTriangle size={14} className="text-red-600" />}
                      <span className={studentData.city === 'Маълумот нест' ? 'text-red-600' : ''}>{studentData.city}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Ҷои зист:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800">{studentData.address}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 bg-gray-50 text-gray-600">Миллат:</td>
                    <td className="border border-gray-200 p-2 font-bold text-gray-800">{studentData.nationality}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Secondary Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 mb-10">
            <InfoRow label="Логин:" value={studentData.login} />
            <InfoRow label="Ҷинс:" value={studentData.gender} />
            <InfoRow label="Парол:" value="********" />
            <div className="flex border border-gray-200">
              <div className="w-1/2 p-2 bg-gray-50 text-gray-600 text-sm border-r border-gray-200">Рӯзи таваллуд:</div>
              <div className="w-1/2 p-2 font-bold text-gray-800 text-sm flex justify-between">
                <span>{studentData.birthday}</span>
                <span className="text-gray-400 font-normal ml-2">Сину сол: <span className="text-gray-800 font-bold">{studentData.age}</span></span>
              </div>
            </div>
            <InfoRow label="Телефон:" value={studentData.phone} />
            <InfoRow label="Бори охир:" value={studentData.lastVisit} />
            <div className="flex border border-gray-200">
              <div className="w-1/2 p-2 bg-gray-50 text-gray-600 text-sm border-r border-gray-200">№ Шинонома:</div>
              <div className="w-1/2 p-2 font-bold text-gray-800 text-sm flex items-center space-x-1">
                {studentData.passport === 'Маълумот нест' && <AlertTriangle size={14} className="text-red-600" />}
                <span className={studentData.passport === 'Маълумот нест' ? 'text-red-600' : ''}>{studentData.passport}</span>
              </div>
            </div>
            <InfoRow label="Даромадааст:" value={studentData.visits} />
          </div>

          {/* Education Info Section */}
          <div className="space-y-4 mb-10">
            <h3 className="font-bold text-gray-800 text-sm">Маълумотнома дар бораи таҳсилоти донишҷӯ</h3>
            <div className="border border-gray-200">
              <InfoRow label="Факултет:" value={studentData.faculty} />
              <InfoRow label="Курс:" value={studentData.course} />
              <InfoRow label="Ихтисос:" value={studentData.specialty} />
              <InfoRow label="Гурӯҳ:" value={studentData.group} />
              <InfoRow label="Зинаи таҳсил:" value={studentData.degree} />
              <InfoRow label="Шакли таҳсил:" value={studentData.formOfStudy} />
              <InfoRow label="Намуди таҳсил:" value="Рӯзона" />
            </div>
          </div>

          {/* Academic History Table */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-sm">Таърихи таҳсилот</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#2D3748] text-white">
                    <th className="border border-gray-600 p-2">Соли таҳсил</th>
                    <th className="border border-gray-600 p-2">Семестр</th>
                    <th className="border border-gray-600 p-2">Факултет</th>
                    <th className="border border-gray-600 p-2">Шуъба</th>
                    <th className="border border-gray-600 p-2">Курс</th>
                    <th className="border border-gray-600 p-2">Ихтисос</th>
                    <th className="border border-gray-600 p-2">Гурӯҳ</th>
                    <th className="border border-gray-600 p-2">Шакли таҳсил</th>
                    <th className="border border-gray-600 p-2">Намуди фармон</th>
                    <th className="border border-gray-600 p-2">Рақами фармон</th>
                    <th className="border border-gray-600 p-2">Амалҳо</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: '2023-2024', sem: 3, fac: 'МТДМТБ-ДТТ', dept: 'Рӯзона', kurs: 2, spec: '1-4301', group: 'Б1', form: 'Буҷавӣ' },
                    { year: '2023-2024', sem: 4, fac: 'МТДМТБ-ДТТ', dept: 'Рӯзона', kurs: 2, spec: '1-4301', group: 'Б1', form: 'Буҷавӣ' },
                    { year: '2024-2025', sem: 5, fac: 'Энергетикӣ', dept: 'Рӯзона', kurs: 3, spec: '1-430101', group: 'Б', form: 'Буҷавӣ' },
                    { year: '2024-2025', sem: 6, fac: 'Энергетикӣ', dept: 'Рӯзона', kurs: 3, spec: '1-430101', group: 'Б', form: 'Буҷавӣ' },
                    { year: '2025-2026', sem: 7, fac: 'Энергетикӣ', dept: 'Рӯзона', kurs: 4, spec: '1-430101', group: 'Б', form: 'Буҷавӣ' },
                    { year: '2025-2026', sem: 8, fac: 'Энергетикӣ', dept: 'Рӯзона', kurs: 4, spec: '1-430101', group: 'Б', form: 'Буҷавӣ' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 text-center">
                      <td className="border border-gray-200 p-2">{row.year}</td>
                      <td className="border border-gray-200 p-2">{row.sem}</td>
                      <td className="border border-gray-200 p-2">{row.fac}</td>
                      <td className="border border-gray-200 p-2">{row.dept}</td>
                      <td className="border border-gray-200 p-2">{row.kurs}</td>
                      <td className="border border-gray-200 p-2">{row.spec}</td>
                      <td className="border border-gray-200 p-2">{row.group}</td>
                      <td className="border border-gray-200 p-2">{row.form}</td>
                      <td className="border border-gray-200 p-2"></td>
                      <td className="border border-gray-200 p-2"></td>
                      <td className="border border-gray-200 p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex border border-gray-200">
      <div className="w-1/2 p-2 bg-gray-50 text-gray-600 text-sm border-r border-gray-200">{label}</div>
      <div className="w-1/2 p-2 font-bold text-gray-800 text-sm">{value}</div>
    </div>
  );
}

function GradesView() {
  return (
    <div className="p-4 space-y-8 bg-[#F3F4F6] min-h-full">
      {/* Semester 1 - Kurs 2 */}
      <GradeTable 
        title="Курси 2, соли таҳсили 2023-2024, нимсолаи 1"
        noData
      />

      {/* Semester 2 - Kurs 2 */}
      <GradeTable 
        title="Курси 2, соли таҳсили 2023-2024, нимсолаи 2"
        noData
      />

      {/* Semester 1 - Kurs 3 */}
      <GradeTable 
        title="Курси 3, соли таҳсили 2024-2025, нимсолаи 1"
        data={[
          { id: 1, name: 'Фалсафа', credits: 4, r1: 78, r2: 78, exam: 78, total: 78, grade: 'B- (2.67)', teacher: 'Раҳимов М. Ҳ. Раҷабализода Ф. Р.' },
          { id: 2, name: 'Ҳуқуқ аз рӯи ихтисос', credits: 3, r1: 90, r2: 90, exam: 90, total: 90, grade: 'A- (3.67)', teacher: 'Раҷабализода Ф. Р. Сатториён М. Қ.' },
          { id: 3, name: 'Механикаи электрикӣ', credits: 5, r1: 30, r2: 60, exam: 70, total: 58, grade: 'D+ (1.33)', teacher: 'Ҷаборов М. М.' },
          { id: 4, name: 'Техникаи ченкунии иттилоотӣ ва электронӣ', credits: 3, r1: 78, r2: 78, exam: 78, total: 78, grade: 'B- (2.67)', teacher: 'Аминов Ҷ. Б. Довудов С. У.' },
          { id: 5, name: 'Шабакаҳо ва системаҳои электроэнергетикӣ', credits: 6, r1: 24, r2: 70, exam: 77, total: 63, grade: 'C- (1.67)', teacher: 'Султонзода Ш. М.' },
          { id: 6, name: 'Бехатарии электрикӣ', credits: 3, r1: 50, r2: 70, exam: 0, total: 70, grade: 'C+ (2.33)', teacher: 'Аҳёев Ҷ. С.' },
          { id: 7, name: 'Электротаъминкунӣ', credits: 6, r1: 65, r2: 70, exam: 85, total: 76, grade: 'B- (2.67)', teacher: 'Ҳасанзода Н.' },
        ]}
      />

      {/* Semester 2 - Kurs 3 */}
      <GradeTable 
        title="Курси 3, соли таҳсили 2024-2025, нимсолаи 2"
        data={[
          { id: 1, name: 'Таҷрибаомӯзии истеҳсолӣ', credits: 3, r1: 0, r2: 0, exam: 0, total: 60, grade: 'C- (1.67)', teacher: 'Қасобов Л. С.' },
          { id: 2, name: 'Шабакаҳо ва системаҳои электроэнергетикӣ', credits: 3, r1: 20, r2: 20, exam: 0, total: 60, grade: 'C- (1.67)', teacher: 'Султонзода Ш. М.' },
          { id: 3, name: 'Ҳимояи релей ва автоматика', credits: 6, r1: 15, r2: 37, exam: 0, total: 51, grade: 'D (1.0)', teacher: 'Мирзозода Б. М.' },
          { id: 4, name: 'Аппаратҳои электрикӣ', credits: 3, r1: 85, r2: 85, exam: 85, total: 85, grade: 'B+ (3.33)', teacher: 'Аҳёев Ҷ. С.' },
          { id: 5, name: 'Реҷаҳои кории таҷҳизоти электрикии неругоҳҳо ва зернеругоҳҳо', credits: 3, r1: 50, r2: 30, exam: 0, total: 55, grade: 'D+ (1.33)', teacher: 'Қасобов Л. С.' },
          { id: 6, name: 'Қисми электрикии неругоҳҳо ва зернеругоҳҳо', credits: 3, r1: 30, r2: 30, exam: 0, total: 70, grade: 'C+ (2.33)', teacher: 'Аҳёев Ҷ. С.' },
          { id: 7, name: 'Таҷҳизотҳои гидроэнергетикӣ', credits: 6, r1: 30, r2: 50, exam: 75, total: 58, grade: 'D+ (1.33)', teacher: 'Аҳёев Ҷ. С.' },
          { id: 8, name: 'Сарфаҷӯӣ ва самаранокии энергия', credits: 3, r1: 0, r2: 0, exam: 0, total: 66, grade: 'C (2.0)', teacher: 'Хуҷасаидов Ҷ. Х.' },
        ]}
      />

      {/* Semester 1 - Kurs 4 */}
      <GradeTable 
        title="Курси 4, соли таҳсили 2025-2026, нимсолаи 1"
        data={[]}
      />
    </div>
  );
}

function GradeTable({ title, data = [], noData = false }: { title: string, data?: any[], noData?: boolean }) {
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-200">
      <div className="bg-[#2D3748] text-white py-2 px-4 text-center font-bold text-sm">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#2D3748] text-white border-t border-gray-600">
              <th className="border border-gray-600 p-2 w-10">№</th>
              <th className="border border-gray-600 p-2 text-left">Номгӯи фанҳо</th>
              <th className="border border-gray-600 p-2 w-20">Миқдори кредитҳо</th>
              <th className="border border-gray-600 p-2 w-16">Холи Р1</th>
              <th className="border border-gray-600 p-2 w-16">Холи Р2</th>
              <th className="border border-gray-600 p-2 w-16">Холи имтиҳон</th>
              <th className="border border-gray-600 p-2 w-16">Холи умумӣ</th>
              <th className="border border-gray-600 p-2 w-20">Баҳо</th>
              <th className="border border-gray-600 p-2 text-left">Омӯзгор(он)</th>
            </tr>
          </thead>
          <tbody>
            {noData ? (
              <tr>
                <td colSpan={9} className="p-4 text-center font-bold text-gray-800 bg-white">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertTriangle size={16} className="text-black" />
                    <span>Маълумот вуҷуд надорад!</span>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="border border-gray-200 p-2 text-center font-bold">{row.id}.</td>
                  <td className="border border-gray-200 p-2 text-left">{row.name}</td>
                  <td className="border border-gray-200 p-2 text-center">{row.credits}</td>
                  <td className="border border-gray-200 p-2 text-center">{row.r1}</td>
                  <td className="border border-gray-200 p-2 text-center">{row.r2}</td>
                  <td className="border border-gray-200 p-2 text-center">{row.exam}</td>
                  <td className="border border-gray-200 p-2 text-center">{row.total}</td>
                  <td className="border border-gray-200 p-2 text-center font-medium">{row.grade}</td>
                  <td className="border border-gray-200 p-2 text-left text-[10px] leading-tight">{row.teacher}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-400 italic">
                  Маълумот дар ҳоли таҳия...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-6 py-4 space-x-4 transition-colors relative ${
        active ? 'bg-[#111827] text-white' : 'text-gray-300 hover:bg-[#374151] hover:text-white'
      }`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3B82F6]"></div>}
      <span className={active ? 'text-[#3B82F6]' : 'text-gray-400'}>{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
}

function ExamsView() {
  const exams = [
    { id: 1, subjectId: 36, name: 'Таҷрибаомӯзии пешаздипломи', type: 'Шифоҳӣ', date: '', teacher: 'Қасобов Лоиқ Сафарович', question: 0, grade: 'F' },
    { id: 2, subjectId: 37, name: 'Имтиҳони давлатӣ', type: 'Шифоҳӣ', date: '', teacher: 'Султонзода Шерхон Муртазо, Зокирзода Аминҷон Раҳмон', question: 0, grade: 'F' },
    { id: 3, subjectId: 38, name: 'Кори тахассусии хатм', type: 'Шифоҳӣ', date: '', teacher: 'Султонзода Шерхон Муртазо, Зокирзода Аминҷон Раҳмон, Пирова Шамсия Ҳотамовна, Ғаниев Зокирҷон Султонович, Давлатшоев Доробшо, Қасобов Лоиқ Сафарович, Қирғизов Алифбек Қирғизович, Раҳимзода Ҷамшед Бобомурод, Раҳимзода Фирдавс, Мирзоумар, Хуҷасаидов Ҷаҳонгир Хуҷасаидович, Ҳасанзода Насрулло, Ахророва Алфия Додохоновна, Ситамов Сикандар, Муқимова Наргис Рустамовна, Аҳёев Ҷавод Саламшоевич', question: 0, grade: 'F' },
    { id: 4, subjectId: 199, name: 'Равандҳои гузарандаи электромагнитӣ ва электромеханикӣ дар системаҳои электроэнергетикӣ', type: 'Шифоҳӣ', date: '', teacher: 'Султонзода Шерхон Муртазо, Сафаралиев Муродбек Холназарович', question: 542, grade: 'F' },
    { id: 5, subjectId: 211, name: 'Эътимоднокии таҷҳизотҳои электрикӣ', type: 'Тестӣ', date: '', teacher: 'Раҳимзода Фирдавс Мирзоумар', question: 102, grade: 'F' },
    { id: 6, subjectId: 212, name: 'Лоиҳакашии қисми електрикии неругоҳҳо ва зернеругоҳҳо', type: 'Шифоҳӣ', date: '', teacher: 'Қирғизов Алифбек Қирғизович', question: 153, grade: 'F' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <Home size={16} />
        <ChevronRight size={14} />
        <span>Ҷадвали имтиҳон</span>
        <ChevronRight size={14} />
        <span>2025-2026</span>
        <ChevronRight size={14} />
        <span>Нимсолаи 2</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Ҷадвали имтиҳонҳо</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-200">
              <thead>
                <tr className="bg-[#2D3748] text-white">
                  <th className="border border-gray-600 p-2 w-10">№</th>
                  <th className="border border-gray-600 p-2 w-16">ID ФАН</th>
                  <th className="border border-gray-600 p-2 text-left">Номгӯи фанҳо</th>
                  <th className="border border-gray-600 p-2 w-24">Шакли имтиҳон</th>
                  <th className="border border-gray-600 p-2 w-24">Санаи имтиҳон</th>
                  <th className="border border-gray-600 p-2 text-left">Омӯзгор(он)</th>
                  <th className="border border-gray-600 p-2 w-16">Савол</th>
                  <th className="border border-gray-600 p-2 w-16">Баҳо</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50 text-center">
                    <td className="border border-gray-200 p-2 font-bold">{exam.id}.</td>
                    <td className="border border-gray-200 p-2 font-bold">{exam.subjectId}</td>
                    <td className="border border-gray-200 p-2 text-left">{exam.name}</td>
                    <td className="border border-gray-200 p-2">{exam.type}</td>
                    <td className="border border-gray-200 p-2">{exam.date}</td>
                    <td className="border border-gray-200 p-2 text-left text-[10px] leading-tight">{exam.teacher}</td>
                    <td className="border border-gray-200 p-2">{exam.question}</td>
                    <td className="border border-gray-200 p-2">{exam.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
