/* ================================================================
   SuperDo – Task Manager  |  v1.00.03
   JavaScript  (migrated from v1.00.02 single-file → separate JS)
   Repository : https://github.com/praetoriani/WebAppX
   ================================================================ */

'use strict';

// ============================================================
// DATA
// ============================================================
const TODOS = {
  "Phase 1: Project Structure & Scaffold": [
    ["P1-01","Create directory structure","Create all folders: PSAppRocket (root), logfiles, profiles, settings","critical","structure"],
    ["P1-02","Create main script psapp.rocket.ps1","Empty file with comment header in personal coding style (version, author, date, description)","critical","structure"],
    ["P1-03","Create psapp.profiledb.conf","Empty config file in root directory; format: ProfileName;Filename.config.ps1","critical","structure"],
    ["P1-04","Create core module files in .core\\ subdirectory","Files: psapp.logging.ps1, psapp.profile.ps1, psapp.launcher.ps1, psapp.ui.ps1, psapp.validation.ps1","critical","structure"],
    ["P1-05","Implement dot-sourcing of all core modules in psapp.rocket.ps1","Include all .core\\ files via . $PSScriptRoot\\..., catch load errors","critical","structure"],
    ["P1-06","Define global constants and variables","$PSAR_VERSION, $PSAR_ROOT, $PSAR_PROFILES_DIR, $PSAR_LOGFILES_DIR, $PSAR_SETTINGS_DIR, $PSAR_PROFILEDB, $PSAR_MAX_PROFILES, $PSAR_MAX_LOGS","high","structure"],
    ["P1-07","Define and implement PSARreturn object type","Unified return object (based on PSAppCoreLib): .Success [bool], .Message [string], .Data [object], .ErrorCode [int]","critical","structure"]
  ],
  "Phase 2: Parameter Handling & Validation": [
    ["P2-01","Define CmdletBinding + ParameterSets","Parameter Sets: 'Run', 'AddProfile', 'DelProfile', 'Backup', 'Restore' - each set excludes the others","critical","params"],
    ["P2-02","Implement -ProfileID [string] (Mandatory, Set: Run)","Validation: string not empty, no special chars except - and _, max 50 chars","critical","params"],
    ["P2-03","Implement -Mode [string] (Mandatory, Set: Run)","ValidateSet: 'GUI', 'Console', 'Taskbar', 'Hidden' - case-insensitive","critical","params"],
    ["P2-04","Implement -NoLogs [switch] (Optional, Set: Run)","Defaults to false; if set, no logfile is created","medium","params"],
    ["P2-05","Implement -AddProfile [switch] (Set: AddProfile)","Only valid together with -NewProfileID; check via ParameterSet-Binding","high","params"],
    ["P2-06","Implement -NewProfileID [string] (Set: AddProfile)","Validation regex: ^[a-zA-Z0-9_-]{1,50}$ - no spaces, no special chars except - and _","high","params"],
    ["P2-07","Implement -DelProfile [string] (Optional, Set: DelProfile)","Check if profile exists in profiledb.conf AND as .ps1 file; no confirm dialog (by design)","high","params"],
    ["P2-08","Define future parameters as placeholders","-Backup, -BackupDir, -Restore, -RestoreFile as parameter placeholders with Write-Warning 'Not yet implemented'","low","params"],
    ["P2-09","Centralize parameter validation","Function Invoke-PSARParameterValidation in psapp.validation.ps1 - all checks in one place","high","params"]
  ],
  "Phase 3: Profile Management": [
    ["P3-01","Implement function New-PSARProfile","Creates new profile: validate NewProfileID, check duplicate in profiledb.conf (case-insensitive), create template file, update profiledb.conf","critical","profile"],
    ["P3-02","Define and implement profile template file","Template contains: PSCustomObject array $AppLoader, 3 commented example entries with all fields, detailed inline comments in English","critical","profile"],
    ["P3-03","Migrate profile file format from string array to PSCustomObject array","Format: [PSCustomObject]@{ProgramName=''; ExePath=''; RunAs='AsUser'; WindowStyle='Normal'; WaitMillisecs=0}","critical","profile"],
    ["P3-04","Implement function Remove-PSARProfile","Checks existence in profiledb.conf + file, deletes both without prompt, returns PSARreturn","high","profile"],
    ["P3-05","Implement function Get-PSARProfile","Loads a profile file, validates the structure, returns array of PSCustomObjects","critical","profile"],
    ["P3-06","Implement function Get-PSARAllProfiles","Reads psapp.profiledb.conf, returns list of all available profiles","medium","profile"],
    ["P3-07","Implement function Update-PSARProfileDB","Reads, updates and writes profiledb.conf atomically; prevents race conditions","high","profile"],
    ["P3-08","Enforce maximum program count per profile (20)","Validation on load: if $AppLoader.Count -gt 20, error + abort","high","profile"],
    ["P3-09","Implement profile validation function","Invoke-PSARProfileValidation: checks ProgramName uniqueness, ExePath existence, RunAs value, WindowStyle value, WaitMillisecs steps (100s), exe-only","critical","profile"],
    ["P3-10","SHA256 integrity check for profile files (optional/extensible)","On load: compare hash of .ps1 against stored hash in profiledb.conf; warn on mismatch","low","profile"]
  ],
  "Phase 4: Launcher Engine": [
    ["P4-01","Implement function Invoke-PSARLaunch (main function)","Orchestrates the entire launch process: load profile -> validate -> start process per entry -> wait -> next entry","critical","launcher"],
    ["P4-02","Implement process start 'AsUser'","Start-Process with current user context, WindowStyle mapping, WaitMillisecs delay via Start-Sleep","critical","launcher"],
    ["P4-03","Implement process start 'AsAdmin'","Start-Process -Verb RunAs; note: UAC prompt appears; UseShellExecute=true required","critical","launcher"],
    ["P4-04","Implement process start as specific user","Start-Process -Credential (Get-Credential); document limitation: UseShellExecute=false + Credential = conflict on Windows","high","launcher"],
    ["P4-05","Implement WindowStyle mapping","Normal->Normal, Hidden->Hidden, Minimized->Minimized, Maximized->Maximized; enum mapping to [System.Diagnostics.ProcessWindowStyle]","high","launcher"],
    ["P4-06","Implement WaitMillisecs logic","Start-Sleep -Milliseconds $entry.WaitMillisecs; 0 = no wait; 100-step increments validated","medium","launcher"],
    ["P4-07","Implement error handling per program entry","Try/Catch per entry; on error: log, continue (do not abort), error summary at end","critical","launcher"],
    ["P4-08","Implement progress event system (for GUI/Console/Taskbar)","Write-Progress + custom event system: $PSAR_ProgressEvent; UI modules subscribe; decoupled from launcher logic","high","launcher"],
    ["P4-09","Implement exe-only validation","Before each start: [System.IO.Path]::GetExtension($entry.ExePath) -eq '.exe' - otherwise skip + warn","critical","launcher"]
  ],
  "Phase 5: Logging System": [
    ["P5-01","Implement function Write-PSARLog","Writes to current log file: timestamp, severity (INFO/WARN/ERROR), message; thread-safe via mutex","critical","logging"],
    ["P5-02","Implement log file naming scheme","YYYYMMDD-HHMMSS.log via Get-Date -Format 'yyyyMMdd-HHmmss'; one new file per program run","high","logging"],
    ["P5-03","Implement log rotation (max 50 files)","Before start: count all .log files, if >50 -> delete oldest (Sort-Object LastWriteTime) until <=49","high","logging"],
    ["P5-04","Integrate NoLogs switch into logging system","If $NoLogs=$true -> Write-PSARLog is a no-op (writes nothing); log file is not created","medium","logging"],
    ["P5-05","Implement log level system","VERBOSE, INFO, WARN, ERROR, FATAL; configurable via settings\\psapp.settings.conf","medium","logging"],
    ["P5-06","Capture session start and session end in log","On start: version, mode, profileID, timestamp; on end: success/error summary, duration","high","logging"]
  ],
  "Phase 6: GUI Modes": [
    ["P6-01","Implement mode 'Hidden'","No window, no output; logging only; simplest implementation, do first","critical","gui"],
    ["P6-02","Implement mode 'Console' (custom console GUI)","WPF window simulating a console: scrollable TextBox, monospace font, dark theme; updates via Dispatcher","high","gui"],
    ["P6-03","Implement mode 'GUI' (progress window)","WPF window with ProgressBar, current program name, status label; runspace for non-blocking UI","high","gui"],
    ["P6-04","Implement mode 'Taskbar' (system tray icon)","NotifyIcon via System.Windows.Forms; show icon while active; tooltip with progress","medium","gui"],
    ["P6-05","Implement WPF runspace pattern","UI runs in its own runspace; PowerShell instance with SynchronizedHashtable for thread-safe communication","critical","gui"],
    ["P6-06","Bind GUI progress display to launcher events","Forward progress events from Phase 4 into WPF-Dispatcher.Invoke(); UI update without freeze","high","gui"],
    ["P6-07","Ensure clean shutdown of all GUI resources","Dispose() on NotifyIcon, close WPF window, terminate runspace - even on error (try/finally)","high","gui"]
  ],
  "Phase 7: Settings & Configuration": [
    ["P7-01","Define settings file psapp.settings.conf","Format: Key=Value, one setting per line; comments with #; example: LogLevel=INFO, MaxLogs=50","medium","settings"],
    ["P7-02","Implement function Get-PSARSettings","Reads settings file, returns hashtable; default values if file missing","medium","settings"],
    ["P7-03","Implement function Set-PSARSetting","Writes/updates a value in the settings file; atomic write","low","settings"],
    ["P7-04","Load settings on startup and make globally available","$script:PSAR_Settings = Get-PSARSettings; all modules access this variable","medium","settings"]
  ],
  "Phase 8: Error Handling & Robustness": [
    ["P8-01","Implement global error handler","trap { } or $ErrorActionPreference='Stop' + Try/Catch in Main; write unhandled errors to log","critical","robustness"],
    ["P8-02","Implement graceful exit on critical errors","Define exit codes: 0=OK, 1=parameter error, 2=profile not found, 3=launcher error, 99=unknown","high","robustness"],
    ["P8-03","Implement input sanitization","All string parameters: Trim, check length, reject dangerous chars (semicolons, backtick in ProfileID)","critical","robustness"],
    ["P8-04","Profile file may only start exe paths (prevent path traversal)","ExePath must be absolute path, no .., no UNC shares (optionally configurable), extension must be .exe","critical","robustness"],
    ["P8-05","Protect psapp.profiledb.conf against injection","On write: forbid semicolons in ProfileName; on read: strictly parse lines (Split(';')[0] and [1] only)","high","robustness"],
    ["P8-06","Prevent parallel starts (single-instance guard)","Mutex with global name; if an instance is already running: error + exit","medium","robustness"],
    ["P8-07","Implement require-elevation check","If AsAdmin entries present: check if UAC is available; warn if UAC is disabled","medium","robustness"]
  ],
  "Phase 9: Testing & Quality Assurance": [
    ["P9-01","Create Pester test suite","Directory .\\tests\\; Pester v5; separate test files per core module","high","testing"],
    ["P9-02","Unit tests for validation functions","Tests for: ProfileID regex, WaitMillisecs 100-step increments, WindowStyle enum, ExePath extension, max-20 limit","high","testing"],
    ["P9-03","Unit tests for profile CRUD operations","Tests for: New-PSARProfile (duplicate, success), Remove-PSARProfile, Get-PSARProfile (invalid file)","high","testing"],
    ["P9-04","Unit tests for log rotation","Test: create 50 dummy logs, trigger new log, check if oldest was deleted","medium","testing"],
    ["P9-05","Integration test: Hidden mode end-to-end","Create test profile with Notepad.exe, run Hidden mode, check log, kill Notepad","high","testing"],
    ["P9-06","Security tests (negative tests)","Test: path traversal attempt, non-.exe file in profile, more than 20 entries, invalid ProfileID","critical","testing"],
    ["P9-07","Run PSScriptAnalyzer on all files","All core modules and main script through PSScriptAnalyzer; aim for 0 errors, 0 warnings","high","testing"]
  ],
  "Phase 10: Documentation & Releases": [
    ["P10-01","Create README.md","Description, prerequisites, installation, quick start, parameter reference, examples","high","docs"],
    ["P10-02","Create CHANGELOG.md","Keep-a-Changelog format; v0.1.0 initial entry","medium","docs"],
    ["P10-03","Add inline comments and comment-based help","Every public function: .SYNOPSIS, .DESCRIPTION, .PARAMETER, .EXAMPLE, .OUTPUTS","high","docs"],
    ["P10-04","Create example profiles","3 demo profiles in profiles\\examples\\: standard-apps.config.ps1, dev-tools.config.ps1, admin-tools.config.ps1","medium","docs"],
    ["P10-05","Document VPDLX module integration","Section in README: how PSAppRocket can be used together with VPDLX","low","docs"],
    ["P10-06","Set up GitHub repository",".gitignore (logfiles, settings with secrets), LICENSE (MIT), create issues/labels","medium","docs"],
    ["P10-07","Tag v0.1.0 release","First functional version (Hidden + Console mode, profile CRUD, logging) as GitHub release","low","docs"]
  ]
};

