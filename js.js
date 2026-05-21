
// ══════════════════════════
//  TOPBAR + ROUTING
// ══════════════════════════
function go(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) el.classList.add('active');
  // Update topbar active state
  document.querySelectorAll('.topbar-nav-item[data-screen]').forEach(item => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });
  closeSnippetPopover();
}

function toggleStatus() {
  const pill = document.getElementById('statusPill');
  const dot  = document.getElementById('statusDot');
  const lbl  = document.getElementById('statusLabel');
  const online = pill.classList.toggle('online');
  pill.classList.toggle('offline', !online);
  dot.style.background = online ? 'var(--green)' : '#d1d5db';
  lbl.textContent = online ? 'Online' : 'Offline';
  showToast(online ? '🟢 You are now online' : '⚫ You are now offline — messages will queue');
}

function toggleSnippetPopover() {
  const pop = document.getElementById('snippetPopover');
  const bk  = document.getElementById('popoverBackdrop');
  const show = !pop.classList.contains('show');
  pop.classList.toggle('show', show);
  bk.classList.toggle('show', show);
}
function closeSnippetPopover() {
  document.getElementById('snippetPopover')?.classList.remove('show');
  document.getElementById('popoverBackdrop')?.classList.remove('show');
}

// Dummy legacy compat
function injectSidebars() {}

// ══════════════════════════
//  ROUTING
// ══════════════════════════
function go(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) el.classList.add('active');
}

// ══════════════════════════
//  INBOX
// ══════════════════════════
const convData = {
  alex:   { name: 'Alex K.',   email: 'alex@gmail.com',    status: 'live',    page: '/pricing' },
  jordan: { name: 'Jordan M.', email: 'jordan@outlook.com',status: 'offline', page: '/contact' },
  casey:  { name: 'Casey R.',  email: 'casey@outlook.com', status: 'offline', page: '/services' },
  sam:    { name: 'Sam T.',    email: '',                  status: 'closed',  page: '/about' },
  morgan: { name: 'Morgan L.', email: '',                  status: 'closed',  page: '/home' },
};

function selectConv(el, name, email, status, page, key) {
  document.querySelectorAll('.conv-item').forEach(i => i.classList.remove('selected','unread'));
  el.classList.add('selected');

  document.getElementById('th-name').textContent = name;
  document.getElementById('th-avatar').textContent = name[0];
  document.getElementById('th-page').textContent = page;
  document.getElementById('replyInput').placeholder = `Reply to ${name}…`;

  // Status
  const statusEl = document.getElementById('th-status');
  if (status === 'live') { statusEl.textContent = '● Live conversation'; statusEl.style.color = 'var(--green)'; }
  else if (status === 'offline') { statusEl.textContent = '⚑ Offline message'; statusEl.style.color = 'var(--amber)'; }
  else { statusEl.textContent = '✓ Resolved'; statusEl.style.color = 'var(--ink4)'; }

  // Contact pill
  const pill = document.getElementById('th-contact-pill');
  const emailEl = document.getElementById('th-contact-email');
  if (email) {
    pill.style.display = 'inline-flex';
    emailEl.textContent = email;
  } else {
    pill.style.display = 'none';
  }

  // Reset email detect bar + msg
  document.getElementById('emailDetectBar').classList.remove('show');
  document.getElementById('emailMsg').style.display = 'none';

  // Resolve btn
  const rb = document.getElementById('resolveBtn');
  rb.textContent = 'Resolve'; rb.style.background = 'var(--ink)'; rb.style.borderColor = 'var(--ink)';
}

function switchTab(el) {
  document.querySelectorAll('.inbox-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function sendReply() {
  const input = document.getElementById('replyInput');
  const text = input.value.trim();
  if (!text) return;
  const msgs = document.getElementById('threadMsgs');
  const time = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  const msg = document.createElement('div');
  msg.className = 'tmsg agent';
  msg.style.animation = 'fadeUp .2s ease both';
  msg.innerHTML = `<div class="tmsg-row"><div class="tmsg-av">H</div><div class="tmsg-bubble">${text.replace(/\n/g,'<br>')}</div></div><div class="tmsg-time">${time}</div>`;
  msgs.appendChild(msg);
  msgs.scrollTop = msgs.scrollHeight;
  input.value = '';
  showToast('Reply sent');
}

function handleReplyKey(e) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendReply(); }
}

function insertCanned() {
  document.getElementById('replyInput').value = "Thanks for reaching out! I'd love to learn more about your project. Are you available for a quick 20-minute call this week?";
  showToast('Canned reply inserted');
}

function resolveConv() {
  const rb = document.getElementById('resolveBtn');
  rb.textContent = 'Resolved ✓'; rb.style.background = 'var(--green)'; rb.style.borderColor = 'var(--green)';
  showToast('Conversation resolved ✓');
}

// Simulate visitor sending their email in chat
function simulateEmailMsg() {
  // Show the email message bubble
  document.getElementById('emailMsg').style.display = 'flex';
  document.getElementById('threadMsgs').scrollTop = 9999;
  // Show detection bar
  setTimeout(() => {
    document.getElementById('emailDetectBar').classList.add('show');
  }, 400);
}

function saveContact() {
  document.getElementById('emailDetectBar').classList.remove('show');
  // Update the contact pill
  const pill = document.getElementById('th-contact-pill');
  pill.style.display = 'inline-flex';
  document.getElementById('th-contact-email').textContent = 'alex@gmail.com';
  showToast('Contact saved — alex@gmail.com ✓');
}

// ══════════════════════════
//  WIDGET PREVIEW
// ══════════════════════════
let widgetStateOnline = true;

function toggleWidgetState() {
  // This screen shows both states side by side — button just shows toast
  showToast('Both states are visible side by side ↑');
}

// Live widget mini-chat
function lwSend(btn, text) {
  btn.parentElement.remove();
  const msgs = document.getElementById('lw-msgs');
  // User bubble
  const ub = document.createElement('div');
  ub.className = 'lw-bubble-user'; ub.textContent = text;
  ub.style.animation = 'fadeUp .2s ease both';
  msgs.appendChild(ub);
  msgs.scrollTop = msgs.scrollHeight;
  // Agent reply
  setTimeout(() => {
    const ab = document.createElement('div');
    ab.className = 'lw-bubble-agent';
    ab.style.animation = 'fadeUp .2s ease both';
    const replies = {
      'Pricing': 'Our projects start from $8,000. Want to book a free 20-min call?',
      'Book a call': 'Great! You can book at acmestudio.ca/book, or leave your email and we\'ll reach out.',
      'Services': 'We specialise in full-home and focused-room renovations. Kitchen, living, bedroom — we do it all.'
    };
    ab.textContent = replies[text] || 'Thanks for reaching out! How can I help?';
    msgs.appendChild(ab);
    msgs.scrollTop = msgs.scrollHeight;
  }, 800);
}

function lwSendInput() {
  const input = document.getElementById('lwInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const msgs = document.getElementById('lw-msgs');
  const ub = document.createElement('div');
  ub.className = 'lw-bubble-user'; ub.textContent = text;
  ub.style.animation = 'fadeUp .2s ease both';
  msgs.appendChild(ub);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const ab = document.createElement('div');
    ab.className = 'lw-bubble-agent';
    ab.style.animation = 'fadeUp .2s ease both';
    // Email detection in widget
    if (/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i.test(text)) {
      ab.textContent = 'Got it — I\'ve saved your email. I\'ll send you the booking link shortly!';
      showToast('Email detected in widget — contact would be saved ✓');
    } else {
      ab.textContent = 'Thanks! Let me check that for you. One moment…';
    }
    msgs.appendChild(ab); msgs.scrollTop = msgs.scrollHeight;
  }, 900);
}

function openLiveWidget() {
  document.getElementById('liveWidget').style.display = 'flex';
  document.getElementById('lwLauncher').style.display = 'none';
}

