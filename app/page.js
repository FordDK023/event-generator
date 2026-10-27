'use client';

import { useState, useEffect } from 'react';
import { phuketVenues } from './venues';
import { supabase } from '../lib/supabase.js';

const galleryItems = [
  {
    id: 0,
    type: 'wedding',
    title: 'งานแต่งงานสไตล์ Tropical Sunset',
    img: "/images/Tropical Sunset.jpg",
    eventTypeSelect: 'งานแต่งงาน',
    foodStyleSelect: 'ค็อกเทล (Cocktail)',
    concept: 'พิธีหมั้นและฉลองมงคลสมรสริมชายหาดยามพระอาทิตย์ตกดิน เน้นดอกไม้เขตร้อนสีสดใส ผสมผสานความหรูหราแบบเป็นกันเอง ได้รับแรงบันดาลใจจากแสงยามเย็นของท้องทะเลภูเก็ต',
    bestTime: '16:30 - 21:00 น. (ช่วงพระอาทิตย์ตกดิน)',
    recommendedVenues: 'Amari Phuket, Catch Beach Club, Cape Panwa Hotel',
    colors: [
      { name: 'ส้มซันเซ็ท', hex: '#f97316' },
      { name: 'ทองลักชัวรี', hex: '#eab308' },
      { name: 'ขาวครีม', hex: '#fef3c7' },
      { name: 'เขียวใบกล้วยไม้', hex: '#15803d' }
    ],
    decorations: [
      'ซุ้มโค้งดอกกล้วยไม้และกุหลาบสีส้มทองริมหาด',
      'ทางเดินกระจกใสสะท้อนแสงเทียนยามเย็น',
      'แท่นพิธีโปร่งใสมองเห็นวิวทะเล 360 องศา',
      'ไฟประดับ Fairy Lights ระยิบระยับยามค่ำคืน',
      'มุม Photo Backdrop ไม้แท้ประดับนีออนกะรัต'
    ],
    foodRec: 'เน้นบาร์ค็อกเทลเครื่องดื่มผลไม้ตระกูลส้ม/มะพร้าว คู่กับฟิงเกอร์ฟู้ดซีฟู้ดพอดีคำ (Cocktail & Canapé) พร้อมซีฟู้ดบาร์บีคิวย่างสด'
  },
  {
    id: 1,
    type: 'wedding',
    title: 'พิธีมงคลสมรสริมหาดทรายขาว',
    img: '/images/lifestyleasia.jpg',
    eventTypeSelect: 'งานแต่งงาน',
    foodStyleSelect: 'บุฟเฟ่ต์ (Buffet)',
    concept: 'งานแต่งงานเน้นความอบอุ่น โรแมนติก และมินิมอลบนหาดส่วนตัว สัมผัสทรายขาวยาวเหยียดใต้ร่มเงาต้นมะพร้าว ตกแต่งเรียบง่ายแต่สะท้อนรสนิยม',
    bestTime: '16:00 - 20:30 น.',
    recommendedVenues: 'Katathani Phuket Beach Resort, InterContinental Phuket Resort, The Slate Phuket',
    colors: [
      { name: 'ขาวบริสุทธิ์', hex: '#ffffff' },
      { name: 'ครีมนู้ด', hex: '#f5f5dc' },
      { name: 'ชมพูบลัช', hex: '#fbcfe8' },
      { name: 'เขียวยูคาลิปตัส', hex: '#4d7c0f' }
    ],
    decorations: [
      'ซุ้มไม้โปร่งประดับผ้าชีฟองสีขาวพริ้วไหว',
      'เก้าอี้ไม้ทรง Chiavari ตกแต่งโบว์สีครีม',
      'จุดลงทะเบียนธีมไม้ธรรมชาติพร้อมสมุดอวยพร',
      'ช่อดอกไม้เจ้าสาวโทนสีขาวอมชมพูพาสเทล'
    ],
    foodRec: 'บุฟเฟต์อาหารนานาชาติ รสชาตินุ่มนวล พร้อมสเตชันสลัดสด ซีฟู้ดเย็นดิปซอสสูตรพิเศษ และมุมขนมหวานไทยประยุกต์'
  },
  {
    id: 2,
    type: 'birthday',
    title: 'งานวันเกิด Luxury Pool Party',
    img: '/images/Luxury Pool Party.jpg',
    eventTypeSelect: 'วันเกิดผู้ใหญ่',
    foodStyleSelect: 'ค็อกเทล (Cocktail)',
    concept: 'ปาร์ตี้วันเกิดพูลวิลล่าสไตล์ชิค สนุกสนานริมสระน้ำส่วนตัว ตกแต่งแสงสีนีออนและลูกโป่งแฟนซี ให้บรรยากาศแบบคลับหรูหราส่วนตัว',
    bestTime: '18:00 - 24:00 น.',
    recommendedVenues: 'Keemala Phuket, Twinpalms Phuket Resort, Royal Phuket Marina',
    colors: [
      { name: 'ชมพูโรสโกลด์', hex: '#f43f5e' },
      { name: 'ม่วงแมกเจนต้า', hex: '#a855f7' },
      { name: 'ทองประกาย', hex: '#fbbf24' },
      { name: 'ดำไนท์คลับ', hex: '#0f172a' }
    ],
    decorations: [
      'ซุ้มลูกโป่งออร์แกนิกโทนโรสโกลด์ริมสระ',
      'ป้ายไฟนีออนชื่องานสำหรับถ่ายรูป',
      'ห่วงยางแฟนซีละลานตาและไฟเปลี่ยนสีในสระน้ำ',
      'เวทีดีเจและระบบแสงสีเสียงเต็มรูปแบบ',
      'เค้กวันเกิดดีไซน์โมเดิร์น 3 ชั้น'
    ],
    foodRec: 'ค็อกเทลสีสันสดใส บาร์เครื่องดื่มคราฟท์สั่งทำพิเศษ และบาร์ขนมหวาน Mini Pastry, Cupcakes & Finger Food'
  },
  {
    id: 3,
    type: 'party',
    title: 'Beach Dinner Party ใต้แสงดาว',
    img: '/images/Beach Dinner Party.jpg',
    eventTypeSelect: 'ปาร์ตี้ริมหาด',
    foodStyleSelect: 'บุฟเฟ่ต์ (Buffet)',
    concept: 'งานเลี้ยงสังสรรค์ริมชายหาดส่วนตัว บรรยากาศสบายๆ สไตล์ Bohemian Chill เคล้าเสียงคลื่นและแสงเทียน เหมาะสำหรับการรวมตัวเพื่อนฝูง',
    bestTime: '17:30 - 22:00 น.',
    recommendedVenues: 'Rawai Palm Beach Resort, Centara Grand Beach Resort Phuket, Catch Beach Club',
    colors: [
      { name: 'ส้มซันเซ็ท', hex: '#ea580c' },
      { name: 'น้ำเงินเนวี่', hex: '#1e3a8a' },
      { name: 'น้ำตาลไม้', hex: '#78350f' },
      { name: 'เบจเบิร์น', hex: '#d97706' }
    ],
    decorations: [
      'กระโจมผ้าสไตล์ Boho บนพื้นทราย',
      'เบาะนั่งพิงนุ่มๆ พร้อมโต๊ะไม้เตี้ยบนเสื่อพรม',
      'ตะเกียงแก้วเทียนหอมล้อมรอบบริเวณงาน',
      'กองไฟสร้างความอบอุ่นริมหาดพร้อมวงดนตรีโฟล์คซอง'
    ],
    foodRec: 'ซีฟู้ดบาร์บีคิวปิ้งย่างสดๆ (Seafood BBQ Grill) กุ้ง มังกร ปลาหมึก และเครื่องดื่มค็อกเทลต้อนรับสดชื่น'
  },
  {
    id: 4,
    type: 'birthday',
    title: 'ปาร์ตี้วันเกิดเด็กธีมกะลาสีเรือ',
    img: '/images/captainboy.jpg',
    eventTypeSelect: 'วันเกิดเด็ก',
    foodStyleSelect: 'อาหารกล่อง / Box Set และ Snack Box',
    concept: 'ปาร์ตี้วันเกิดเด็กสุดสดใส ธีมการผจญภัยในท้องทะเล มีฐานกิจกรรม เกม และซุ้มถ่ายภาพสุดน่ารักสำหรับเด็กๆ และครอบครัว',
    bestTime: '10:00 - 14:00 น. หรือ 15:00 - 18:00 น.',
    recommendedVenues: 'Courtyard by Marriott Phuket Town, Angsana Laguna Phuket, Twinpalms Phuket Resort',
    colors: [
      { name: 'ฟ้าทะเล', hex: '#0284c7' },
      { name: 'ขาว', hex: '#ffffff' },
      { name: 'แดงสด', hex: '#dc2626' },
      { name: 'เหลืองประภาคาร', hex: '#facc15' }
    ],
    decorations: [
      'ฉากถ่ายรูปทรงเรือกะลาสีและเข็มทิศสมอเรือ',
      'ลูกโป่งโทนฟ้า-ขาวประดับรอบห้องเหมือนคลื่นทะเล',
      'มุมระบายสี ซุ้มสายไหม และสายลูกอม',
      'เค้กปอนด์ดีไซน์สัตว์ทะเลและเรือกะลาสี'
    ],
    foodRec: 'เมนูเด็กทานง่าย เช่น มินิเบอร์เกอร์ พาสต้าซอสมะเขือเทศ นักเก็ตไก่ ตู้กดน้ำผลไม้สด และ Snack Box น่ารัก'
  },
  {
    id: 5,
    type: 'party',
    title: 'งานเลี้ยงสังสรรค์ค็อกเทลยามเย็น',
    img: '/images/cocktail.jpg',
    eventTypeSelect: 'งานเลี้ยงบริษัท',
    foodStyleSelect: 'ซิทดาวน์ ดินเนอร์ (Sit-down Dinner)',
    concept: 'งานเลี้ยงต้อนรับหรือ Gala Evening แบบเป็นทางการ หรูหรา เรียบหรู เหมาะกับงานเลี้ยงผู้บริหาร งานฉลองความสำเร็จ หรือรับรองลูกค้า VIP',
    bestTime: '18:30 - 22:30 น.',
    recommendedVenues: 'InterContinental Phuket Resort, Baan Ar-Jor (บ้านอาจ้อ), Cape Panwa Hotel',
    colors: [
      { name: 'ดำคลาสสิก', hex: '#09090b' },
      { name: 'ทองแชมเปญ', hex: '#d97706' },
      { name: 'เขียวมรกต', hex: '#047857' }
    ],
    decorations: [
      'โต๊ะทรงสูงดีไซน์กระจกเงาพร้อมเก้าอี้หลุยส์',
      'แจกันแก้วทรงสูงประดับดอกไม้สดโทนเข้ม',
      'เวทีดนตรีสดแจ๊ส / Acoustic แสงไฟ Warm Light นุ่มนวล',
      'พรมแดงและจุดถ่ายรูป Wall of Fame'
    ],
    foodRec: 'อาหารไทยหรือนานาชาติแบบ Course Set คู่วิสกี้และไวน์ชั้นดี มีบริกรรอบริการเสิร์ฟตลอดงาน'
  }
];