// ============================================================
// LOOKUP MAPS
// ============================================================
const PRIO_ORDER  = {critical:0,high:1,medium:2,low:3};
const PRIO_LABELS = {critical:'Critical',high:'High',medium:'Medium',low:'Low'};
const CAT_LABELS  = {
  structure:'Structure',params:'Parameters',profile:'Profile Mgmt',
  launcher:'Launcher',logging:'Logging',gui:'GUI Modes',
  settings:'Settings',robustness:'Robustness',testing:'Testing',docs:'Documentation'
};

// ============================================================
// STATE
// ============================================================
let state         = {};
let activeFilters = {prio:null,cat:null,status:null};
let currentView   = 'tasks';

try { const s = sessionStorage.getItem('superdo_state'); if(s) state = JSON.parse(s); } catch(_){}

function saveState(){ try{ sessionStorage.setItem('superdo_state', JSON.stringify(state)); }catch(_){} }
function allTasks(){ return Object.values(TODOS).flat(); }
function getDoneCount(){ return allTasks().filter(t => state[t[0]]).length; }
function getTotalCount(){ return allTasks().length; }
function getPhaseStats(phase){ const tasks=TODOS[phase]; return {done:tasks.filter(t=>state[t[0]]).length,total:tasks.length}; }

// ============================================================
// THEME TOGGLE
// ============================================================
function initTheme(){
  const html=document.documentElement;
  const toggle=document.getElementById('themeToggle');
  let dark=matchMedia('(prefers-color-scheme:dark)').matches;
  html.setAttribute('data-theme', dark?'dark':'light');
  updateThemeIcon(toggle,dark);
  toggle.addEventListener('click',()=>{ dark=!dark; html.setAttribute('data-theme',dark?'dark':'light'); updateThemeIcon(toggle,dark); });
}
function updateThemeIcon(btn,isDark){
  btn.setAttribute('aria-label', isDark?'Switch to light mode':'Switch to dark mode');
  btn.innerHTML = isDark
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function initSidebar(){
  const sidebar=document.getElementById('sidebar');
  const overlay=document.getElementById('sidebarOverlay');
  const toggleBtn=document.getElementById('sidebarToggle');
  const isMobile=()=>window.innerWidth<=768;
  function openSidebar(){ sidebar.classList.remove('collapsed'); if(isMobile()) overlay.classList.add('visible'); }
  function closeSidebar(){ sidebar.classList.add('collapsed'); overlay.classList.remove('visible'); }
  toggleBtn.addEventListener('click',()=>{ sidebar.classList.contains('collapsed')?openSidebar():closeSidebar(); });
  overlay.addEventListener('click', closeSidebar);
  if(isMobile()) closeSidebar();
}

// ============================================================
// NAVIGATION
// ============================================================
function initNav(){
  document.querySelectorAll('.nav-item[data-view]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      switchView(btn.dataset.view);
      if(window.innerWidth<=768){
        document.getElementById('sidebar').classList.add('collapsed');
        document.getElementById('sidebarOverlay').classList.remove('visible');
      }
    });
  });
}
function switchView(viewName){
  currentView=viewName;
  document.querySelectorAll('.nav-item[data-view]').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===viewName));
  document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id===viewName+'View'));
  const filtersBar=document.getElementById('filtersBar');
  if(filtersBar) filtersBar.style.display=viewName==='tasks'?'':'none';
  if(viewName==='dashboard') buildDashboard();
}