function submitOfflineForm() {
  const email = document.getElementById('owEmail').value;
  const msg = document.getElementById('owMsg').value;
  if (!email) { showToast('Email is required'); return; }
  // Replace widget with success state
  const widget = document.getElementById('offlineWidgetEl');
  widget.innerHTML = `
    <div style="padding:32px 20px;text-align:center">
      <div style="font-size:32px;margin-bottom:12px">✓</div>
      <div style="font-size:14px;font-weight:600;margin-bottom:6px">Message sent!</div>
      <div style="font-size:12px;color:#888;line-height:1.5">We'll reply to <strong>${email}</strong> within 1 business day.</div>
    </div>
    <div class="ow-badge">Chat by <strong>Chattt</strong></div>
  `;
  showToast('Offline form submitted — contact saved ✓');
  // Add to contacts list (visual feedback)
  setTimeout(() => showToast('New contact added to inbox →'), 2400);
}

// ══════════════════════════
//  SETTINGS
// ══════════════════════════
function switchSettings(el, section) {
  document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
  if (el && el.classList) el.classList.add('active');
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  document.getElementById('settings-' + section).classList.add('active');
}

function updatePreview() {
  const name = document.getElementById('wpNameInput').value || 'Your brand';
  const color = document.getElementById('wpColorInput').value;
  document.getElementById('wpName').textContent = name;
  document.getElementById('wpAvatar').textContent = name[0].toUpperCase();
  document.getElementById('wpAvatar').style.background = color;
  document.getElementById('wpSendBtn').style.background = color;
  document.getElementById('wpColorText').value = color;
}
function syncColor() {
  const val = document.getElementById('wpColorText').value;
  if (/^#[0-9A-F]{6}$/i.test(val)) { document.getElementById('wpColorInput').value = val; updatePreview(); }
}

// ══════════════════════════
//  UTILS
// ══════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function copySnippet() {
  const btn = document.getElementById('copyBtn');
  btn.textContent = 'Copied!'; btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'Copy snippet'; btn.classList.remove('copied'); }, 2000);
  showToast('Snippet copied ✓');
}

// ══════════════════════════
//  WIDGET BUILDER v2
// ══════════════════════════
const wbCfg = {
  name:'Acme Studio', welcome:"Hi 👋 How can we help you today?",
  initial:'A', avatarMode:'initial', avatarUrl:'',
  color:'#111111', msgBg:'#f5f5f5', chatBg:'#ffffff', chatBgImg:'',
  chatBgMode:'color',
  font:'Inter', fontSize:13, radius:18,
  width:320, height:520,
  position:'bottom-right', posBottom:24, posRight:24,
  launcherIcon:'💬', launcherImg:'',
  effect:'pulse', anim:'elastic',
  badge:true, autoopen:false, pageurl:true, preemail:false,
  state:'online', activePromoId:null,
};
const wbQRsData = [
  {id:1,label:'Pricing',type:'message',value:"I'd like to know about pricing"},
  {id:2,label:'Book a call',type:'link',value:'https://acmestudio.ca/book'},
  {id:3,label:'Services',type:'message',value:'Tell me about your services'},
];
const wbPromosData = [
  {id:1,active:true,headline:'Spring Renovation Special',sub:'15% off full-home projects before June 1',cta:'Book now →',ctaLink:'https://acmestudio.ca/book',img:''},
  {id:2,active:false,headline:'Free Design Consultation',sub:'30-minute session — no commitment',cta:'Claim offer →',ctaLink:'',img:''},
];
let wbNxtId = 20;
let wbIsOpen = true;
let wbSelectedEffect = 'pulse';
let wbSelectedAnim = 'elastic';