export default function Home() {
  const [page, setPage] = useState('showcase');
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [galleryModalTheme, setGalleryModalTheme] = useState(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [selectedPlanSummary, setSelectedPlanSummary] = useState(null);

  // Form State
  const [eventName, setEventName] = useState('วันเกิดน้องมินา');
  const [eventType, setEventType] = useState('วันเกิดผู้ใหญ่');
  const [adultCount, setAdultCount] = useState(80);
  const [kidCount, setKidCount] = useState(20);
  const [kidAgeRange, setKidAgeRange] = useState('มีเด็กหลากหลายช่วงอายุ');
  const [eventDate, setEventDate] = useState('');
  const [eventBudget, setEventBudget] = useState(50000);
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('16:00');
  const [foodStyle, setFoodStyle] = useState('บุฟเฟ่ต์ (Buffet)');
  const [hasSnack, setHasSnack] = useState(true);
  const [dietaryReq, setDietaryReq] = useState('อาหารทั่วไป พร้อมเมนูเด็ก');

  // Percentage State
  const [foodPct, setFoodPct] = useState(30);
  const [snackPct, setSnackPct] = useState(10);
  const [venuePct, setVenuePct] = useState(30);
  const [decorPct, setDecorPct] = useState(15);
  const [techPct, setTechPct] = useState(15);

  // Preview & Status State
  const [aiPreviewUrl, setAiPreviewUrl] = useState('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80');
  const [aiCaption, setAiCaption] = useState('ภาพจำลองบรรยากาศงาน');
  const [saveStatus, setSaveStatus] = useState('พร้อมบันทึกแผนงานลงบัญชีนี้');
  const [venueSearch, setVenueSearch] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [savedPlansList, setSavedPlansList] = useState([]);

  // Auth Inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [confirmSignupPass, setConfirmSignupPass] = useState('');

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setCurrentUser({
          name: session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email
        });
      } else {
        const guestSession = localStorage.getItem('eventcraft_current_session');
        if (guestSession) {
          setCurrentUser(JSON.parse(guestSession));
        }
      }
    };

    checkUserSession();

    const today = new Date().toISOString().split('T')[0];
    setEventDate(today);
  }, []);

  const resetPlannerForm = () => {
    setEventName('วันเกิดน้องมินา');
    setEventType('วันเกิดผู้ใหญ่');
    setAdultCount(80);
    setKidCount(20);
    setKidAgeRange('มีเด็กหลากหลายช่วงอายุ');
    
    const today = new Date().toISOString().split('T')[0];
    setEventDate(today);

    setEventBudget(50000);
    setStartTime('08:30');
    setEndTime('16:00');
    setFoodStyle('บุฟเฟ่ต์ (Buffet)');
    setHasSnack(true);
    setDietaryReq('อาหารทั่วไป พร้อมเมนูเด็ก');
    setFoodPct(30);
    setSnackPct(10);
    setVenuePct(30);
    setDecorPct(15);
    setTechPct(15);
    setSaveStatus('พร้อมบันทึกแผนงานลงบัญชีนี้');
  };

  const validatePassword = (pass) => {
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    return re.test(pass);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupPass !== confirmSignupPass) {
      alert("รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน! กรุณาตรวจสอบและพิมพ์ใหม่อีกครั้ง");
      return;
    }

    if (!validatePassword(signupPass)) {
      alert("รหัสผ่านไม่ตรงตามเงื่อนไข!\nกรุณาใช้รหัสผ่านที่มีความยาวอย่างน้อย 6 ตัวอักษร และประกอบด้วยตัวอักษรภาษาอังกฤษ, ตัวเลข และอักขระพิเศษ");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.trim().toLowerCase(),
      password: signupPass,
      options: {
        data: { full_name: signupName.trim() }
      }
    });

    if (error) {
      alert(`สมัครสมาชิกไม่สำเร็จ: ${error.message}`);
      return;
    }

    const sessionUser = {
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase()
    };
    setCurrentUser(sessionUser);

    alert(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${sessionUser.name}`);
    setAuthModalOpen(false);
    setSignupPass('');
    setConfirmSignupPass('');
    resetPlannerForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailLower = loginEmail.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLower,
      password: loginPass
    });

    if (error) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
      return;
    }

    const sessionUser = {
      name: data.user.user_metadata?.full_name || data.user.email,
      email: data.user.email
    };
    setCurrentUser(sessionUser);
    setAuthModalOpen(false);
    setLoginPass('');
    resetPlannerForm();
  };

  const guestLogin = () => {
    const guest = { name: 'ผู้ใช้งานทดสอบ (Guest)', email: 'guest_demo' };
    setCurrentUser(guest);
    localStorage.setItem('eventcraft_current_session', JSON.stringify(guest));
    setAuthModalOpen(false);
    resetPlannerForm();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem('eventcraft_current_session');
    setProfileModalOpen(false);
    resetPlannerForm();
  };

  const saveUserPlan = () => {
    if (!currentUser || currentUser.email === 'guest_demo') {
      alert("โหมดทดลองใช้งาน (Guest) ไม่สามารถบันทึกแผนงานได้!\nกรุณาสมัครสมาชิกหรือเข้าสู่ระบบด้วยบัญชีจริงเพื่อบันทึกข้อมูลของคุณ");
      setAuthTab('signup');
      setAuthModalOpen(true);
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    const newPlan = {
      id: Date.now(),
      savedAt: formattedDate,
      eventName: eventName || "งานจัดเลี้ยงไม่มีชื่อ",
      eventType,
      adultCount: Number(adultCount),
      kidCount: Number(kidCount),
      totalGuests: Number(adultCount) + Number(kidCount),
      kidAgeRange,
      eventDate,
      eventBudget: Number(eventBudget),
      startTime,
      endTime,
      foodStyle,
      hasSnack,
      dietaryReq,
      foodPct,
      snackPct,
      venuePct,
      decorPct,
      techPct,
      aiPreviewUrl,
      aiCaption
    };

    let userPlans = JSON.parse(localStorage.getItem(`eventcraft_history_${currentUser.email}`)) || [];
    userPlans.unshift(newPlan);
    localStorage.setItem(`eventcraft_history_${currentUser.email}`, JSON.stringify(userPlans));

    setSaveStatus("บันทึกแผนงานลงบัญชีสำเร็จแล้ว!");
    setTimeout(() => setSaveStatus("พร้อมบันทึกแผนงานลงบัญชีนี้"), 3000);
    alert(`บันทึกแผนงาน "${newPlan.eventName}" สำเร็จแล้ว!`);
  };

  const openProfileModal = () => {
    if (!currentUser) return;
    const userPlans = JSON.parse(localStorage.getItem(`eventcraft_history_${currentUser.email}`)) || [];
    setSavedPlansList(userPlans);
    setProfileModalOpen(true);
  };

  const loadPlanFromHistory = (plan) => {
    setEventName(plan.eventName);
    setEventType(plan.eventType);
    setAdultCount(plan.adultCount);
    setKidCount(plan.kidCount);
    setKidAgeRange(plan.kidAgeRange);
    setEventDate(plan.eventDate);
    setEventBudget(plan.eventBudget);
    setStartTime(plan.startTime);
    setEndTime(plan.endTime);
    setFoodStyle(plan.foodStyle);
    setHasSnack(plan.hasSnack);
    setDietaryReq(plan.dietaryReq);
    if (plan.foodPct !== undefined) setFoodPct(plan.foodPct);
    if (plan.snackPct !== undefined) setSnackPct(plan.snackPct);
    if (plan.venuePct !== undefined) setVenuePct(plan.venuePct);
    if (plan.decorPct !== undefined) setDecorPct(plan.decorPct);
    if (plan.techPct !== undefined) setTechPct(plan.techPct);
    if (plan.aiPreviewUrl) {
      setAiPreviewUrl(plan.aiPreviewUrl);
      setAiCaption(plan.aiCaption || 'ภาพจำลองบรรยากาศงาน');
    }
    setProfileModalOpen(false);
    setSelectedPlanSummary(null);
    setPage('planner');
    alert(`โหลดแผนงาน "${plan.eventName}" เรียบร้อยแล้ว!`);
  };

  const deletePlanFromHistory = (planId) => {
    if (!confirm("คุณต้องการลบแผนงานนี้ออกจากประวัติใช่หรือไม่?")) return;
    let userPlans = JSON.parse(localStorage.getItem(`eventcraft_history_${currentUser.email}`)) || [];
    userPlans = userPlans.filter(p => p.id !== planId);
    localStorage.setItem(`eventcraft_history_${currentUser.email}`, JSON.stringify(userPlans));
    setSavedPlansList(userPlans);
    if (selectedPlanSummary?.id === planId) setSelectedPlanSummary(null);
  };

  const generateAIPreview = () => {
    setAiCaption("AI กำลังเนรมิตภาพตามรายละเอียดที่คุณกรอก...");
    const startHour = parseInt(startTime.split(':')[0]) || 12;
    let lighting = "bright tropical daylight";
    if (startHour >= 16 && startHour <= 18) lighting = "golden hour sunset sky over Phuket beach";
    else if (startHour >= 19 || startHour <= 5) lighting = "night party with warm string lights and candles";

    let decor = `luxury ${eventType} party decoration`;
    if (eventType === "วันเกิดเด็ก") decor = "festive children birthday party with colorful balloon arch";
    if (eventType === "งานแต่งงาน") decor = "romantic wedding ceremony with white floral arch and crystal chandeliers";
    if (eventType === "ปาร์ตี้ริมหาด") decor = "bohemian beach party with low wooden tables and floor cushions";

    const snackText = hasSnack ? "with coffee break dessert bar" : "";
    const masterPrompt = `A high quality 8k photo of ${eventName}, ${decor}, ${foodStyle} food display, ${snackText}, ${dietaryReq}, located at a 5-star beachfront resort in Phuket Thailand, ${lighting}, realistic lighting, interior architecture photography`;

    const randomSeed = Math.floor(Math.random() * 999999);
    const aiUrl = `https://pollinations.ai/p/${encodeURIComponent(masterPrompt)}?width=800&height=450&seed=${randomSeed}&nologo=true&enhance=true`;
    setAiPreviewUrl(aiUrl);
    setAiCaption(`ภาพจำลอง ${eventName} (AI Generated)`);
  };

  const applyThemeToPlanner = (theme) => {
    setGalleryModalTheme(null);
    setPage('planner');
    setEventType(theme.eventTypeSelect);
    setEventName(`งาน${theme.title}`);
    setFoodStyle(theme.foodStyleSelect);
    if (theme.img) {
      setAiPreviewUrl(theme.img);
      setAiCaption(`ตัวอย่างบรรยากาศ ${theme.title}`);
    }
  };

  const filteredVenues = phuketVenues.filter(v =>
    v.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
    v.location.toLowerCase().includes(venueSearch.toLowerCase())
  );

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.type === galleryFilter);

  // คำนวณตัวเลขงบประมาณ
  const totalGuests = Number(adultCount) + Number(kidCount) || 1;
  const totalBudgetNum = Number(eventBudget) || 0;

  const currentSnackPct = hasSnack ? Number(snackPct) : 0;

  const allocatedFoodBudget = (totalBudgetNum * Number(foodPct)) / 100;
  const allocatedSnackBudget = (totalBudgetNum * currentSnackPct) / 100;
  const allocatedVenueBudget = (totalBudgetNum * Number(venuePct)) / 100;
  const allocatedDecorBudget = (totalBudgetNum * Number(decorPct)) / 100;
  const allocatedTechBudget = (totalBudgetNum * Number(techPct)) / 100;

  const totalAllocatedAmount = allocatedFoodBudget + allocatedSnackBudget + allocatedVenueBudget + allocatedDecorBudget + allocatedTechBudget;

  const foodBudgetPerHead = Math.round(allocatedFoodBudget / totalGuests);
  const snackBudgetPerHead = Math.round(allocatedSnackBudget / totalGuests);

  const getFoodMarketInfo = () => {
    let minHead = 350;
    let desc = 'ข้าว 2–3 อย่าง กับข้าว 3–4 อย่าง สลัด ผลไม้ และน้ำดื่ม';

    if (foodStyle === 'โต๊ะจีน') {
      minHead = 450;
      desc = 'อาหาร 8–10 อย่าง ครบทั้งของคาว ซุป และของหวาน';
    } else if (foodStyle === 'ค็อกเทล (Cocktail)') {
      minHead = 400;
      desc = 'ฟิงเกอร์ฟู้ดพอดีคำ 8–12 เมนู พร้อมบาร์เครื่องดื่ม';
    } else if (foodStyle === 'ซิทดาวน์ ดินเนอร์ (Sit-down Dinner)') {
      minHead = 800;
      desc = 'คอร์สอาหาร 3–5 คอร์ส พร้อมบริกรรอบริการเสิร์ฟ';
    } else if (foodStyle === 'อาหารกล่อง / Box Set และ Snack Box') {
      minHead = 120;
      desc = 'ชุดอาหารพร้อมทาน บรรจุกล่องสะอาด พกพาสะดวก';
    } else if (foodStyle === 'ซุ้มอาหาร') {
      minHead = 450;
      desc = 'ซุ้มอาหารสด 3–5 ซุ้ม ทำใหม่ร้อนๆ หน้างาน';
    }

    const isSufficient = foodBudgetPerHead >= minHead;

    return { minHead, desc, isSufficient };
  };

  const foodMarket = getFoodMarketInfo();

  return (
    <>
      {/* Header Nav */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('showcase')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <i className="fa-solid fa-sparkles"></i>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-400 bg-clip-text text-transparent">EventCraft</span>
              <span className="text-xs text-indigo-400 block -mt-1 tracking-wider uppercase font-semibold">Phuket Studio</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-sm">
            <button onClick={() => setPage('showcase')} className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${page === 'showcase' ? 'active-tab' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-house mr-1.5"></i> หน้าแรก & ผลงาน
            </button>
            <button onClick={() => setPage('venues')} className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${page === 'venues' ? 'active-tab' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-hotel mr-1.5"></i> 15 สถานที่ภูเก็ต
            </button>
            <button onClick={() => setPage('planner')} className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${page === 'planner' ? 'active-tab' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-wand-magic-sparkles text-indigo-400 mr-1.5"></i> สร้างแผนงานใหม่
            </button>
            <button onClick={() => setGuideModalOpen(true)} className="px-3.5 py-2 rounded-lg font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all cursor-pointer">
              <i className="fa-solid fa-circle-question mr-1.5"></i> วิธีแนะนำการใช้งาน
            </button>
          </div>

          <div>
            {currentUser ? (
              <button onClick={openProfileModal} className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 p-1.5 pr-3 rounded-full border border-slate-700/80 transition-all cursor-pointer shadow-md group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs text-slate-200 font-semibold hidden sm:inline max-w-[120px] truncate">{currentUser.name}</span>
                <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:text-white transition-colors"></i>
              </button>
            ) : (
              <button onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }} className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                <i className="fa-solid fa-user"></i> <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow no-print">
        {/* PAGE 1: SHOWCASE */}
        {page === 'showcase' && (
          <div>
            <section className="relative py-16 overflow-hidden border-b border-slate-800 text-center">
              <div className="max-w-7xl mx-auto px-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6">
                  <i className="fa-solid fa-location-dot"></i> จุดหมายปลายทางระดับโลก จังหวัดภูเก็ต
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  เนรมิตงานจัดเลี้ยงในฝัน <br/>
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">ด้วยระบบออกแบบและคำนวณอัจฉริยะ</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mb-8">
                  ประเมินจำนวนแขก งบประมาณ เวลาอาหารว่าง และเลือกสถานที่ยอดนิยม 15 แห่งในจังหวัดภูเก็ต
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setPage('planner')} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer">
                    <i className="fa-solid fa-pen-ruler mr-2"></i> สร้างแผนงานใหม่
                  </button>
                  <button onClick={() => setPage('venues')} className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer">
                    <i className="fa-solid fa-building-user mr-2"></i> ดู 15 สถานที่ในภูเก็ต
                  </button>
                  <button onClick={() => setGuideModalOpen(true)} className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 font-semibold rounded-xl border border-indigo-500/30 transition-all cursor-pointer">
                    <i className="fa-solid fa-book-open mr-2"></i> คู่มือแนะนำการใช้งาน
                  </button>
                </div>
              </div>
            </section>

            <section className="py-12 bg-slate-900/50 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-white">ขั้นตอนการใช้งาน EventCraft</h3>
                  <p className="text-xs text-slate-400 mt-1">วางแผนงานเลี้ยงและคำนวณงบประมาณได้ง่ายๆ ใน 4 ขั้นตอน</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-bold flex items-center justify-center mb-4">1</div>
                    <h4 className="font-bold text-white text-sm mb-1">ระบุรายละเอียดกิจกรรม</h4>
                    <p className="text-xs text-slate-400">กรอกชื่องาน เลือกประเภทงาน จำนวนผู้ใหญ่/เด็ก วันที่ และงบประมาณรวม</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-bold flex items-center justify-center mb-4">2</div>
                    <h4 className="font-bold text-white text-sm mb-1">เลือกรูปแบบอาหาร & อาหารว่าง</h4>
                    <p className="text-xs text-slate-400">เลือกบุฟเฟ่ต์ โต๊ะจีน หรือค็อกเทล พร้อมระบบคำนวณเวลาอาหารว่างตามช่วงเวลาจัดงาน</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center mb-4">3</div>
                    <h4 className="font-bold text-white text-sm mb-1">ประเมินงบประมาณReal-time</h4>
                    <p className="text-xs text-slate-400">ระบบคำนวณสัดส่วนงบประมาณเป็น % และประเมินราคาเฉลี่ยต่อคนตามงบจริงที่คุณตั้งไว้</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center mb-4">4</div>
                    <h4 className="font-bold text-white text-sm mb-1">เลือกสถานที่ & จำลองภาพ AI</h4>
                    <p className="text-xs text-slate-400">ค้นหา 15 โรงแรมยอดนิยมในภูเก็ต โหลดภาพบรรยากาศจำลองจาก AI และกดบันทึกแผนงาน</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <i className="fa-solid fa-images text-indigo-400"></i> ตัวอย่างผลงานการตกแต่งจัดงาน
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">แรงบันดาลใจสำหรับงานแต่งงาน งานวันเกิด และงานปาร์ตี้ส่วนตัว</p>
                </div>
                <div className="flex gap-2">
                  {['all', 'wedding', 'birthday', 'party'].map(cat => (
                    <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${galleryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                      {cat === 'all' ? 'ทั้งหมด' : cat === 'wedding' ? 'งานแต่งงาน' : cat === 'birthday' ? 'งานวันเกิด' : 'ปาร์ตี้ริมหาด'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map(item => (
                  <div key={item.id} onClick={() => setGalleryModalTheme(item)} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-indigo-500/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">คลิกเพื่อดูรายละเอียดธีมเพิ่มเติม</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: VENUES */}
        {page === 'venues' && (
          <section className="py-12 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Phuket Selected Venues</span>
                <h2 className="text-3xl font-bold text-white mt-1">15 สถานที่จัดงานยอดนิยมในภูเก็ต</h2>
                <p className="text-slate-400 text-xs mt-1">ข้อมูลโรงแรม ความจุ ที่จอดรถ ลิงก์เว็บไซต์ และแผนที่ Google Maps</p>
              </div>
              <div className="relative">
                <input type="text" value={venueSearch} onChange={(e) => setVenueSearch(e.target.value)} placeholder="ค้นหาชื่อสถานที่..." className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 w-full sm:w-64" />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-500 text-xs"></i>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map(v => (
                <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                  <div>
                    <img src={v.image} alt={v.name} className="w-full h-44 object-cover" />
                    <div className="p-5">
                      <span className="text-xs text-indigo-400 font-semibold"><i className="fa-solid fa-location-dot"></i> {v.location}</span>
                      <h3 className="font-bold text-white text-base mt-1 mb-2">{v.name}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-4">{v.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-800/50 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                        <div>ความจุ: <strong className="text-white">{v.capacity} คน</strong></div>
                        <div>ที่จอดรถ: <strong className="text-white">~{v.parking} คัน</strong></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex gap-2">
                    <a href={v.website} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg border border-indigo-500/30 font-medium transition-colors cursor-pointer">
                      <i className="fa-solid fa-globe mr-1"></i> เว็บไซต์
                    </a>
                    <a href={v.googleMap} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-lg border border-emerald-500/30 font-medium transition-colors cursor-pointer">
                      <i className="fa-solid fa-map-location-dot mr-1"></i> แผนที่ Google
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PAGE 3: PLANNER */}
        {page === 'planner' && (
          <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
            {!currentUser ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-xl mx-auto my-8 shadow-2xl">
                <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-indigo-500/20">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบเพื่อสร้างแผนงานใหม่</h3>
                <p className="text-slate-400 text-xs mb-6">กรุณาล็อกอินหรือสมัครสมาชิกเพื่อบันทึกและประเมินงบประมาณรายบุคคล</p>
                <button onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-500 transition-all text-sm cursor-pointer">
                  <i className="fa-solid fa-right-to-bracket mr-2"></i> เข้าสู่ระบบ / สมัครสมาชิก
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">สร้างแผนงานใหม่</h1>
                    <p className="text-slate-400 text-xs mt-1.5">กรอกข้อมูลพื้นฐาน แล้วระบบจะช่วยประเมินงบประมาณและเวลาอาหารว่างเบื้องต้น</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuideModalOpen(true)} className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 text-xs font-semibold rounded-2xl border border-indigo-500/30 transition-all cursor-pointer flex items-center gap-2">
                      <i className="fa-solid fa-circle-question text-indigo-400 text-sm"></i>
                      <span>คำแนะนำการใช้งาน</span>
                    </button>
                    <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                      <i className="fa-solid fa-cloud-arrow-up text-emerald-400 text-lg"></i>
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 uppercase block font-semibold">สถานะการบันทึก</span>
                        <span className="text-xs font-bold text-emerald-400">{saveStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column Inputs */}
                  <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">ข้อมูลกิจกรรม</h2>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">ชื่องาน</label>
                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">ประเภทงาน</label>
                        <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                          <option value="วันเกิดผู้ใหญ่">วันเกิดผู้ใหญ่</option>
                          <option value="งานแต่งงาน">งานแต่งงาน</option>
                          <option value="วันเกิดเด็ก">วันเกิดเด็ก</option>
                          <option value="ปาร์ตี้ริมหาด">ปาร์ตี้ริมหาด</option>
                          <option value="งานเลี้ยงบริษัท">งานเลี้ยงบริษัท</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">จำนวนผู้ใหญ่ (คน)</label>
                          <input type="number" min="0" value={adultCount} onChange={(e) => setAdultCount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">จำนวนเด็ก (คน)</label>
                          <input type="number" min="0" value={kidCount} onChange={(e) => setKidCount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>

                      <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 flex justify-between items-center text-xs">
                        <span className="text-slate-400">ผู้เข้าร่วมทั้งหมด</span>
                        <span className="font-bold text-indigo-300 text-sm">{totalGuests} คน</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">วันที่จัดงาน</label>
                          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">งบประมาณรวม (บาท)</label>
                          <input type="number" step="5000" value={eventBudget} onChange={(e) => setEventBudget(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">เวลาเริ่มงาน</label>
                          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">เวลาสิ้นสุด</label>
                          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      <h2 className="text-lg font-bold text-white">รูปแบบอาหารหลัก</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['บุฟเฟ่ต์ (Buffet)', 'โต๊ะจีน', 'ค็อกเทล (Cocktail)', 'ซิทดาวน์ ดินเนอร์ (Sit-down Dinner)', 'อาหารกล่อง / Box Set และ Snack Box', 'ซุ้มอาหาร'].map(style => (
                          <label key={style} className="food-radio-card cursor-pointer" onClick={() => setFoodStyle(style)}>
                            <input type="radio" name="foodStyleRadio" checked={foodStyle === style} readOnly className="hidden" />
                            <div className={`p-3 border rounded-xl text-xs flex items-center gap-2 transition-all ${foodStyle === style ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-700 text-slate-300 hover:border-indigo-500'}`}>
                              <div className={`radio-circle w-4 h-4 rounded-full border flex items-center justify-center ${foodStyle === style ? 'border-indigo-400 bg-indigo-600' : 'border-slate-500'}`}></div>
                              <span>{style}</span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3.5 space-y-1">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 cursor-pointer">
                          <input type="checkbox" checked={hasSnack} onChange={(e) => setHasSnack(e.target.checked)} className="accent-indigo-500 rounded cursor-pointer" />
                          <span>ต้องการอาหารว่าง (Coffee Break / Snack)</span>
                        </label>
                        <p className="text-[11px] text-slate-400 pl-5">ระบบจัดสรรงบอาหารว่างตามตัวเลขเงินที่คุณระบุ (ปรับแก้ได้ทางด้านขวา)</p>
                      </div>

                      {hasSnack && (
                        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 text-xs space-y-2 text-slate-300">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 text-sm">
                              <i className="fa-solid fa-mug-hot"></i> ตารางอาหารว่างที่แนะนำ
                            </h4>
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full font-semibold">
                              จัดสรร {Math.round((allocatedSnackBudget / (totalBudgetNum || 1)) * 100)}% จากงบรวม
                            </span>
                          </div>
                          <p className="text-slate-200 font-medium">รอบที่ 1: 10:30 (ช่วงเช้า)</p>
                          <p className="text-slate-200 font-medium">รอบที่ 2: 14:30 (ช่วงบ่าย)</p>
                          <p className="text-slate-400 text-[11px] pt-1">
                            ระบบแนะนำ 2 รอบจากช่วงเวลา {startTime}–{endTime} น. (ปรับเปลี่ยนได้ตามจริง)
                          </p>
                          <p className="pt-1"><strong className="text-white">เมนูที่แนะนำ:</strong> กาแฟ/ชา น้ำผลไม้ เบเกอรีหรือแซนดวิชชิ้นเล็ก และผลไม้สด</p>
                          
                          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl mt-2 space-y-1">
                            <p className="font-semibold text-white">
                              งบอาหารว่างที่จัดสรรไว้: <span className="text-indigo-300 text-sm font-bold">฿{Math.round(allocatedSnackBudget).toLocaleString()} บาท</span>
                            </p>
                            <p className="text-slate-400 text-[11px]">
                              เฉลี่ยประมาณ <strong className="text-indigo-200">฿{snackBudgetPerHead.toLocaleString()} บาท/คน</strong> (รวม 2 รอบ สำหรับผู้เข้าร่วม {totalGuests} คน)
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-4 text-xs space-y-2.5 text-slate-300">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                            <i className="fa-solid fa-utensils text-indigo-400"></i> เมนูและราคาประเมินจากงบที่คุณตั้งไว้
                          </h4>
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full font-semibold">
                            จัดสรร {Math.round((allocatedFoodBudget / (totalBudgetNum || 1)) * 100)}% จากงบรวม
                          </span>
                        </div>
                        
                        <p className="text-slate-200">
                          <strong className="text-indigo-300">{foodStyle}</strong> — {foodMarket.desc}
                        </p>

                        <div className={`p-3 rounded-xl border space-y-1.5 ${foodMarket.isSufficient ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-amber-950/40 border-amber-500/30'}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-[11px]">งบอาหารหลักที่จัดสรรไว้:</span>
                            <span className="text-sm font-bold text-white">฿{Math.round(allocatedFoodBudget).toLocaleString()} บาท</span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-1 border-t border-slate-700/50">
                            <span className="text-slate-300 text-[11px]">เฉลี่ยต่อคน ({totalGuests} คน):</span>
                            <span className={`text-sm font-bold ${foodMarket.isSufficient ? 'text-emerald-400' : 'text-amber-400'}`}>
                              ฿{foodBudgetPerHead.toLocaleString()} บาท / คน
                            </span>
                          </div>

                          <div className="pt-1.5">
                            {foodMarket.isSufficient ? (
                              <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-semibold">
                                <i className="fa-solid fa-circle-check"></i> งบประมาณเฉลี่ยเพียงพอสำหรับเมนู {foodStyle} (ขั้นต่ำตลาด ฿{foodMarket.minHead}/คน)
                              </p>
                            ) : (
                              <p className="text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
                                <i className="fa-solid fa-triangle-exclamation"></i> งบเฉลี่ยต่อคน (฿{foodBudgetPerHead}/คน) ต่ำกว่าขั้นต่ำตลาด (฿{foodMarket.minHead}/คน) แนะนำปรับเพิ่มงบรวมหรือเลือกอาหารกล่อง/ซุ้มอาหาร
                              </p>
                            )}
                          </div>
                        </div>

                        {kidCount > 0 && (
                          <p className="text-[11px] text-slate-400"><strong className="text-slate-300">เมนูเด็ก:</strong> แนะนำข้าว/พาสต้า รสไม่จัด ผลไม้หั่นพอดีคำ และน้ำเปล่า โดยสอบถามส่วนผสมและการแพ้อาหารกับผู้ให้บริการ</p>
                        )}
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <label className="block text-xs font-semibold text-slate-300">ความต้องการด้านอาหาร</label>
                        <select value={dietaryReq} onChange={(e) => setDietaryReq(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                          <option value="อาหารทั่วไป พร้อมเมนูเด็ก">อาหารทั่วไป พร้อมเมนูเด็ก</option>
                          <option value="มังสวิรัติ (Vegetarian)">มังสวิรัติ (Vegetarian)</option>
                          <option value="อาหารฮาลาล (Halal)">อาหารฮาลาล (Halal)</option>
                          <option value="อาหารเจ (Vegan)">อาหารเจ (Vegan)</option>
                          <option value="ไม่มีอาหารทะเล (No Seafood)">ไม่มีอาหารทะเล (No Seafood)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        <button type="button" onClick={saveUserPlan} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg text-xs flex items-center justify-center gap-2 cursor-pointer">
                          <i className="fa-solid fa-floppy-disk"></i> <span>บันทึกแผนงานลงบัญชี</span>
                        </button>
                        <button type="button" onClick={generateAIPreview} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg text-xs flex items-center justify-center gap-2 cursor-pointer">
                          <span>โหลดภาพบรรยากาศ AI</span> <span>🪄</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Summary */}
                  <div className="lg:col-span-5 space-y-6 sticky top-24">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <span className="text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">PLAN SUMMARY</span>
                      <h3 className="text-xl font-bold text-white mb-4">แผนงานใหม่ของคุณ</h3>

                      <div className="divide-y divide-slate-800 text-xs">
                        <div className="py-2.5 flex justify-between"><span className="text-slate-400">ประเภทงาน</span><span className="font-semibold text-white">{eventType}</span></div>
                        <div className="py-2.5 flex justify-between"><span className="text-slate-400">ผู้เข้าร่วม</span><span className="font-semibold text-white">{totalGuests} คน</span></div>
                        <div className="py-2.5 flex justify-between"><span className="text-slate-400">อาหารหลัก</span><span className="font-semibold text-indigo-300">{foodStyle}</span></div>
                        <div className="py-2.5 flex justify-between"><span className="text-slate-400">งบประมาณรวม</span><span className="font-bold text-indigo-400 text-sm">฿{Number(eventBudget).toLocaleString()}</span></div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                            <i className="fa-solid fa-coins text-indigo-400"></i> ปรับระบุจำนวนเงิน (บาท)
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${Math.round(totalAllocatedAmount) === totalBudgetNum ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`}>
                            รวม ฿{Math.round(totalAllocatedAmount).toLocaleString()} / ฿{totalBudgetNum.toLocaleString()}
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/80">
                            <div className="flex justify-between items-center text-slate-300 text-[11px] mb-1.5">
                              <span className="font-medium text-white">ค่าอาหาร & เครื่องดื่ม</span>
                              <span className="text-[11px] text-slate-400">({Math.round((allocatedFoodBudget / (totalBudgetNum || 1)) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold text-xs">฿</span>
                              <input
                                type="number"
                                step="500"
                                value={Math.round(allocatedFoodBudget)}
                                onChange={(e) => setFoodPct(totalBudgetNum > 0 ? (Number(e.target.value) / totalBudgetNum) * 100 : 0)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-indigo-300 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${Math.min((allocatedFoodBudget / (totalBudgetNum || 1)) * 100, 100)}%` }}></div>
                            </div>
                          </div>

                          {hasSnack && (
                            <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/80">
                              <div className="flex justify-between items-center text-slate-300 text-[11px] mb-1.5">
                                <span className="font-medium text-white">ค่าอาหารว่าง / Break</span>
                                <span className="text-[11px] text-slate-400">({Math.round((allocatedSnackBudget / (totalBudgetNum || 1)) * 100)}%)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 font-semibold text-xs">฿</span>
                                <input
                                  type="number"
                                  step="500"
                                  value={Math.round(allocatedSnackBudget)}
                                  onChange={(e) => setSnackPct(totalBudgetNum > 0 ? (Number(e.target.value) / totalBudgetNum) * 100 : 0)}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-300 focus:outline-none focus:border-indigo-500"
                                />
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                                <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${Math.min((allocatedSnackBudget / (totalBudgetNum || 1)) * 100, 100)}%` }}></div>
                              </div>
                            </div>
                          )}

                          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/80">
                            <div className="flex justify-between items-center text-slate-300 text-[11px] mb-1.5">
                              <span className="font-medium text-white">ค่าสถานที่ & อุปกรณ์</span>
                              <span className="text-[11px] text-slate-400">({Math.round((allocatedVenueBudget / (totalBudgetNum || 1)) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold text-xs">฿</span>
                              <input
                                type="number"
                                step="500"
                                value={Math.round(allocatedVenueBudget)}
                                onChange={(e) => setVenuePct(totalBudgetNum > 0 ? (Number(e.target.value) / totalBudgetNum) * 100 : 0)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-purple-300 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${Math.min((allocatedVenueBudget / (totalBudgetNum || 1)) * 100, 100)}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/80">
                            <div className="flex justify-between items-center text-slate-300 text-[11px] mb-1.5">
                              <span className="font-medium text-white">ค่าตกแต่ง & ดอกไม้</span>
                              <span className="text-[11px] text-slate-400">({Math.round((allocatedDecorBudget / (totalBudgetNum || 1)) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold text-xs">฿</span>
                              <input
                                type="number"
                                step="500"
                                value={Math.round(allocatedDecorBudget)}
                                onChange={(e) => setDecorPct(totalBudgetNum > 0 ? (Number(e.target.value) / totalBudgetNum) * 100 : 0)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-pink-300 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className="bg-pink-500 h-full rounded-full transition-all" style={{ width: `${Math.min((allocatedDecorBudget / (totalBudgetNum || 1)) * 100, 100)}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800/80">
                            <div className="flex justify-between items-center text-slate-300 text-[11px] mb-1.5">
                              <span className="font-medium text-white">ช่างภาพ & เครื่องเสียง</span>
                              <span className="text-[11px] text-slate-400">({Math.round((allocatedTechBudget / (totalBudgetNum || 1)) * 100)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold text-xs">฿</span>
                              <input
                                type="number"
                                step="500"
                                value={Math.round(allocatedTechBudget)}
                                onChange={(e) => setTechPct(totalBudgetNum > 0 ? (Number(e.target.value) / totalBudgetNum) * 100 : 0)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-emerald-300 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${Math.min((allocatedTechBudget / (totalBudgetNum || 1)) * 100, 100)}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 border border-slate-800 rounded-xl overflow-hidden aspect-video relative bg-slate-950 flex items-center justify-center">
                        <img src={aiPreviewUrl} alt="HD Preview" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-2.5">
                          <p className="text-[11px] font-semibold text-white">{aiCaption}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* MODAL 1: Gallery Theme Detail Modal */}
      {galleryModalTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 no-print" onClick={() => setGalleryModalTheme(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl relative shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setGalleryModalTheme(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-800">
              <img src={galleryModalTheme.img} alt={galleryModalTheme.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                  {galleryModalTheme.eventTypeSelect}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
                  {galleryModalTheme.foodStyleSelect}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{galleryModalTheme.title}</h3>
              {galleryModalTheme.bestTime && (
                <p className="text-xs text-indigo-400 font-medium mt-1">
                  <i className="fa-solid fa-clock mr-1"></i> ช่วงเวลาแนะนำ: {galleryModalTheme.bestTime}
                </p>
              )}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {galleryModalTheme.concept}
              </p>
            </div>

            {galleryModalTheme.colors && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <i className="fa-solid fa-palette mr-1.5"></i> โทนสีหลัก (Color Palette)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {galleryModalTheme.colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/70 text-xs text-slate-200">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: c.hex }}></span>
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {galleryModalTheme.decorations && (
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider">
                  <i className="fa-solid fa-sparkles mr-1.5"></i> องค์ประกอบการตกแต่งหลัก
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {galleryModalTheme.decorations.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-dot text-[8px] text-indigo-400 mt-1"></i>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {galleryModalTheme.foodRec && (
              <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider">
                  <i className="fa-solid fa-utensils mr-1.5"></i> ข้อเสนอแนะเมนูอาหาร
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{galleryModalTheme.foodRec}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => applyThemeToPlanner(galleryModalTheme)}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>✨ นำธีมนี้ไปสร้างงาน & ปรับแต่งของคุณ</span>
              </button>
              <button
                onClick={() => setGalleryModalTheme(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Guide Modal */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl relative shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setGuideModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"><i className="fa-solid fa-xmark text-lg"></i></button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-lg font-bold border border-indigo-500/30">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">คู่มือการใช้งาน EventCraft Phuket</h3>
                <p className="text-xs text-slate-400">วิธีวางแผนงานเลี้ยง คำนวณงบประมาณ และเลือกสถานที่</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-600 text-white rounded-full inline-flex items-center justify-center text-[11px]">1</span>
                  เข้าสู่ระบบ หรือ สมัครสมาชิก
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  คลิกที่ปุ่ม <strong>"เข้าสู่ระบบ / สมัครสมาชิก"</strong> ที่มุมขวาบนเพื่อลงทะเบียนบัญชีส่วนตัวผ่าน Supabase หรือกดทดลองใช้งานในฐานะแขก (Demo)
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-600 text-white rounded-full inline-flex items-center justify-center text-[11px]">2</span>
                  กรอกรายละเอียดกิจกรรม & งบประมาณ
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  ไปที่หน้า <strong>"สร้างแผนงานใหม่"</strong> แล้วระบุชื่องาน ประเภทงาน จำนวนผู้เข้าร่วม (ผู้ใหญ่/เด็ก) วันจัดงาน และตั้งงบประมาณรวมที่คุณต้องการ
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-600 text-white rounded-full inline-flex items-center justify-center text-[11px]">3</span>
                  เลือกอาหารหลัก & อาหารว่าง (Coffee Break)
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  เลือกรูปแบบอาหาร (บุฟเฟ่ต์, โต๊ะจีน, ค็อกเทล ฯลฯ) หากติ๊กเลือกอาหารว่าง ระบบจะจัดสรรงบประมาณให้อัตโนมัติและสามารถปรับพิมพ์งบเงินบาทได้เองทางด้านขวา
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-600 text-white rounded-full inline-flex items-center justify-center text-[11px]">4</span>
                  จำลองภาพด้วย AI & เลือกสถานที่จัดงาน
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  กดปุ่ม <strong>"โหลดภาพบรรยากาศ AI"</strong> เพื่อสร้างรูปจำลองบรรยากาศงานตามข้อมูลที่คุณกรอก และเข้าไปดูสถานที่ยอดนิยม 15 แห่งในภูเก็ตผ่านเมนู <strong>"15 สถานที่ภูเก็ต"</strong>
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button onClick={() => setGuideModalOpen(false)} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer">
                รับทราบ และ เริ่มใช้งาน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Profile & Saved Plans List Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-xl relative shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            <button onClick={() => setProfileModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"><i className="fa-solid fa-xmark text-lg"></i></button>
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{currentUser?.name}</h3>
                <p className="text-xs text-slate-400">{currentUser?.email}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-3"><i className="fa-solid fa-clock-rotate-left mr-1"></i> ประวัติแผนงานที่บันทึกไว้</h4>
              <div className="space-y-3 pr-1">
                {currentUser?.email === 'guest_demo' ? (
                  <div className="text-center py-6 space-y-2">
                    <p className="text-xs text-amber-400 font-semibold">โหมดทดลองใช้งาน (Guest) ไม่สามารถบันทึกประวัติแผนงานได้</p>
                    <p className="text-[11px] text-slate-400">กรุณาสมัครสมาชิกหรือเข้าสู่ระบบบัญชีจริงเพื่อใช้งานประวัติการบันทึก</p>
                  </div>
                ) : savedPlansList.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">ยังไม่มีแผนงานที่บันทึกไว้</p>
                ) : (
                  savedPlansList.map(plan => (
                    <div key={plan.id} className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h5 className="font-bold text-white text-xs">{plan.eventName}</h5>
                        <p className="text-[11px] text-slate-400">บันทึกเมื่อ: {plan.savedAt}</p>
                        <p className="text-indigo-300 text-xs mt-0.5">แขก {plan.totalGuests} คน | ฿{Number(plan.eventBudget).toLocaleString()} บาท</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 w-full sm:w-auto justify-end">
                        <button onClick={() => setSelectedPlanSummary(plan)} className="px-2.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium transition cursor-pointer">
                          <i className="fa-solid fa-file-lines mr-1"></i> ดูสรุปฉบับเต็ม
                        </button>
                        <button onClick={() => loadPlanFromHistory(plan)} className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition">
                          ดึงข้อมูล
                        </button>
                        <button onClick={() => deletePlanFromHistory(plan.id)} className="px-2 py-1.5 bg-slate-700 hover:bg-red-600 text-slate-300 rounded-xl text-xs cursor-pointer transition">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-800 pt-3">
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer">ออกจากระบบ</button>
              <button onClick={() => setProfileModalOpen(false)} className="px-5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs cursor-pointer">ปิด</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Full Event Brief / Plan Summary Modal (ปรับปรุงให้พิมพ์ 1 หน้า A4 คมชัด) */}
      {selectedPlanSummary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 print-modal-overlay" onClick={() => setSelectedPlanSummary(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl relative shadow-2xl space-y-5 text-slate-100 max-h-[92vh] overflow-y-auto print-card-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedPlanSummary(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer no-print">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Header สรุปงาน */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                EVENT BRIEF SUMMARY
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{selectedPlanSummary.eventName}</h2>
              <p className="text-xs text-slate-400 mt-1">
                บันทึกเมื่อ: {selectedPlanSummary.savedAt} • ประเภทงาน: <strong className="text-indigo-300">{selectedPlanSummary.eventType}</strong>
              </p>
            </div>

            {/* รูปภาพบรรยากาศ AI */}
            {selectedPlanSummary.aiPreviewUrl && (
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img src={selectedPlanSummary.aiPreviewUrl} alt="AI Preview Summary" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/75 px-3 py-1 rounded-lg text-[11px] text-slate-200 backdrop-blur-sm no-print">
                  {selectedPlanSummary.aiCaption || "ภาพจำลองบรรยากาศงาน"}
                </div>
              </div>
            )}

            {/* ข้อมูลทั่วไปของงาน */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-800 print-box">
                <span className="text-slate-400 block text-[10px]">ผู้ใหญ่</span>
                <span className="font-bold text-white text-sm">{selectedPlanSummary.adultCount} คน</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-800 print-box">
                <span className="text-slate-400 block text-[10px]">เด็ก</span>
                <span className="font-bold text-white text-sm">{selectedPlanSummary.kidCount} คน</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-800 print-box">
                <span className="text-slate-400 block text-[10px]">ผู้ร่วมงานรวม</span>
                <span className="font-bold text-indigo-300 text-sm">{selectedPlanSummary.totalGuests} คน</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-800 print-box">
                <span className="text-slate-400 block text-[10px]">วันที่จัดงาน</span>
                <span className="font-bold text-white text-xs">{selectedPlanSummary.eventDate || 'ไม่ระบุ'}</span>
              </div>
            </div>

            {/* ตารางจัดสรรงบประมาณ */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs print-box">
              <div className="flex justify-between items-center border-b border-slate-700/80 pb-2">
                <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <i className="fa-solid fa-coins text-amber-400 no-print"></i> ตารางสรุปงบประมาณจัดสรร
                </h4>
                <span className="font-bold text-indigo-400 text-base">
                  ฿{Number(selectedPlanSummary.eventBudget).toLocaleString()} บาท
                </span>
              </div>

              {(() => {
                const bTotal = Number(selectedPlanSummary.eventBudget) || 0;
                const foodAmt = Math.round((bTotal * (selectedPlanSummary.foodPct || 30)) / 100);
                const snackAmt = selectedPlanSummary.hasSnack ? Math.round((bTotal * (selectedPlanSummary.snackPct || 10)) / 100) : 0;
                const venueAmt = Math.round((bTotal * (selectedPlanSummary.venuePct || 30)) / 100);
                const decorAmt = Math.round((bTotal * (selectedPlanSummary.decorPct || 15)) / 100);
                const techAmt = Math.round((bTotal * (selectedPlanSummary.techPct || 15)) / 100);
                const guests = selectedPlanSummary.totalGuests || 1;

                return (
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between items-center">
                      <span>• อาหารหลัก ({selectedPlanSummary.foodPct}%):</span>
                      <div className="text-right">
                        <span className="font-bold text-white">฿{foodAmt.toLocaleString()} บาท</span>
                        <span className="text-[10px] text-slate-400 block">(~฿{Math.round(foodAmt/guests).toLocaleString()} / คน)</span>
                      </div>
                    </div>
                    {selectedPlanSummary.hasSnack && (
                      <div className="flex justify-between items-center">
                        <span>• อาหารว่าง / Coffee Break ({selectedPlanSummary.snackPct}%):</span>
                        <div className="text-right">
                          <span className="font-bold text-amber-300">฿{snackAmt.toLocaleString()} บาท</span>
                          <span className="text-[10px] text-slate-400 block">(~฿{Math.round(snackAmt/guests).toLocaleString()} / คน)</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span>• สถานที่ & อุปกรณ์ ({selectedPlanSummary.venuePct}%):</span>
                      <span className="font-bold text-purple-300">฿{venueAmt.toLocaleString()} บาท</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>• การตกแต่ง & ดอกไม้ ({selectedPlanSummary.decorPct}%):</span>
                      <span className="font-bold text-pink-300">฿{decorAmt.toLocaleString()} บาท</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>• ช่างภาพ & ระบบแสงเสียง ({selectedPlanSummary.techPct}%):</span>
                      <span className="font-bold text-emerald-300">฿{techAmt.toLocaleString()} บาท</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* รายละเอียดอาหารและเงื่อนไข */}
            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 text-xs space-y-2 text-slate-300 print-box">
              <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                <i className="fa-solid fa-utensils no-print"></i> รายละเอียดอาหาร & การบริการ
              </h4>
              <p><strong className="text-white">รูปแบบอาหาร:</strong> {selectedPlanSummary.foodStyle}</p>
              <p><strong className="text-white">ข้อกำหนดอาหาร:</strong> {selectedPlanSummary.dietaryReq}</p>
              <p><strong className="text-white">เวลาจัดงาน:</strong> {selectedPlanSummary.startTime} - {selectedPlanSummary.endTime} น.</p>
              {selectedPlanSummary.hasSnack && (
                <p className="text-slate-400 text-[11px] pt-1">
                  * รวมบริการเบรกอาหารว่าง 2 รอบ (รอบเช้า 10:30 น. และ รอบบ่าย 14:30 น.)
                </p>
              )}
            </div>

            {/* ปุ่มการทำงาน (ซ่อนเมื่อพิมพ์) */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-800 no-print">
              <button
                onClick={() => window.print()}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <i className="fa-solid fa-print"></i> <span>พิมพ์ / พิมพ์เป็น PDF</span>
              </button>
              <button
                onClick={() => loadPlanFromHistory(selectedPlanSummary)}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i> <span>ดึงข้อมูลแผนงานนี้เข้า Planner</span>
              </button>
              <button
                onClick={() => setSelectedPlanSummary(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"><i className="fa-solid fa-xmark text-lg"></i></button>

            <div className="flex bg-slate-800 p-1 rounded-xl mb-6">
              <button onClick={() => setAuthTab('login')} className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${authTab === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>เข้าสู่ระบบ</button>
              <button onClick={() => setAuthTab('signup')} className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${authTab === 'signup' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>สมัครสมาชิก</button>
            </div>

            {authTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" required placeholder="อีเมล" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                <input type="password" required placeholder="รหัสผ่าน" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer">เข้าสู่ระบบ</button>
                <div className="text-center"><button type="button" onClick={guestLogin} className="text-xs text-indigo-400 hover:underline cursor-pointer">ทดลองใช้งานในฐานะแขก (Demo)</button></div>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <input type="text" required placeholder="ชื่อ - นามสกุล" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                <input type="email" required placeholder="อีเมล" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                <input type="password" required placeholder="ตั้งรหัสผ่าน" value={signupPass} onChange={(e) => setSignupPass(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                <input type="password" required placeholder="ยืนยันรหัสผ่านอีกครั้ง" value={confirmSignupPass} onChange={(e) => setConfirmSignupPass(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white" />
                
                <p className="text-[10px] text-indigo-300">รหัสผ่านต้องมีตัวอักษร, ตัวเลข และอักขระพิเศษอย่างน้อย 6 ตัวอักษร</p>
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer">สมัครสมาชิก</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500 no-print">
        © EventCraft Phuket Studio. All rights reserved.
      </footer>
    </>
  );
}