// ============================================================
// STATUS BAR
// ============================================================
function buildStatusBar(){
  const total=getTotalCount(), done=getDoneCount();
  const pct=total?Math.round(done/total*100):0;
  const byPrio={critical:0,high:0,medium:0,low:0};
  allTasks().forEach(t=>{byPrio[t[3]]++;});
  document.getElementById('statusBarFill').style.width=pct+'%';
  document.getElementById('statusBarPct').textContent=pct+'%';
  document.getElementById('statusBarDone').textContent=`${done} / ${total}`;
  document.getElementById('statusBarLeft').innerHTML=`
    <span class="status-pill"><span class="sdot" style="background:var(--error)"></span>${byPrio.critical} Critical</span>
    <span class="status-pill"><span class="sdot" style="background:var(--warn)"></span>${byPrio.high} High</span>
    <span class="status-pill"><span class="sdot" style="background:var(--orange)"></span>${byPrio.medium} Medium</span>
    <span class="status-pill"><span class="sdot" style="background:var(--success)"></span>${byPrio.low} Low</span>`;
}

// ============================================================
// FILTER BAR
// ============================================================
function buildFilters(){
  const bar=document.getElementById('filtersBar');
  const prioFilters=Object.keys(PRIO_ORDER).map(p=>
    `<button class="filter-btn prio-filter ${activeFilters.prio===p?'active':''}" data-prio="${p}">${PRIO_LABELS[p]}</button>`
  ).join('');
  const catFilters=Object.keys(CAT_LABELS).map(c=>
    `<button class="filter-btn cat-filter ${activeFilters.cat===c?'active':''}" data-cat="${c}">${CAT_LABELS[c]}</button>`
  ).join('');
  bar.innerHTML=`
    <span class="filter-label">Priority</span>${prioFilters}
    <div class="filter-sep"></div>
    <span class="filter-label">Category</span>${catFilters}
    <div class="filter-sep"></div>
    <span class="filter-label">Status</span>
    <button class="filter-btn status-filter ${activeFilters.status==='open'?'active':''}" data-status="open">Open</button>
    <button class="filter-btn status-filter ${activeFilters.status==='done'?'active':''}" data-status="done">Completed</button>
    <div class="filter-sep"></div>
    <button class="filter-btn" id="clearFilters">✕ Reset</button>`;
  bar.querySelectorAll('.prio-filter').forEach(btn=>btn.addEventListener('click',()=>{ activeFilters.prio=activeFilters.prio===btn.dataset.prio?null:btn.dataset.prio; rebuild(); }));
  bar.querySelectorAll('.cat-filter').forEach(btn=>btn.addEventListener('click',()=>{ activeFilters.cat=activeFilters.cat===btn.dataset.cat?null:btn.dataset.cat; rebuild(); }));
  bar.querySelectorAll('.status-filter').forEach(btn=>btn.addEventListener('click',()=>{ activeFilters.status=activeFilters.status===btn.dataset.status?null:btn.dataset.status; rebuild(); }));
  document.getElementById('clearFilters').addEventListener('click',()=>{ activeFilters={prio:null,cat:null,status:null}; rebuild(); });
}