function wbTab(btn,panel){
  document.querySelectorAll('.wb-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.wb-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('wbp-'+panel).classList.add('active');
}

// ── AVATAR MODE ──
function setAvatarMode(mode){
  wbCfg.avatarMode = mode;
  document.getElementById('avModeInitial').classList.toggle('active', mode==='initial');
  document.getElementById('avModeImage').classList.toggle('active', mode==='image');
  document.getElementById('av-initial-wrap').style.display = mode==='initial'?'':'none';
  document.getElementById('av-image-wrap').style.display = mode==='image'?'':'none';
  wbSync();
}

// ── CHAT BG MODE ──
function setChatBgMode(mode){
  wbCfg.chatBgMode = mode;
  document.getElementById('chatBgColor').classList.toggle('active', mode==='color');
  document.getElementById('chatBgImage').classList.toggle('active', mode==='image');
  document.getElementById('chat-bg-color-wrap').style.display = mode==='color'?'':'none';
  document.getElementById('chat-bg-img-wrap').style.display = mode==='image'?'':'none';
  wbSync();
}

// ── COLOR SYNC ──
function wbColorSync(){
  const v = document.getElementById('wb-color').value;
  document.getElementById('wb-color-hex').value = v;
  wbSync();
}
function wbHexSync(){
  const v = document.getElementById('wb-color-hex').value;
  if(/^#[0-9a-f]{6}$/i.test(v)){ document.getElementById('wb-color').value=v; wbSync(); }
}
function wbMsgBgHexSync(){
  const v = document.getElementById('wb-msgbg-hex').value;
  if(/^#[0-9a-f]{6}$/i.test(v)){ document.getElementById('wb-msgbg-color').value=v; wbSync(); }
}

// ── FONT ──
function wbFontSync(){
  const font = document.getElementById('wb-font').value;
  // Load Google Font dynamically
  const safeFonts = ['Georgia,serif','Playfair Display,serif','Merriweather,serif'];
  if(!safeFonts.includes(font)){
    const id = 'gf-'+font.replace(/\s/g,'');
    if(!document.getElementById(id)){
      const link = document.createElement('link');
      link.id = id; link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s/g,'+')}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }
  wbSync();
}

// ── SIZE ──
function wbSizeSync(){
  const w = parseInt(document.getElementById('wb-width').value)||320;
  const h = parseInt(document.getElementById('wb-height').value)||520;
  const widget = document.getElementById('wbWidget');
  widget.style.width = w+'px';
  widget.style.maxHeight = h+'px';
}

// ── POSITION ──
function wbPositionMode(){
  const v = document.getElementById('wb-position').value;
  document.getElementById('wb-custom-pos').style.display = v==='custom'?'':'none';
}

// ── LAUNCHER ICON ──
function selectLauncher(el, icon){
  document.querySelectorAll('.launcher-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  wbCfg.launcherIcon = icon;
  document.getElementById('wbwLauncherIcon').textContent = icon;
}

// ── LAUNCHER EFFECT ──
function selectEffect(el, effect){
  document.querySelectorAll('.effect-opt').forEach(o=>o.classList.remove('active'));
  el.classList.add('active');
  wbSelectedEffect = effect;
  const btn = document.getElementById('wbwLauncher');
  btn.className = 'wbw-launcher';
  if(effect!=='none' && effect!=='hover-border' && effect!=='shake'){
    btn.classList.add('launcher-'+effect);
  }
  if(effect==='hover-border') btn.classList.add('launcher-hover-border');
  if(effect==='shake') btn.classList.add('launcher-shake');
}

// ── LOADING ANIM ──
function selectAnim(el, anim){
  document.querySelectorAll('.anim-opt').forEach(o=>o.classList.remove('active'));
  el.classList.add('active');
  wbSelectedAnim = anim;
  const bubble = document.getElementById('wbwTypingBubble');
  const animClasses = ['dot-elastic','dot-pulse','dot-flashing','dot-typing'];
  const animMap = {elastic:'dot-elastic',pulse:'dot-pulse',flashing:'dot-flashing',typing:'dot-typing'};
  // Rebuild inner
  const inner = document.createElement('div');
  inner.style.cssText = 'position:relative;left:20px;color:#aaa';
  const dot = document.createElement('div');
  dot.className = animMap[anim];
  inner.appendChild(dot);
  bubble.innerHTML = '';
  bubble.appendChild(inner);
}

// ── TOGGLE SWITCH ──
function tsToggle(btn, key){
  btn.classList.toggle('on');
  wbCfg[key] = btn.classList.contains('on');
  wbSync();
}

// ── MAIN SYNC ──
function wbSync(){
  if(!document.getElementById('wb-name')) return; // widget screen not ready
  const name    = document.getElementById('wb-name').value||'Support';
  const welcome = document.getElementById('wb-welcome').value;
  const initial = (document.getElementById('wb-initial').value||'?')[0].toUpperCase();
  const color   = document.getElementById('wb-color').value;
  const msgBg   = document.getElementById('wb-msgbg-color').value;
  const chatBg  = document.getElementById('wb-chatbg')?.value||'#ffffff';
  const chatBgImg = document.getElementById('wb-chatbg-img')?.value||'';
  const font    = document.getElementById('wb-font').value;
  const fsize   = document.getElementById('wb-fontsize').value+'px';
  const radius  = document.getElementById('wb-radius').value;
  const avatarUrl = document.getElementById('wb-avatar-url').value;
  const launcherImg = document.getElementById('wb-launcher-img').value;
  const showBadge = document.getElementById('tsw-badge').classList.contains('on');

  // Avatar
  const av = document.getElementById('wbwAv');
  if(wbCfg.avatarMode==='image' && avatarUrl){
    av.innerHTML = `<img src="${avatarUrl}" alt="">`;
  } else {
    av.innerHTML = initial;
    av.style.background = color;
  }

  // Header + name
  document.getElementById('wbwName').textContent = name;
  document.getElementById('wbwHdr').style.background = '#fff';

  // Welcome
  document.getElementById('wbwWelcome').textContent = welcome;

  // Message bg
  document.querySelectorAll('.wbw-msg-a').forEach(el=>el.style.background = msgBg);

  // Chat bg
  const msgs = document.getElementById('wbwMsgs');
  if(wbCfg.chatBgMode==='image' && chatBgImg){
    msgs.style.background = `url(${chatBgImg}) center/cover`;
  } else {
    msgs.style.background = chatBg;
  }

  // Send button + visitor bubbles
  document.getElementById('wbwSend').style.background = color;
  document.querySelectorAll('.wbw-msg-u').forEach(el=>el.style.background=color);

  // Font
  const fontFamily = font.includes(',') ? font : `'${font}', sans-serif`;
  document.getElementById('wbWidget').style.fontFamily = fontFamily;
  document.getElementById('wbWidget').style.fontSize = fsize;

  // Border radius
  document.getElementById('wbWidget').style.borderRadius = radius+'px';

  // Badge
  document.getElementById('wbwBadge').style.display = showBadge?'':'none';

  // Launcher color
  var wbwLauncher = document.getElementById('wbwLauncher');
  if (wbwLauncher) wbwLauncher.style.background = color;
  const liImg = launcherImg;
  if(liImg){
    var liIconEl = document.getElementById('wbwLauncherIcon');
    if (liIconEl) liIconEl.innerHTML = `<img src="${liImg}" style="width:24px;height:24px;object-fit:contain">`;
  } else {
    var liIconEl2 = document.getElementById('wbwLauncherIcon');
    if (liIconEl2) liIconEl2.textContent = wbCfg.launcherIcon;
  }

  // Promo CTA color
  document.getElementById('wbwPromoCta').style.background = color;

  renderQRPreview();
}

// ── WIDGET TOGGLE (launcher ↔ close) ──
function wbToggle(){
  wbIsOpen = !wbIsOpen;
  document.getElementById('wbWidget').style.display = wbIsOpen?'flex':'none';
  document.getElementById('wbwLauncherIcon').textContent = wbIsOpen ? '×' : wbCfg.launcherIcon;
  document.getElementById('wbwLauncherIcon').style.fontSize = wbIsOpen ? '22px' : '20px';
}

// ── WIDGET STATE ──
function wbState(btn, state){
  document.querySelectorAll('.wb-state-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  wbCfg.state = state;

  const banner    = document.getElementById('wbwOfflineBanner');
  const inpRow    = document.getElementById('wbwInpRow');
  const qrRow     = document.getElementById('wbwQRRow');
  const ofForm    = document.getElementById('wbwOfflineForm');
  const promoEl   = document.getElementById('wbwPromo');
  const dot       = document.getElementById('wbwDot');
  const statusTxt = document.getElementById('wbwStatusTxt');
  const launcher  = document.getElementById('wbwLauncher');

  // Reset
  banner.style.display='none'; inpRow.style.display='flex';
  qrRow.style.display='flex'; ofForm.style.display='none';
  dot.style.background='#22c55e'; statusTxt.textContent='Online — replies in minutes';
  promoEl.style.display='none';
  // Show widget, hide launcher
  document.getElementById('wbWidget').style.display='flex';
  launcher.style.display='none';
  wbIsOpen=true;
  document.getElementById('wbwLauncherIcon').textContent=wbCfg.launcherIcon;

  if(state==='offline'){
    banner.style.cssText='display:flex;background:#fffbeb;border-bottom:1px solid #fef3c7;padding:7px 13px;font-size:11px;color:#92400e;align-items:center;gap:6px;flex-shrink:0';
    inpRow.style.display='none'; qrRow.style.display='none'; ofForm.style.display='block';
    dot.style.background='#d1d5db'; statusTxt.textContent='Offline — leave a message';
  } else if(state==='promo'){
    const ap = wbPromosData.find(p=>p.active);
    if(ap){
      document.getElementById('wbwPromoHl').textContent=ap.headline;
      document.getElementById('wbwPromoSub').textContent=ap.sub;
      document.getElementById('wbwPromoCta').textContent=ap.cta;
      const imgEl=document.getElementById('wbwPromoImg');
      imgEl.style.background=ap.img?'':'linear-gradient(135deg,#1a1a1a,#333)';
      if(ap.img) imgEl.innerHTML=`<img src="${ap.img}" alt=""><span class="wbw-promo-tag" style="background:${document.getElementById('wb-color').value}">OFFER</span>`;
      else imgEl.innerHTML=`<span class="wbw-promo-tag" style="background:${document.getElementById('wb-color').value}">OFFER</span>`;
      promoEl.style.display='block';
    } else {
      showToast('No active promo — toggle one on first');
    }
  }
}

// ── SEND IN PREVIEW ──
function wbSend(){
  const input = document.getElementById('wbwInput');
  const text = input.value.trim(); if(!text) return;
  input.value='';
  const msgs = document.getElementById('wbwMsgs');
  const color = document.getElementById('wb-color').value;
  const ub=document.createElement('div');
  ub.className='wbw-msg-u';
  ub.style.cssText=`background:${color};color:white;animation:fadeUp .2s ease both`;
  ub.textContent=text;
  msgs.appendChild(ub); msgs.scrollTop=msgs.scrollHeight;

  // Show typing
  const typing = document.getElementById('wbwTyping');
  typing.classList.add('show'); msgs.scrollTop=msgs.scrollHeight;
  setTimeout(()=>{
    typing.classList.remove('show');
    const ab=document.createElement('div');
    ab.className='wbw-msg-a';
    const msgBg=document.getElementById('wb-msgbg-color').value;
    ab.style.cssText=`background:${msgBg};animation:fadeUp .2s ease both`;
    ab.textContent="Thanks for your message! Let me look into that.";
    msgs.appendChild(ab); msgs.scrollTop=msgs.scrollHeight;
  },1200);
}

// ── QR RENDERS ──
function renderQRList(){
  const el=document.getElementById('qr-list'); if(!el) return; el.innerHTML='';
  wbQRsData.forEach(qr=>{
    const d=document.createElement('div'); d.className='qr-item';
    d.innerHTML=`
      <div class="qr-item-top">
        <span class="qr-handle">⠿</span>
        <input class="qr-label-inp" value="${qr.label}" oninput="wbQRUpdate(${qr.id},'label',this.value)" placeholder="Button label">
        <button class="qr-del" onclick="deleteQR(${qr.id})">×</button>
      </div>
      <div class="qr-row2">
        <select class="qr-sel" onchange="wbQRUpdate(${qr.id},'type',this.value)">
          <option ${qr.type==='message'?'selected':''}>message</option>
          <option ${qr.type==='link'?'selected':''}>link</option>
        </select>
        <input class="qr-val" value="${qr.value}" placeholder="${qr.type==='link'?'https://...':'Message text'}" oninput="wbQRUpdate(${qr.id},'value',this.value)">
      </div>`;
    el.appendChild(d);
  });
  renderQRPreview();
  updateAddQRBtn();
}
function renderQRPreview(){
  const row=document.getElementById('wbwQRRow'); row.innerHTML='';
  wbQRsData.forEach(qr=>{
    const p=document.createElement('button'); p.className='wbw-qr-pill';
    p.textContent=qr.label;
    p.onclick=()=>{
      if(qr.type==='link') showToast('Opens: '+qr.value);
      else{ document.getElementById('wbwInput').value=qr.value; wbSend(); }
    };
    row.appendChild(p);
  });
}
function wbQRUpdate(id,field,val){
  const q=wbQRsData.find(q=>q.id===id); if(q){ q[field]=val; renderQRPreview(); }
}
function addQR(){
  if(wbQRsData.length>=3){ showToast('Free plan: max 3 quick replies. Upgrade for unlimited.'); return; }
  wbQRsData.push({id:wbNxtId++,label:'New button',type:'message',value:''});
  renderQRList(); showToast('Quick reply added');
}
function updateAddQRBtn(){
  const btn=document.getElementById('addQRBtn');
  const lim=document.querySelector('.add-item-limit');
  if(btn){
    const atLimit=wbQRsData.length>=3;
    btn.classList.toggle('pro-locked',atLimit);
    btn.style.pointerEvents=atLimit?'none':'auto';
  }
  if(lim) lim.innerHTML=`${Math.min(wbQRsData.length,3)} / 3 used <span class="pro-pill">Free limit</span>`;
}
function deleteQR(id){
  const i=wbQRsData.findIndex(q=>q.id===id);
  if(i>-1) wbQRsData.splice(i,1);
  renderQRList();
}

// ── PROMO RENDERS ──
function renderPromoList(){
  const el=document.getElementById('promo-list'); if(!el) return; el.innerHTML='';
  wbPromosData.forEach(p=>{
    const d=document.createElement('div'); d.className='promo-item';
    const color=document.getElementById('wb-color')?.value||'#111';
    d.innerHTML=`
      <div class="promo-hdr" onclick="togglePromoBody(${p.id})">
        <div class="promo-title">
          <span>${p.headline||'Untitled promo'}</span>
          <span class="promo-badge ${p.active?'':'off'}">${p.active?'Active':'Inactive'}</span>
        </div>
        <div class="promo-acts" onclick="event.stopPropagation()">
          <button class="promo-tog ${p.active?'on':''}" onclick="togglePromoActive(${p.id})">${p.active?'Deactivate':'Activate'}</button>
          <button class="qr-del" onclick="deletePromo(${p.id})" style="font-size:14px">×</button>
        </div>
        <span class="promo-chev" id="pchev-${p.id}">⌄</span>
      </div>
      <div class="promo-body" id="pbody-${p.id}">
        <div class="promo-preview">
          <div class="promo-img-ph" id="pimg-${p.id}">${p.img?`<img src="${p.img}" alt="">`:'Image / GIF preview'}</div>
          <div class="promo-preview-body">
            <div class="promo-preview-hl" id="phl-${p.id}">${p.headline}</div>
            <div class="promo-preview-sub" id="psub-${p.id}">${p.sub}</div>
            <button class="promo-preview-cta" id="pcta-${p.id}" style="background:${color};color:white">${p.cta}</button>
          </div>
        </div>
        <div class="wb-field"><label>Image / GIF URL</label>
          <input type="url" value="${p.img}" placeholder="https://..." oninput="promoUpdate(${p.id},'img',this.value)">
          <div class="hint">340×120px recommended.</div>
        </div>
        <div class="wb-field"><label>Headline</label><input type="text" value="${p.headline}" oninput="promoUpdate(${p.id},'headline',this.value)"></div>
        <div class="wb-field"><label>Subtitle</label><input type="text" value="${p.sub}" oninput="promoUpdate(${p.id},'sub',this.value)"></div>
        <div class="wb-field-row">
          <div class="wb-field" style="margin:0"><label>CTA text</label><input type="text" value="${p.cta}" oninput="promoUpdate(${p.id},'cta',this.value)"></div>
          <div class="wb-field" style="margin:0"><label>CTA link</label><input type="url" value="${p.ctaLink}" placeholder="https://..." oninput="promoUpdate(${p.id},'ctaLink',this.value)"></div>
        </div>
      </div>`;
    el.appendChild(d);
  });
}
function togglePromoBody(id){
  const b=document.getElementById('pbody-'+id);
  const c=document.getElementById('pchev-'+id);
  const h=b.previousElementSibling;
  const show=!b.classList.contains('show');
  b.classList.toggle('show',show);
  c.classList.toggle('open',show);
  h.classList.toggle('open',show);
}
function togglePromoActive(id){
  wbPromosData.forEach(p=>p.active=(p.id===id)?!p.active:false);
  renderPromoList();
}
function promoUpdate(id,field,val){
  const p=wbPromosData.find(p=>p.id===id); if(!p) return;
  p[field]=val;
  const hl=document.getElementById('phl-'+id);
  const sub=document.getElementById('psub-'+id);
  const cta=document.getElementById('pcta-'+id);
  const img=document.getElementById('pimg-'+id);
  if(hl) hl.textContent=p.headline;
  if(sub) sub.textContent=p.sub;
  if(cta) cta.textContent=p.cta;
  if(img && field==='img') img.innerHTML=val?`<img src="${val}" alt="">`:' Image / GIF preview';
}
function addPromo(){
  showToast('Promo cards are a Pro feature — upgrade to unlock');
}
function deletePromo(id){
  const i=wbPromosData.findIndex(p=>p.id===id);
  if(i>-1) wbPromosData.splice(i,1);
  renderPromoList();
}

// ── INIT ──
function initWidgetBuilder(){
  renderQRList();
  renderPromoList();
  wbSync();
  // Start with launcher visible (preview open state)
  var launcher = document.getElementById('wbwLauncher');
  var wbColor = document.getElementById('wb-color');
  if(launcher) launcher.style.display='flex';
  if(launcher && wbColor) launcher.style.background=wbColor.value;
  // Apply default pulse effect
  var pulseBtn = document.querySelector('[data-effect="pulse"]');
  if(pulseBtn) selectEffect(pulseBtn,'pulse');
}


// ══════════════════════════
//  ANALYTICS
// ══════════════════════════
const analyticsData = {
  '7d':  { convs:'14', resp:'3m', res:'88%', contacts:'3', convsDelta:'↑ +22% vs prev 7d', respDelta:'↓ 1m faster', resDelta:'↑ +8%', contactsDelta:'↑ +2 this period',
            bars:[2,3,1,4,2,1,1], start:'May 3', mid:'May 6', end:'May 9' },
  '30d': { convs:'48', resp:'4m', res:'85%', contacts:'9', convsDelta:'↑ +18% vs last period', respDelta:'↓ 2m faster than before', resDelta:'↑ +6% vs last period', contactsDelta:'↑ +4 this period',
            bars:[1,2,1,3,2,1,2,3,4,2,1,3,2,4,3,2,1,2,3,2,3,4,2,3,4,3,2,4,3,2], start:'Apr 9', mid:'Apr 24', end:'May 9' },
  '90d': { convs:'124', resp:'5m', res:'81%', contacts:'22', convsDelta:'↑ +34% vs prev 90d', respDelta:'↑ 1m slower vs Q1', resDelta:'↓ -2% vs prev quarter', contactsDelta:'↑ +15 this period',
            bars:[1,2,3,2,3,4,3,4,5,4,3,4,5,4,5,6,5,4,5,6,5,6,7,6,5,6,7,6,7,8], start:'Feb 9', mid:'Mar 24', end:'May 9' },
};

const hourBars = [1,2,3,4,5,6,7,8,9,10,9,8,7,8,9,10,8,6,4,3,2,1];
const chartViews = {
  convs:    { bars30: [1,2,1,3,2,1,2,3,4,2,1,3,2,4,3,2,1,2,3,2,3,4,2,3,4,3,2,4,3,2] },
  msgs:     { bars30: [5,8,4,12,9,4,7,11,16,8,5,13,9,18,14,8,4,9,13,8,11,17,8,14,16,12,9,18,13,9] },
  contacts: { bars30: [0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1,1,0,0,1,0,1] },
};

let currentRange = '30d';
let currentChartView = 'convs';

function buildBarChart(containerId, values, accentIdx) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = Math.max(...values, 1);
  el.innerHTML = '';
  values.forEach((v, i) => {
    const col = document.createElement('div');
    col.className = 'bar-col';
    const fill = document.createElement('div');
    fill.className = 'bar-fill ' + (accentIdx !== undefined && i === accentIdx ? 'accent' : (v > 0 ? 'accent' : 'muted'));
    fill.style.height = Math.max((v / max) * 100, 2) + '%';
    fill.title = v;
    col.appendChild(fill);
    el.appendChild(col);
  });
}

function buildSparkline() {
  const el = document.getElementById('sparkline');
  if (!el) return;
  const vals = [3,4,5,4,6,5,7,6,8,7,9,8,10,9];
  const max = Math.max(...vals);
  el.innerHTML = '';
  vals.forEach(v => {
    const b = document.createElement('div');
    b.className = 'spark-bar';
    b.style.height = (v / max * 100) + '%';
    b.style.background = v === max ? 'var(--ink)' : 'var(--border)';
    el.appendChild(b);
  });
}

function buildHourChart() {
  const el = document.getElementById('hourChart');
  if (!el) return;
  const max = Math.max(...hourBars);
  el.innerHTML = '';
  hourBars.forEach((v, i) => {
    const col = document.createElement('div');
    col.className = 'bar-col';
    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.height = (v / max * 100) + '%';
    // Highlight peak hours (2pm = index 5 in 9am-based)
    fill.style.background = (i >= 5 && i <= 7) ? 'var(--ink)' : '#d0cec9';
    col.appendChild(fill);
    el.appendChild(col);
  });
}

function setRange(btn, range) {
  document.querySelectorAll('.dr-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentRange = range;
  const d = analyticsData[range];
  document.getElementById('anConvs').textContent = d.convs;
  document.getElementById('anResp').textContent = d.resp;
  document.getElementById('anRes').textContent = d.res;
  document.getElementById('anContacts').textContent = d.contacts;
  document.getElementById('anConvsDelta').textContent = d.convsDelta;
  document.getElementById('anRespDelta').textContent = d.respDelta;
  document.getElementById('anResDelta').textContent = d.resDelta;
  document.getElementById('anContactsDelta').textContent = d.contactsDelta;
  document.getElementById('chartStart').textContent = d.start;
  document.getElementById('chartMid').textContent = d.mid;
  document.getElementById('chartEnd').textContent = d.end;
  document.getElementById('chartSubLabel').textContent = range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days';
  buildBarChart('mainBarChart', d.bars);
}

function setChartView(btn, view) {
  document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentChartView = view;
  const d = analyticsData[currentRange];
  const vbars = view === 'convs' ? d.bars : chartViews[view].bars30;
  buildBarChart('mainBarChart', vbars.slice(0, d.bars.length));
}

function initAnalytics() {
  buildBarChart('mainBarChart', analyticsData['30d'].bars);
  buildHourChart();
  buildSparkline();
}

// ══════════════════════════
//  CANNED REPLIES
// ══════════════════════════
const CANNED = [
  { id:1, title:'Welcome greeting',        shortcut:'/hi',      category:'greeting', used:22,
    body:'Hi {{visitor_name}}! Welcome to {{workspace_name}}. How can we help you today?' },
  { id:2, title:'Back in a moment',        shortcut:'/brb',     category:'greeting', used:8,
    body:"Thanks for your message! I'm just finishing up with another customer — I'll be with you in 2–3 minutes." },
  { id:3, title:'Pricing overview',        shortcut:'/pricing', category:'pricing',  used:18,
    body:"Our projects start from $8,000 for a focused single room and scale based on scope. For a full home renovation we'd typically quote $25,000–$60,000+. Happy to give you a more accurate number on a quick call — it only takes 20 minutes." },
  { id:4, title:'Request project details', shortcut:'/details', category:'pricing',  used:11,
    body:'To give you an accurate estimate, could you share a bit more?\n\n• Approximate square footage\n• Scope (full home / single room)\n• Rough timeline\n• Budget range if you have one in mind\n\nNo pressure on any of those — just helps us tailor the conversation.' },
  { id:5, title:'Book a discovery call',   shortcut:'/book',    category:'followup', used:14,
    body:"Thanks for reaching out! I'd love to learn more about your project. Would you be available for a quick 20-minute discovery call this week? You can book directly at acmestudio.ca/book, or just let me know a time that works and I'll send a calendar invite." },
  { id:6, title:'Request email for follow-up', shortcut:'/email', category:'followup', used:19,
    body:"I want to make sure we follow up properly — could I grab your email address? I'll send you our portfolio and a few notes from our conversation." },
  { id:7, title:'Conversation resolved',   shortcut:'/done',    category:'closing',  used:31,
    body:"Great — glad we could help! Feel free to reach out anytime if anything else comes up. Have a wonderful day 👋" },
  { id:8, title:'Away message',            shortcut:'/away',    category:'closing',  used:7,
    body:"Thanks for getting in touch! We're currently away but we've received your message and will reply within 1 business day. If it's urgent, you can also reach us at hello@acmestudio.ca." },
];

let selectedCanned = CANNED[4]; // default: book
let filteredCategory = 'all';
// Free plan: max 10 canned replies
while (CANNED.length > 10) CANNED.pop();

function renderCannedList(filter) {
  const list = document.getElementById('cannedList');
  const items = filter === 'all' ? CANNED : CANNED.filter(c => c.category === filter);
  list.innerHTML = '';
  items.forEach(c => {
    const el = document.createElement('div');
    el.className = 'canned-item' + (c.id === selectedCanned.id ? ' active' : '');
    el.innerHTML = `
      <div class="canned-shortcut">
        <span class="sc-tag">${c.shortcut}</span>
        ${c.title}
      </div>
      <div class="canned-preview">${c.body.replace(/\n/g,' ')}</div>
    `;
    el.onclick = () => selectCanned(c);
    list.appendChild(el);
  });
}

function selectCanned(c) {
  selectedCanned = c;
  document.getElementById('editorTitle').textContent = c.title;
  document.getElementById('editorShortcut').textContent = 'Shortcut: ' + c.shortcut;
  document.getElementById('edTitle').value = c.title;
  document.getElementById('edShortcut').value = c.shortcut;
  document.getElementById('edBody').value = c.body;
  document.getElementById('edCategory').value = c.category.charAt(0).toUpperCase() + c.category.slice(1);
  document.getElementById('previewBubble').textContent = c.body.replace(/{{visitor_name}}/g,'Alex').replace(/{{agent_name}}/g,'Jack').replace(/{{workspace_name}}/g,'Acme Studio').replace(/{{page_url}}/g,'/pricing');
  // usage stats — randomise per item
  const usageCards = document.querySelectorAll('.usage-num');
  if (usageCards[0]) usageCards[0].textContent = c.used;
  if (usageCards[1]) usageCards[1].textContent = Math.floor(60 + Math.random()*35) + '%';
  if (usageCards[2]) usageCards[2].textContent = Math.floor(1 + Math.random()*4) + 'm avg';
  renderCannedList(filteredCategory);
}

function filterCat(el, cat) {
  document.querySelectorAll('.canned-cat').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filteredCategory = cat;
  renderCannedList(cat);
}

function updateEditorHeader() {
  document.getElementById('editorShortcut').textContent = 'Shortcut: ' + document.getElementById('edShortcut').value;
}

function updatePreviewBubble() {
  const text = document.getElementById('edBody').value;
  document.getElementById('previewBubble').textContent = text
    .replace(/{{visitor_name}}/g,'Alex')
    .replace(/{{agent_name}}/g,'Jack')
    .replace(/{{workspace_name}}/g,'Acme Studio')
    .replace(/{{page_url}}/g,'/pricing');
}

function insertVar(v) {
  const ta = document.getElementById('edBody');
  const pos = ta.selectionStart;
  ta.value = ta.value.slice(0,pos) + v + ta.value.slice(pos);
  updatePreviewBubble();
  showToast('Variable inserted');
}

function saveCanned() {
  selectedCanned.title = document.getElementById('edTitle').value;
  selectedCanned.shortcut = document.getElementById('edShortcut').value;
  selectedCanned.body = document.getElementById('edBody').value;
  document.getElementById('editorTitle').textContent = selectedCanned.title;
  renderCannedList(filteredCategory);
  showToast('Canned reply saved ✓');
}

function deleteCanned() {
  const idx = CANNED.findIndex(c => c.id === selectedCanned.id);
  if (idx > -1) CANNED.splice(idx, 1);
  selectedCanned = CANNED[0];
  selectCanned(selectedCanned);
  updateCannedCapBar();
  showToast('Reply deleted');
}

function newCannedCategory() {
  const name = prompt('Category name:');
  if (!name) return;
  const icon = prompt('Icon (emoji):', '📌');
  // Add to category list
  const nav = document.querySelector('.canned-categories');
  const div = document.createElement('div');
  div.className = 'canned-cat';
  div.innerHTML = `<div class="canned-cat-name"><span class="canned-cat-icon">${icon||'📌'}</span> ${name}</div><div class="canned-cat-count">0</div>`;
  div.onclick = function(){ filterCat(this, name.toLowerCase()); };
  nav.appendChild(div);
  showToast('Category "' + name + '" added');
}

function newCannedCategory() {
  const name = prompt('Category name (e.g. Objections, Pricing, Support):');
  if (!name) return;
  const icon = prompt('Icon (emoji):', '📌') || '📌';
  const nav = document.querySelector('.canned-categories');
  const div = document.createElement('div');
  div.className = 'canned-cat';
  div.innerHTML = `<div class="canned-cat-name"><span class="canned-cat-icon">${icon}</span> ${name}</div><div class="canned-cat-count">0</div>`;
  div.onclick = function(){ filterCat(this, name.toLowerCase()); };
  nav.appendChild(div);
  showToast('"' + name + '" category added');
}

function updateCannedCapBar() {
  const count = CANNED.length;
  const label = document.getElementById('cannedCountLabel');
  if (label) label.textContent = count + ' / 10 replies';
  const btn = document.getElementById('addCannedBtn');
  if (btn) {
    if (count >= 10) {
      btn.classList.add('pro-locked');
      btn.setAttribute('data-pro-trigger','quickreplies');
    } else {
      btn.classList.remove('pro-locked');
      btn.removeAttribute('data-pro-trigger');
    }
  }
}

function newCanned() {
  if (CANNED.length >= 10) {
    var btn = document.getElementById('addCannedBtn');
    if (btn) showProPopover(btn, 'quickreplies');
    return;
  }
  const nc = { id: Date.now(), title:'New reply', shortcut:'/new', category:'general', used:0, body:'' };
  CANNED.unshift(nc);
  updateCannedCapBar();
  selectCanned(nc);
  showToast('New reply created — fill in the details');
}

// Override insertCanned in inbox to use canned data
function insertCanned() {
  const pick = CANNED[Math.floor(Math.random() * CANNED.length)];
  document.getElementById('replyInput').value = pick.body
    .replace(/{{visitor_name}}/g,'Alex')
    .replace(/{{agent_name}}/g,'Jack')
    .replace(/{{workspace_name}}/g,'Acme Studio')
    .replace(/{{page_url}}/g,'/pricing');
  showToast('Canned reply inserted: ' + pick.shortcut);
}

// ── PRO POPOVER SYSTEM ──
var PRO_FEATURES = {
  badge: {
    emoji: '🔲',
    heading: 'Remove the Chattt badge',
    sub: 'Show your brand, not ours. The "Chat by Chattt" badge disappears on Pro.',
    features: [
      'Full white-label widget — your brand only',
      'Custom colors, fonts, and avatar',
      'Visitors never see the Chattt name',
    ]
  },
  quickreplies: {
    emoji: '⚡',
    heading: 'Unlimited quick replies',
    sub: 'Free plan is limited to 3. Pro removes the cap entirely.',
    features: [
      'Add as many quick replies as you need',
      'Mix message shortcuts and link buttons',
      'Guide visitors through any flow',
    ]
  },
  promos: {
    emoji: '🎁',
    heading: 'Promo cards',
    sub: 'Show a promotional banner above the chat — offers, announcements, booking CTAs.',
    features: [
      'Animated offer cards with image/GIF',
      'Toggle on/off without losing content',
      'One active promo at a time',
    ]
  },
  csv: {
    emoji: '📤',
    heading: 'CSV export',
    sub: 'Export your contacts and analytics data to CSV any time.',
    features: [
      'Export full contact list with history',
      'Export analytics by date range',
      'Take your data anywhere',
    ]
  },
  seats: {
    emoji: '👥',
    heading: 'Extra agent seats',
    sub: 'Invite your team. Each extra seat is $9/mo on Pro.',
    features: [
      'Unlimited agent invites',
      'Role-based access (owner / agent)',
      '$9/seat/mo — only pay for what you use',
    ]
  }
};

var _proPopoverTimeout = null;
var _proPopoverVisible = false;

function showProPopover(triggerEl, featureKey) {
  var data = PRO_FEATURES[featureKey];
  if (!data) return;

  var pop = document.getElementById('proPopover');
  if (!pop) return;

  var emojiEl = document.getElementById('proPopoverEmoji');
  var headingEl = document.getElementById('proPopoverHeading');
  var subEl = document.getElementById('proPopoverSub');
  var featEl = document.getElementById('proPopoverFeatures');
  if (!emojiEl || !headingEl || !subEl || !featEl) return;

  emojiEl.textContent = data.emoji;
  headingEl.textContent = data.heading;
  subEl.textContent = data.sub;
  featEl.innerHTML = data.features.map(function(f){
    return '<div class="pro-popover-feature"><span class="pro-popover-feature-icon">✓</span><span>' + f + '</span></div>';
  }).join('');

  // Position relative to trigger
  var rect = triggerEl.getBoundingClientRect();
  var vw = window.innerWidth, vh = window.innerHeight;
  var popW = 300, popH = 220; // approx

  var top = rect.bottom + 10;
  var left = rect.left;

  // Flip up if not enough room below
  if (top + popH > vh - 20) top = rect.top - popH - 10;
  // Clamp right edge
  if (left + popW > vw - 16) left = vw - popW - 16;
  if (left < 16) left = 16;

  pop.style.top = top + 'px';
  pop.style.left = left + 'px';

  pop.classList.add('visible');
  _proPopoverVisible = true;
}

function hideProPopover() {
  var pop = document.getElementById('proPopover');
  if (pop) pop.classList.remove('visible');
  _proPopoverVisible = false;
}

// Wire all pro triggers
function wireProTriggers() {
  document.querySelectorAll('[data-pro-trigger]').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      clearTimeout(_proPopoverTimeout);
      showProPopover(el, el.getAttribute('data-pro-trigger'));
    });
    el.addEventListener('mouseleave', function() {
      _proPopoverTimeout = setTimeout(function() {
        var pop2 = document.getElementById('proPopover');
        if (!pop2 || !pop2.matches(':hover')) hideProPopover();
      }, 220);
    });
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      if (_proPopoverVisible) hideProPopover();
      else showProPopover(el, el.getAttribute('data-pro-trigger'));
    });
  });

  var pop = document.getElementById('proPopover');
  if (!pop) return;
  pop.addEventListener('mouseenter', function() { clearTimeout(_proPopoverTimeout); });
  pop.addEventListener('mouseleave', function() {
    _proPopoverTimeout = setTimeout(hideProPopover, 150);
  });
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('[data-pro-trigger]') && !e.target.closest('#proPopover')) hideProPopover();
});

// ── NOTIFICATION SYSTEM ──
var soundEnabled = true;
var notifCards = [];
var notifFanned = false;

var demoVisitors = [
  { name: 'Mia Chen',     initial: 'M', color:'#e85d04', msg: 'Hi! I have a quick question about pricing.',         page: '/pricing' },
  { name: 'Lucas B.',     initial: 'L', color:'#7c3aed', msg: 'Is the Pro plan billed monthly or annually?',        page: '/plans' },
  { name: 'Sophie R.',    initial: 'S', color:'#0891b2', msg: 'Can I talk to someone before I sign up?',            page: '/contact' },
  { name: 'David K.',     initial: 'D', color:'#16a34a', msg: 'Hey, I need help with my current order.',            page: '/orders' },
  { name: 'Amara T.',     initial: 'A', color:'#dc2626', msg: 'Do you offer refunds within 30 days?',               page: '/faq' },
  { name: 'James O.',     initial: 'J', color:'#b45309', msg: 'What\'s included in the free plan exactly?',          page: '/pricing' },
  { name: 'Nina W.',      initial: 'N', color:'#be185d', msg: 'Do you have a live demo I can try?',                 page: '/demo' },
  { name: 'Carlos M.',    initial: 'C', color:'#0f766e', msg: 'How long does it take to install the widget?',       page: '/docs' },
  { name: 'Olivia P.',    initial: 'O', color:'#4338ca', msg: 'Can I import contacts from Intercom?',                page: '/migrate' },
  { name: 'Rashid K.',    initial: 'R', color:'#ea580c', msg: 'Is there a discount for annual billing?',             page: '/pricing' },
];
var demoIdx = 0;