// ============================================================
// FILTER MATCHING
// ============================================================
function taskMatchesFilters(task,searchVal){
  const isDone=!!state[task[0]];
  if(activeFilters.prio   && task[3]!==activeFilters.prio)   return false;
  if(activeFilters.cat    && task[4]!==activeFilters.cat)     return false;
  if(activeFilters.status==='open' && isDone)                 return false;
  if(activeFilters.status==='done' && !isDone)                return false;
  if(searchVal){
    const q=searchVal.toLowerCase();
    const matches=task[0].toLowerCase().includes(q)||task[1].toLowerCase().includes(q)||
      task[2].toLowerCase().includes(q)||(CAT_LABELS[task[4]]||'').toLowerCase().includes(q)||
      (PRIO_LABELS[task[3]]||'').toLowerCase().includes(q);
    if(!matches) return false;
  }
  return true;
}

// ============================================================
// TASK TOGGLE
// ============================================================
function toggleTask(id){
  state[id]=!state[id]; saveState();
  const cb=document.querySelector(`.cb[data-id="${id}"]`);
  if(cb){ cb.classList.toggle('checked',!!state[id]); cb.setAttribute('aria-checked',String(!!state[id])); }
  const row=document.querySelector(`tr[data-task-id="${id}"]`);
  if(row) row.classList.toggle('done',!!state[id]);
  updatePhaseProgress(); buildStatusBar();
}
function updatePhaseProgress(){
  Object.entries(TODOS).forEach(([phase,tasks],pi)=>{
    const {done,total}=getPhaseStats(phase);
    const pct=total?Math.round(done/total*100):0;
    const key='phase_'+pi;
    const fill=document.querySelector(`[data-phase="${key}"] .phase-mini-fill`);
    const progress=document.querySelector(`[data-phase="${key}"] .phase-progress`);
    if(fill)     fill.style.width=pct+'%';
    if(progress) progress.textContent=`${done}/${total}`;
  });
}