function showNewConvNotif() {
  var activeScreen = document.querySelector('.screen.active');
  if (activeScreen && ['screen-inbox','screen-login','screen-signup'].indexOf(activeScreen.id) !== -1) return;

  var visitor = demoVisitors[demoIdx % demoVisitors.length];
  demoIdx++;

  pulseBadge();

  var frame = document.querySelector('.app-frame');
  if (frame) { frame.classList.remove('shimmer'); void frame.offsetWidth; frame.classList.add('shimmer'); setTimeout(function(){ frame.classList.remove('shimmer'); }, 700); }

  var flash = document.getElementById('screenFlash');
  if (flash) { flash.classList.remove('active'); void flash.offsetWidth; flash.classList.add('active'); setTimeout(function(){ flash.classList.remove('active'); }, 800); }

  if (soundEnabled) playNotifSound();

  var card = buildNotifCard(visitor);
  var pile = document.getElementById('convNotifPile');
  if (!pile) return;

  notifCards.unshift(card); // newest at front of array

  if (notifFanned && _fanTrack) {
    // Fan is open — inject new card; with column-reverse, it appears at the bottom (newest position)
    _fanTrack.insertBefore(card, _fanTrack.firstChild);
    card.className = 'conv-notif-card fanned';
    card.style.position = 'relative';
    card.style.width = '100%';
    card.style.transformOrigin = 'center bottom';
    card.style.animation = 'fanCardIn .45s cubic-bezier(.22,1.05,.36,1) backwards';
    updateControls();
    requestAnimationFrame(function() {
      updateFanScrollBounds();
    });
  } else {
    // Stack mode — append to pile and restack
    pile.appendChild(card);
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        restackCards();
      });
    });
  }

  var backdrop = document.getElementById('convNotifBackdrop');
  if (backdrop) backdrop.classList.add('active');
}

function buildNotifCard(visitor) {
  var card = document.createElement('div');
  card.className = 'conv-notif-card entering';
  card.onclick = function(e) {
    if (e.target.closest('.conv-notif-btn')) return;
    if (notifCards.length > 1) {
      if (notifFanned) collapseFan();
      else fanOut();
    }
  };
  card.innerHTML =
    '<div class="conv-notif-header">' +
      '<div class="conv-notif-app-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a5.9 5.9 0 0 0-5.9 5.36c-.1 1-.08 3.64-.05 5.24.01.71.59 1.28 1.31 1.28h4.64A5.95 5.95 0 0 0 12.95 7 5.96 5.96 0 0 0 7 1" fill="#fff"/></svg></div>' +
      '<span class="conv-notif-app-name">Chattt &middot; New conversation</span>' +
      '<span class="conv-notif-time">just now</span>' +
    '</div>' +
    '<div class="conv-notif-body">' +
      '<div class="conv-notif-avatar" style="background:' + visitor.color + '">' + visitor.initial + '</div>' +
      '<div class="conv-notif-content">' +
        '<div class="conv-notif-name">' + visitor.name + '</div>' +
        '<div class="conv-notif-msg">' + visitor.msg + '</div>' +
        '<div class="conv-notif-page">on ' + visitor.page + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="conv-notif-actions">' +
      '<button class="conv-notif-btn dismiss" onclick="dismissNotif(this.closest(\'.conv-notif-card\'))">Dismiss</button>' +
      '<button class="conv-notif-btn reply" onclick="replyNotif(this.closest(\'.conv-notif-card\'))">Reply &rarr;</button>' +
    '</div>';
  return card;
}