// ============================================================
// PHASE / TASK LIST BUILDER
// ============================================================
function buildPhases(searchVal=''){
  const grid=document.getElementById('phasesGrid');
  grid.innerHTML='';
  let anyVisible=false;
  Object.entries(TODOS).forEach(([phase,tasks],pi)=>{
    const phaseKey='phase_'+pi;
    const collapsed=sessionStorage.getItem('superdo_col_'+phaseKey)==='1';
    const {done,total}=getPhaseStats(phase);
    const pct=total?Math.round(done/total*100):0;
    const visibleTasks=tasks.filter(t=>taskMatchesFilters(t,searchVal));
    if(visibleTasks.length===0 && (activeFilters.prio||activeFilters.cat||activeFilters.status||searchVal)) return;
    anyVisible=true;
    const card=document.createElement('div');
    card.className='phase-card'+(collapsed?' collapsed':'');
    card.dataset.phase=phaseKey;
    const phaseNum=(phase.match(/Phase (\d+)/)||['','?'])[1];
    const phaseTitle=phase.replace(/Phase \d+: /,'');
    card.innerHTML=`
      <div class="phase-header">
        <svg class="phase-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        <span class="phase-badge">Phase ${phaseNum}</span>
        <span class="phase-title">${phaseTitle}</span>
        <div class="phase-meta">
          <span class="phase-progress">${done}/${total}</span>
          <div class="phase-mini-bar"><div class="phase-mini-fill" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="phase-body">
        <table class="todo-table">
          <thead><tr>
            <th></th><th>ID</th><th>Task</th><th>Priority</th><th>Category</th>
          </tr></thead>
          <tbody id="tbody_${phaseKey}"></tbody>
        </table>
        <div class="empty-state" id="empty_${phaseKey}" style="display:none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <h3>No matches</h3><p>No entry in this phase matches the current filter.</p>
        </div>
      </div>`;
    grid.appendChild(card);
    const tbody=document.getElementById('tbody_'+phaseKey);
    let shown=0;
    tasks.forEach(task=>{
      const [id,name,desc,prio,cat]=task;
      const isDone=!!state[id];
      const visible=taskMatchesFilters(task,searchVal);
      const tr=document.createElement('tr');
      tr.className=(isDone?'done':'')+(!visible?' hidden-row':'');
      tr.dataset.taskId=id;
      tr.innerHTML=`
        <td><div class="cb-wrap"><div class="cb ${isDone?'checked':''}" data-id="${id}" tabindex="0" role="checkbox" aria-checked="${isDone}" aria-label="${name}"></div></div></td>
        <td><span class="task-id">${id}</span></td>
        <td><div class="task-name">${name}</div><div class="task-desc">${desc}</div></td>
        <td><span class="prio ${prio}"><span class="prio-dot" style="background:currentColor"></span>${PRIO_LABELS[prio]}</span></td>
        <td><span class="cat">${CAT_LABELS[cat]||cat}</span></td>`;
      tbody.appendChild(tr);
      if(visible) shown++;
    });
    if(shown===0 && (activeFilters.prio||activeFilters.cat||activeFilters.status||searchVal)){
      const emptyEl=document.getElementById('empty_'+phaseKey);
      if(emptyEl) emptyEl.style.display='';
    }
    card.querySelector('.phase-header').addEventListener('click',()=>{
      card.classList.toggle('collapsed');
      sessionStorage.setItem('superdo_col_'+phaseKey,card.classList.contains('collapsed')?'1':'0');
    });
  });
  if(!anyVisible){
    grid.innerHTML=`<div class="empty-state" style="padding:4rem 1rem">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;margin:0 auto 1rem"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <h3>No tasks found</h3><p>Adjust the filters or search query.</p></div>`;
  }
  document.querySelectorAll('.cb').forEach(cb=>{
    cb.addEventListener('click',()=>toggleTask(cb.dataset.id));
    cb.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); toggleTask(cb.dataset.id); } });
  });
}