// ── Vertical fan with global wheel/touch capture (no clipping ever) ──
var _fanOverlay = null;
var _fanTrack = null;
var _fanScrollY = 0;
var _fanMaxScroll = 0;

function getFanOverlay() {
  if (_fanOverlay) return _fanOverlay;

  // Outer fixed container — clip top only (via clip-path) so older cards aren't visible above
  // clip-path with insets keeps sides unclipped, avoiding box-shadow clipping
  _fanOverlay = document.createElement('div');
  _fanOverlay.id = 'convNotifFanOverlay';
  _fanOverlay.style.cssText = [
    'position:fixed',
    'left:50%',
    'bottom:72px',
    'transform:translateX(-50%)',
    'width:min(440px, calc(100vw - 32px))',
    'height:calc(100vh - 120px)',
    'z-index:2100',
    'pointer-events:none',
    'display:none',
    'overflow:clip',
    'padding:0 20px',
    // Top fade for older cards scrolling into view
    '-webkit-mask-image:linear-gradient(to bottom, transparent 0%, black 50px, black 100%)',
    'mask-image:linear-gradient(to bottom, transparent 0%, black 50px, black 100%)'
  ].join(';');

  // Track holds the cards — flow at the BOTTOM of overlay (cards stack upward from there)
  _fanTrack = document.createElement('div');
  _fanTrack.id = 'convNotifFanTrack';
  _fanTrack.style.cssText = [
    'position:absolute',
    'bottom:8px',
    'left:20px',
    'right:20px',
    'display:flex',
    'flex-direction:column-reverse',
    'gap:12px',
    'pointer-events:all',
    'will-change:transform',
    'transition:transform .25s cubic-bezier(.22,1,.36,1)'
  ].join(';');
  _fanOverlay.appendChild(_fanTrack);

  document.body.appendChild(_fanOverlay);

  // Touch handler scoped to track (drag the cards)
  var touchStartY = 0, touchStartScroll = 0;
  _fanTrack.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    touchStartScroll = _fanScrollY;
    _fanTrack.style.transition = 'none';
  }, { passive: true });
  _fanTrack.addEventListener('touchmove', function(e) {
    if (_fanMaxScroll <= 0) return;
    var dy = e.touches[0].clientY - touchStartY; // drag down = positive
    _fanScrollY = Math.max(0, Math.min(_fanMaxScroll, touchStartScroll + dy));
    _fanTrack.style.transform = 'translateY(' + _fanScrollY + 'px)';
  }, { passive: true });
  _fanTrack.addEventListener('touchend', function() {
    _fanTrack.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)';
  }, { passive: true });

  return _fanOverlay;
}

// Global wheel handler — works anywhere on the page while fan is open
function _globalWheelHandler(e) {
  if (!notifFanned || _fanMaxScroll <= 0) return;
  e.preventDefault();
  // Wheel down (deltaY > 0) = scroll forward through content (toward newer, but we're already at newest)
  // Wheel up (deltaY < 0) = scroll back through content (reveal older cards from top)
  // Reverse so wheel up moves track DOWN (positive translateY) to push older cards into view
  _fanScrollY = Math.max(0, Math.min(_fanMaxScroll, _fanScrollY - e.deltaY));
  _fanTrack.style.transform = 'translateY(' + _fanScrollY + 'px)';
}

function updateFanScrollBounds() {
  if (!_fanOverlay || !_fanTrack) return;
  var overlayH = _fanOverlay.offsetHeight;
  var trackH = _fanTrack.scrollHeight;
  _fanMaxScroll = Math.max(0, trackH - overlayH);
  if (_fanScrollY > _fanMaxScroll) {
    _fanScrollY = _fanMaxScroll;
    _fanTrack.style.transform = 'translateY(' + _fanScrollY + 'px)';
  }
}

function restackCards() {
  var pile = document.getElementById('convNotifPile');
  if (!pile) return;

  notifCards.forEach(function(card) {
    if (card.parentNode !== pile) pile.appendChild(card);
    card.className = 'conv-notif-card';
    card.style.position = '';
    card.style.transform = '';
    card.style.transition = '';
    card.style.animation = '';
    card.style.opacity = '';
    card.style.width = '';
    card.style.marginTop = '';
    card.style.transformOrigin = '';
  });

  var topCard = notifCards[0];
  var cardH = topCard ? (topCard.offsetHeight || 130) : 130;
  pile.style.height = (cardH + 62) + 'px';

  notifCards.forEach(function(card, i) {
    if (i === 0)      card.classList.add('stack-0');
    else if (i === 1) card.classList.add('stack-1');
    else if (i === 2) card.classList.add('stack-2');
    else if (i === 3) card.classList.add('stack-3');
    else              card.classList.add('stack-hidden');
  });
  updateControls();
}

function fanOut() {
  if (notifFanned) return;
  notifFanned = true;
  var pile = document.getElementById('convNotifPile');
  var overlay = getFanOverlay();

  // Move all cards to the track, set them visible
  notifCards.forEach(function(card, i) {
    if (card.parentNode !== _fanTrack) _fanTrack.appendChild(card);
    card.className = 'conv-notif-card fanned';
    card.style.position = 'relative';
    card.style.width = '100%';
    card.style.transformOrigin = 'center bottom';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
    card.style.transition = '';
    // Use CSS animation with per-card delay
    card.style.animation = 'none';
    void card.offsetWidth; // reflow to reset
    card.style.animation = 'fanCardIn .55s cubic-bezier(.22,1.05,.36,1) ' + (i * 55) + 'ms backwards';
  });

  pile.style.height = '0';
  overlay.style.display = 'block';

  _fanScrollY = 0;
  _fanTrack.style.transform = 'translateY(0)';

  window.addEventListener('wheel', _globalWheelHandler, { passive: false });

  requestAnimationFrame(function() {
    updateFanScrollBounds();
    setTimeout(updateFanScrollBounds, 700);
  });

  updateControls();
}

function collapseFan() {
  if (!notifFanned) return;
  notifFanned = false;

  window.removeEventListener('wheel', _globalWheelHandler, { passive: false });

  var total = notifCards.length;
  notifCards.forEach(function(card, i) {
    // Oldest (high i) falls first; newest (i=0) falls last
    var reverseIdx = (total - 1) - i;
    var delay = reverseIdx * 40;
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'fanCardOut .42s cubic-bezier(.5,0,.5,1) ' + delay + 'ms forwards';
  });

  var totalDuration = 420 + (total - 1) * 40 + 50;
  setTimeout(function() {
    if (_fanOverlay) _fanOverlay.style.display = 'none';
    _fanScrollY = 0;
    if (_fanTrack) _fanTrack.style.transform = 'translateY(0)';
    // Clear animations before restacking
    notifCards.forEach(function(card) {
      card.style.animation = '';
    });
    restackCards();
  }, totalDuration);
}

function toggleFan() {
  if (notifFanned) collapseFan();
  else fanOut();
}

function resetPile() {
  var pile = document.getElementById('convNotifPile');
  if (!pile) return;
  pile.style.display = '';
}

window.addEventListener('resize', function() {
  if (notifFanned) updateFanScrollBounds();
});

function updateControls() {
  var controls = document.getElementById('convNotifControls');
  var countEl  = document.getElementById('convNotifCount');
  var toggleBtn = document.getElementById('convNotifToggleBtn');
  if (!controls) return;
  if (notifCards.length > 1) {
    controls.classList.add('visible');
    if (countEl) countEl.textContent = notifCards.length + ' notifications';
    if (toggleBtn) toggleBtn.textContent = notifFanned ? 'Collapse' : 'Expand';
  } else {
    controls.classList.remove('visible');
  }
}

function dismissAllNotifs() {
  notifCards.forEach(function(card, i) {
    var delay = i * 30;
    card.style.transition = 'transform .25s ease ' + delay + 'ms, opacity .2s ease ' + delay + 'ms';
    card.style.transform = 'translateX(430px)';
    card.style.opacity = '0';
  });
  setTimeout(function() {
    notifCards = [];
    notifFanned = false;
    var pile = document.getElementById('convNotifPile');
    if (pile) { pile.innerHTML = ''; pile.style.height = '0'; }
    if (_fanOverlay) { _fanOverlay.innerHTML = ''; _fanOverlay.style.display = 'none'; }
    var controls = document.getElementById('convNotifControls');
    if (controls) controls.classList.remove('visible');
    var bd = document.getElementById('convNotifBackdrop');
    if (bd) bd.classList.remove('active');
  }, 400);
}

function dismissNotif(card) {
  card.style.transition = 'transform .25s ease, opacity .2s ease, margin .25s ease, max-height .25s ease';
  if (notifFanned) {
    card.style.transform = 'translateX(430px)';
    card.style.opacity = '0';
  } else {
    card.style.transform = 'translateY(20px) scale(0.94)';
    card.style.opacity = '0';
  }

  setTimeout(function() {
    var idx = notifCards.indexOf(card);
    if (idx !== -1) notifCards.splice(idx, 1);
    if (card.parentNode) card.parentNode.removeChild(card);

    if (notifCards.length === 0) {
      notifFanned = false;
      var pile = document.getElementById('convNotifPile');
      if (pile) pile.style.height = '0';
      if (_fanOverlay) _fanOverlay.style.display = 'none';
      var bd = document.getElementById('convNotifBackdrop');
      if (bd) bd.classList.remove('active');
      var controls = document.getElementById('convNotifControls');
      if (controls) controls.classList.remove('visible');
    } else if (!notifFanned) {
      restackCards();
    } else {
      // Recalc sticky scales after card removed
      applyStickyScale();
    }
    updateControls();
  }, 260);
}

function replyNotif(card) {
  dismissNotif(card);
  setTimeout(function(){ go('inbox'); }, 130);
}

function pulseBadge() {
  document.querySelectorAll('.topbar-nav-badge').forEach(function(badge){
    badge.classList.remove('pulse');
    void badge.offsetWidth;
    badge.classList.add('pulse');
    setTimeout(function(){ badge.classList.remove('pulse'); }, 2100);
    var n = parseInt(badge.textContent) || 0;
    badge.textContent = n + 1;
  });
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  var btn = document.getElementById('soundToggle');
  if (btn) {
    btn.textContent = soundEnabled ? '🔔' : '🔕';
    btn.classList.toggle('muted', !soundEnabled);
  }
  showToast(soundEnabled ? 'Notification sound on' : 'Notification sound muted');
}

function playNotifSound() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[0, 1047],[0.18, 1319]].forEach(function(pair){
      var t = pair[0], freq = pair[1];
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
      gain.gain.setValueAtTime(0, ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.38);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.4);
    });
  } catch(e) {}
}

// Fire 8 notifications with random 3–6s intervals
(function scheduleNotifs() {
  var delays = [2500];
  for (var i = 1; i < 10; i++) {
    delays.push(delays[i-1] + 3000 + Math.random() * 3000);
  }
  delays.forEach(function(delay) {
    setTimeout(function() {
      var active = document.querySelector('.screen.active');
      if (active && active.id !== 'screen-inbox') showNewConvNotif();
    }, delay);
  });
})();

window.triggerNewConv = showNewConvNotif;


// ── INIT ──
function _init() {
  injectSidebars();
  initAnalytics();
  renderCannedList('all');
  updateCannedCapBar();
  initWidgetBuilder();
  wireProTriggers();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _init);
} else {
  _init();
}


// ── Logo injection ──
(function(){
  function fill(){
    document.querySelectorAll('img[src="LOGO_SRC"]').forEach(function(img){
      img.src='https://chattt.b-cdn.net/img/chattt-logo@2x.png';
      img.style.width='auto';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fill);
  else fill();
})();

// Account menu dropdown — finds menu inside clicked pill
function toggleAcctMenu(e) {
  e && e.stopPropagation();
  closeAcctMenu(); // close any other
  var pill = e ? e.currentTarget : document.querySelector('.screen.active .acct-pill');
  if (!pill) return;
  var m = pill.querySelector('.acct-menu');
  if (m) m.classList.toggle('show');
}
function closeAcctMenu() {
  document.querySelectorAll('.acct-menu.show').forEach(function(m){m.classList.remove('show');});
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.acct-pill')) closeAcctMenu();
});

function goSettings(section, e) {
  if (e) e.stopPropagation();
  closeAcctMenu();
  go('settings');
  setTimeout(function() {
    var sel = '#screen-settings .settings-nav-item[onclick*="\'' + section + '\'"]';
    var item = document.querySelector(sel);
    if (item) item.click();
  }, 50);
}

function logOut(e) {
  if (e) e.stopPropagation();
  closeAcctMenu();
  showToast('Logged out');
  setTimeout(function() { go('login'); }, 300);
}