// ============================================================
// DASHBOARD
// ============================================================
function buildDashboard(){
  const container=document.getElementById('dashboardContent');
  const total=getTotalCount(), done=getDoneCount(), open=total-done;
  const pct=total?Math.round(done/total*100):0;
  const byPrio={critical:0,high:0,medium:0,low:0};
  const byPrioDone={critical:0,high:0,medium:0,low:0};
  const byCat={}, byCatDone={};
  allTasks().forEach(t=>{
    const isDone=!!state[t[0]];
    byPrio[t[3]]++; if(isDone) byPrioDone[t[3]]++;
    byCat[t[4]]=(byCat[t[4]]||0)+1;
    if(isDone) byCatDone[t[4]]=(byCatDone[t[4]]||0)+1;
  });
  const CIRC=2*Math.PI*34;
  const offset=CIRC-(pct/100)*CIRC;
  const cards=[
    {label:'Total Tasks',value:total,sub:'All phases',color:'var(--primary)',icon:`<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>`},
    {label:'Completed',value:done,sub:pct+'% done',color:'var(--success)',icon:`<polyline points="20 6 9 17 4 12"/>`},
    {label:'Open',value:open,sub:'Remaining',color:'var(--orange)',icon:`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`},
    {label:'Critical',value:byPrio.critical,sub:byPrioDone.critical+' done',color:'var(--error)',icon:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`},
    {label:'High',value:byPrio.high,sub:byPrioDone.high+' done',color:'var(--warn)',icon:`<polyline points="18 15 12 9 6 15"/>`},
    {label:'Medium',value:byPrio.medium,sub:byPrioDone.medium+' done',color:'var(--orange)',icon:`<line x1="5" y1="12" x2="19" y2="12"/>`},
    {label:'Low',value:byPrio.low,sub:byPrioDone.low+' done',color:'var(--success)',icon:`<polyline points="6 9 12 15 18 9"/>`},
    {label:'Phases',value:Object.keys(TODOS).length,sub:'Total phases',color:'var(--purple)',icon:`<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>`}
  ];
  const cardsHTML=cards.map(c=>`
    <div class="dash-card">
      <div class="dash-card-icon" style="background:color-mix(in oklab,${c.color} 14%,transparent)">
        <svg viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>
      </div>
      <div class="dash-card-value" style="color:${c.color}">${c.value}</div>
      <div class="dash-card-label">${c.label}</div>
      <div class="dash-card-sub">${c.sub}</div>
    </div>`).join('');
  const catRowsHTML=Object.entries(byCat).map(([cat,count])=>{
    const catDone=byCatDone[cat]||0;
    const catPct=count?Math.round(catDone/count*100):0;
    return `<div class="dash-cat-row">
      <span class="dash-cat-label">${CAT_LABELS[cat]||cat}</span>
      <div class="dash-cat-bar-wrap"><div class="dash-cat-bar-fill" style="width:${catPct}%"></div></div>
      <span class="dash-cat-count">${count}</span>
      <span class="dash-cat-done">${catDone} done</span>
    </div>`;
  }).join('');
  container.innerHTML=`
    <div>
      <div class="dash-heading">Project Dashboard</div>
      <div class="dash-subheading">PSAppRocket · WebAppX · SuperDo v1.00.03</div>
    </div>
    <div>
      <div class="dash-section-title">Overall Progress</div>
      <div class="dash-progress-card">
        <div class="dash-pct-ring">
          <svg viewBox="0 0 80 80">
            <circle class="ring-bg" cx="40" cy="40" r="34"/>
            <circle class="ring-fill" cx="40" cy="40" r="34" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="dash-pct-label">${pct}%</div>
        </div>
        <div class="dash-progress-info">
          <div class="dash-progress-title">PSAppRocket Development</div>
          <div class="dash-progress-sub">${done} of ${total} tasks completed across ${Object.keys(TODOS).length} phases</div>
          <div class="dash-progress-bar-wrap"><div class="dash-progress-bar-fill" style="width:${pct}%"></div></div>
        </div>
      </div>
    </div>
    <div>
      <div class="dash-section-title">Statistics</div>
      <div class="dash-cards-grid">${cardsHTML}</div>
    </div>
    <div>
      <div class="dash-section-title">Category Breakdown</div>
      <div class="dash-cat-grid">${catRowsHTML}</div>
    </div>`;
}

// ============================================================
// CSV EXPORT
// ============================================================
function exportCSV(){
  const rows=[['ID','Phase','Task','Description','Priority','Category','Status']];
  Object.entries(TODOS).forEach(([phase,tasks])=>{
    tasks.forEach(([id,name,desc,prio,cat])=>{
      rows.push([id,phase,name,desc,PRIO_LABELS[prio]||prio,CAT_LABELS[cat]||cat,state[id]?'Completed':'Open']);
    });
  });
  const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='superdo-tasks.csv'; a.click();
  URL.revokeObjectURL(a.href);
}

// ============================================================
// REBUILD
// ============================================================
function rebuild(){
  const search=document.getElementById('searchInput').value.trim();
  buildFilters(); buildPhases(search); buildStatusBar();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded',()=>{
  initTheme(); initSidebar(); initNav();
  buildStatusBar(); buildFilters(); buildPhases();
  document.getElementById('searchInput').addEventListener('input',e=>buildPhases(e.target.value.trim()));
  document.getElementById('btnExport').addEventListener('click',exportCSV);

  // Sidebar-Schnellfilter
  const bindQuick=(id,fn)=>{ const el=document.getElementById(id); if(el) el.addEventListener('click',fn); };
  bindQuick('navFilterCritical',()=>{ switchView('tasks'); activeFilters.prio=activeFilters.prio==='critical'?null:'critical'; rebuild(); });
  bindQuick('navFilterOpen',()=>{ switchView('tasks'); activeFilters.status=activeFilters.status==='open'?null:'open'; rebuild(); });
  bindQuick('navFilterDone',()=>{ switchView('tasks'); activeFilters.status=activeFilters.status==='done'?null:'done'; rebuild(); });
});