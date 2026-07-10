import { useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  ExportOutlined,
  InboxOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MessageOutlined,
  MobileOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const initialTasks = [
  { id: "BID260710001", planId: "RP202607100018", warehouse: "天津RDC", category: "冻鸡", skuCount: 18, validSku: 15, deadline: "今天 17:30", stage: "报价中", buyer: "高权" },
  { id: "BID260710002", planId: "RP202607100021", warehouse: "北京RDC", category: "冻猪", skuCount: 12, validSku: 8, deadline: "今天 16:50", stage: "报价中", buyer: "高权" },
  { id: "BID260710003", planId: "RP202607100025", warehouse: "石家庄RDC", category: "冻鸡", skuCount: 8, validSku: 3, deadline: "今天 18:00", stage: "报价中", buyer: "李敏" },
  { id: "BID260710004", planId: "RP202607100029", warehouse: "济南RDC", category: "冻鸭", skuCount: 15, validSku: 15, deadline: "今天 15:30", stage: "待同步最终报价", buyer: "王晨" },
  { id: "BID260710005", planId: "RP202607100031", warehouse: "郑州RDC", category: "冻牛羊", skuCount: 6, validSku: 6, deadline: "昨天 18:00", stage: "已同步最终报价", buyer: "高权" },
];

const initialPlans = [
  { id: "RP202607100040", warehouse: "天津RDC", category: "冻鸡", method: "区采", sku: 1, status: "待发起竞标", progress: "—", task: "—", result: "—", updated: "11:20", demo: true },
  { id: "RP202607100018", warehouse: "天津RDC", category: "冻鸡", method: "区采", sku: 18, status: "报价中", progress: "15 / 18", task: "BID260710001", result: "—", updated: "10:42" },
  { id: "RP202607100021", warehouse: "北京RDC", category: "冻猪", method: "区采", sku: 12, status: "报价中", progress: "8 / 12", task: "BID260710002", result: "—", updated: "10:36" },
  { id: "RP202607100025", warehouse: "石家庄RDC", category: "冻鸡", method: "区采", sku: 8, status: "报价中", progress: "3 / 8", task: "BID260710003", result: "—", updated: "10:20" },
  { id: "RP202607100029", warehouse: "济南RDC", category: "冻鸭", method: "区采", sku: 15, status: "待同步最终报价", progress: "15 / 15", task: "BID260710004", result: "—", updated: "10:08" },
  { id: "RP202607100031", warehouse: "郑州RDC", category: "冻牛羊", method: "区采", sku: 6, status: "已返回中标", progress: "6 / 6", task: "BID260710005", result: "郑州鲜达 · ¥28.40 · 1,600kg", updated: "09:58" },
  { id: "RP202607100036", warehouse: "太原RDC", category: "冻品调理", method: "厂家直采", sku: 24, status: "已建单", progress: "—", task: "—", result: "—", updated: "09:55" },
];

const initialQuotedRecords = [
  { id: "Q260710001", name: "华都琵琶腿 10kg", warehouse: "北京RDC", barePrice: 11.85, delivery: true, landedPrice: 12.20, qty: 400, source: "供应商自报", submittedAt: "今天 09:42" },
  { id: "Q260710002", name: "圣农鸡翅根 10kg", warehouse: "天津RDC", barePrice: 14.20, delivery: false, landedPrice: null, qty: 300, source: "买手代报", submittedAt: "今天 09:18" },
  { id: "Q260709008", name: "凤祥去皮腿肉 10kg", warehouse: "石家庄RDC", barePrice: 15.30, delivery: true, landedPrice: 15.65, qty: 520, source: "供应商自报", submittedAt: "昨天 16:35" },
];

const endedRecords = [
  { id: "E260708001", date: "07-08", name: "六和鸡翅根 10kg", warehouse: "天津RDC", barePrice: 13.40, source: "供应商自报", result: "已中标" },
  { id: "E260703006", date: "07-03", name: "华都鸡大胸 10kg", warehouse: "北京RDC", barePrice: 12.80, source: "买手代报", result: "未中标" },
  { id: "E260628003", date: "06-28", name: "圣农琵琶腿 10kg", warehouse: "济南RDC", barePrice: 11.95, source: "供应商自报", result: "已中标" },
  { id: "E260615002", date: "06-15", name: "凤祥去皮腿肉 10kg", warehouse: "郑州RDC", barePrice: 15.45, source: "供应商自报", result: "流标" },
];

const skuRows = [
  { id: "SKU104832", name: "六和鸡大胸 10kg", brand: "六和", demand: 1200, quoteCount: 4, lowestBare: 12.60, lowestLanded: 12.95, historyBare: 12.30, historyLanded: 12.70, supply: 1380, risks: ["价格偏高"] },
  { id: "SKU108675", name: "华都琵琶腿 10kg", brand: "华都", demand: 900, quoteCount: 3, lowestBare: 11.85, lowestLanded: 12.20, historyBare: 12.00, historyLanded: 12.35, supply: 760, risks: ["可供量不足"] },
  { id: "SKU112043", name: "圣农鸡翅根 10kg", brand: "圣农", demand: 650, quoteCount: 0, lowestBare: null, lowestLanded: null, historyBare: 13.80, historyLanded: 14.15, supply: 0, risks: ["无人报价"] },
  { id: "SKU118926", name: "凤祥去皮腿肉 10kg", brand: "凤祥", demand: 480, quoteCount: 4, lowestBare: 15.30, lowestLanded: 15.65, historyBare: 15.50, historyLanded: 15.80, supply: 720, risks: [] },
];

const initialSuppliers = [
  { id: "SUP001", name: "华北鲜冻供应链", barePrice: 12.60, initialBarePrice: 12.95, delivery: true, landedPrice: 12.95, qty: 500, arrival: "07-11 08:00", time: "10:18", status: "已改价", source: "小程序" },
  { id: "SUP002", name: "天津荣达食品", barePrice: 12.75, initialBarePrice: 12.75, delivery: false, landedPrice: null, qty: 380, arrival: "07-11 09:00", time: "09:46", status: "已报价", source: "小程序" },
  { id: "SUP003", name: "京津冷链商贸", barePrice: 13.10, initialBarePrice: 13.10, delivery: true, landedPrice: 13.45, qty: 500, arrival: "07-11 10:00", time: "09:30", status: "已报价", source: "买手代录" },
  { id: "SUP004", name: "河北瑞丰冻品", barePrice: null, initialBarePrice: null, delivery: false, landedPrice: null, qty: null, arrival: "—", time: "—", status: "未报价", source: "—" },
];

const riskTone = { "正常": "success", "价格偏高": "warning", "无人报价": "danger", "可供量不足": "warning" };
const stageTone = { "待发布": "muted", "报价中": "processing", "待同步最终报价": "warning", "已同步最终报价": "success", "已结束": "success" };

function Tag({ children, tone = "muted" }) {
  return <span className={`status-tag ${tone}`}>{children}</span>;
}

function RiskTags({ risks }) {
  const items = risks?.length ? risks : ["正常"];
  return <div className="risk-tags">{items.map((risk) => <Tag key={risk} tone={riskTone[risk]}>{risk}</Tag>)}</div>;
}

function IconButton({ title, children, onClick }) {
  return <button type="button" className="icon-button" title={title} aria-label={title} onClick={onClick}>{children}</button>;
}

function Modal({ title, children, confirmText, onConfirm, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header"><h2>{title}</h2><IconButton title="关闭" onClick={onClose}><CloseOutlined /></IconButton></header>
        <div className="modal-body">{children}</div>
        <footer className="modal-footer"><button className="button secondary" onClick={onClose}>取消</button><button className="button primary" onClick={onConfirm}>{confirmText}</button></footer>
      </section>
    </div>
  );
}

export function App() {
  const [activeNav, setActiveNav] = useState("quotes");
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [planRows, setPlanRows] = useState(initialPlans);
  const [quotedRecords, setQuotedRecords] = useState(initialQuotedRecords);
  const [detailTaskId, setDetailTaskId] = useState(null);
  const [selectedSku, setSelectedSku] = useState(skuRows[0]);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedSupplierId, setSelectedSupplierId] = useState(initialSuppliers[0].id);
  const [filters, setFilters] = useState({ warehouse: "全部", category: "全部", stage: "全部", keyword: "" });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [modal, setModal] = useState(null);
  const [targetPrice, setTargetPrice] = useState("12.80");
  const [message, setMessage] = useState("请结合当前行情和本次采购量重新报价");
  const [toast, setToast] = useState("");
  const [supplierPreview, setSupplierPreview] = useState(false);
  const [supplierScreen, setSupplierScreen] = useState("login");
  const [supplierLoggedIn, setSupplierLoggedIn] = useState(false);
  const [supplierTab, setSupplierTab] = useState("pending");
  const [endedRange, setEndedRange] = useState("近30天");
  const [rememberPassword, setRememberPassword] = useState(true);
  const [loginForm, setLoginForm] = useState({ account: "hbxd001", password: "123456" });
  const [mobileQuote, setMobileQuote] = useState({ barePrice: "12.60", delivery: false, landedPrice: "", qty: "500", arrival: "2026-07-11T08:00", note: "可按时备货" });
  const [proxyDelivery, setProxyDelivery] = useState(false);
  const [proxyLandedPrice, setProxyLandedPrice] = useState("");

  const detailTask = tasks.find((task) => task.id === detailTaskId) || tasks[0];
  const demoTask = tasks.find((task) => task.id === "BID260710006");
  const demoPlan = planRows.find((plan) => plan.id === "RP202607100040");
  const selectedSupplier = suppliers.find((supplier) => supplier.id === selectedSupplierId) || suppliers[0];
  const filteredTasks = useMemo(() => tasks.filter((task) => (
    (appliedFilters.warehouse === "全部" || task.warehouse === appliedFilters.warehouse)
    && (appliedFilters.category === "全部" || task.category === appliedFilters.category)
    && (appliedFilters.stage === "全部" || task.stage === appliedFilters.stage)
    && (!appliedFilters.keyword || `${task.id}${task.planId}`.toLowerCase().includes(appliedFilters.keyword.toLowerCase()))
  )), [tasks, appliedFilters]);

  function notify(text) {
    setToast(text);
    window.clearTimeout(window.__quoteToast);
    window.__quoteToast = window.setTimeout(() => setToast(""), 2400);
  }

  function enterTask(task) {
    if (!task) return;
    setDetailTaskId(task.id);
    setActiveNav("quotes");
  }

  function startBid(plan) {
    const task = { id: "BID260710006", planId: plan.id, warehouse: plan.warehouse, category: plan.category, skuCount: 1, validSku: 0, deadline: "今天 18:30", stage: "报价中", buyer: "高权", demo: true };
    setTasks((rows) => rows.some((row) => row.id === task.id) ? rows : [task, ...rows]);
    setPlanRows((rows) => rows.map((row) => row.id === plan.id ? { ...row, status: "报价中", progress: "0 / 1", task: task.id, updated: "刚刚" } : row));
    setActiveNav("quotes");
    setDetailTaskId(null);
    notify("区采计划已触发竞标，报价任务 BID260710006 已发布");
  }

  function loginSupplier() {
    if (!loginForm.account || !loginForm.password) {
      notify("请输入供应商管理系统账号和密码");
      return;
    }
    setSupplierLoggedIn(true);
    setSupplierScreen("list");
    setSupplierTab("pending");
  }

  function fetchWinner(plan) {
    setPlanRows((rows) => rows.map((row) => row.id === plan.id ? { ...row, status: "已返回中标", result: "华北鲜冻供应链 · 裸价 ¥12.60 · 500kg", updated: "刚刚" } : row));
    notify("现有竞标系统已返回最低价中标结果");
  }

  function confirmOrder(plan) {
    setPlanRows((rows) => rows.map((row) => row.id === plan.id ? { ...row, status: "已建单", updated: "刚刚" } : row));
    notify("中标结果已确认，采购订单创建成功");
  }

  function openNegotiate(supplier) {
    setSelectedSupplierId(supplier.id);
    setTargetPrice(supplier.barePrice ? Math.max(0, supplier.barePrice - 0.3).toFixed(2) : "");
    setModal("negotiate");
  }

  function submitNegotiation() {
    setSuppliers((rows) => rows.map((row) => row.id === selectedSupplierId ? { ...row, status: "待供应商改价" } : row));
    setModal(null);
    notify(`已向${selectedSupplier.name}发起议价`);
  }

  function submitProxyQuote() {
    if (!Number(targetPrice) || (proxyDelivery && !Number(proxyLandedPrice))) {
      notify(proxyDelivery ? "请填写裸价和到岸价" : "请填写裸价");
      return;
    }
    setSuppliers((rows) => rows.map((row) => row.id === selectedSupplierId ? {
      ...row, barePrice: Number(targetPrice), initialBarePrice: Number(targetPrice), delivery: proxyDelivery, landedPrice: proxyDelivery ? Number(proxyLandedPrice) : null, qty: 320, arrival: "07-11 10:00", time: "10:55", status: "已报价", source: "买手代录",
    } : row));
    setModal(null);
    notify("线下报价已代录并标记来源");
  }

  function syncQuotes() {
    setTasks((rows) => rows.map((row) => row.id === detailTask.id ? { ...row, stage: "已同步最终报价" } : row));
    setPlanRows((rows) => rows.map((row) => row.id === detailTask.planId ? { ...row, status: "待返回中标结果", updated: "刚刚" } : row));
    notify("全部最终报价已同步至现有竞标系统，等待返回中标结果");
  }

  function submitMobileQuote() {
    if (!Number(mobileQuote.barePrice) || !Number(mobileQuote.qty) || (mobileQuote.delivery && !Number(mobileQuote.landedPrice))) {
      notify(mobileQuote.delivery ? "请填写裸价、到岸价和可供量" : "请填写裸价和可供量");
      return;
    }
    setSupplierScreen("success");
    setSuppliers((rows) => rows.map((row) => row.id === "SUP001" ? { ...row, barePrice: Number(mobileQuote.barePrice), delivery: mobileQuote.delivery, landedPrice: mobileQuote.delivery ? Number(mobileQuote.landedPrice) : null, qty: Number(mobileQuote.qty), status: "已改价", time: "刚刚" } : row));
    setQuotedRecords((rows) => [{ id: "Q260710006", name: "六和鸡大胸 10kg", warehouse: "天津RDC", barePrice: Number(mobileQuote.barePrice), delivery: mobileQuote.delivery, landedPrice: mobileQuote.delivery ? Number(mobileQuote.landedPrice) : null, qty: Number(mobileQuote.qty), source: "供应商自报", submittedAt: "刚刚" }, ...rows.filter((row) => row.id !== "Q260710006")]);
    if (demoTask) {
      setTasks((rows) => rows.map((row) => row.id === demoTask.id ? { ...row, validSku: 1 } : row));
      setPlanRows((rows) => rows.map((row) => row.id === demoTask.planId ? { ...row, progress: "1 / 1", updated: "刚刚" } : row));
    }
  }

  const pageTitle = activeNav === "plans" ? "订货计划" : detailTaskId ? "报价任务详情" : "报价协同";

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="brand"><InboxOutlined className="brand-icon" />{!collapsed && <span>标冻中央计划中心</span>}</div>
        <nav>
          <button className={`nav-item ${activeNav === "plans" ? "active" : ""}`} onClick={() => { setActiveNav("plans"); setDetailTaskId(null); }}><UnorderedListOutlined />{!collapsed && <span>订货计划</span>}</button>
          <button className={`nav-item ${activeNav === "quotes" ? "active" : ""}`} onClick={() => { setActiveNav("quotes"); setDetailTaskId(null); }}><MessageOutlined />{!collapsed && <span>报价协同</span>} {!collapsed && <b className="nav-count">4</b>}</button>
        </nav>
        <button className="sidebar-toggle" onClick={() => setCollapsed((value) => !value)}>{collapsed ? <RightOutlined /> : <LeftOutlined />}{!collapsed && <span>收起</span>}</button>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="page-title"><IconButton title="收起侧边栏" onClick={() => setCollapsed((value) => !value)}><MenuFoldOutlined /></IconButton><h1>{pageTitle}</h1></div>
          <div className="top-context">
            <button className="button secondary supplier-preview-button" onClick={() => { setSupplierPreview(true); setSupplierScreen(supplierLoggedIn ? "list" : "login"); }}><MobileOutlined />供应商端预览</button>
            <button className="context-control"><CalendarOutlined />2026-07-10</button>
            <span className="context-control">所属区域：华北</span>
            <button className="context-control">高权（买手） <DownOutlined /></button>
            <span className="avatar"><UserOutlined /></span><span className="user-name">高权</span>
          </div>
        </header>

        <div className="content">
          {activeNav === "plans" ? <PlanPage plans={planRows} onOpenTask={(id) => enterTask(tasks.find((task) => task.id === id))} onStartBid={startBid} onFetchWinner={fetchWinner} onConfirmOrder={confirmOrder} /> : detailTaskId ? (
            <QuoteDetail
              task={detailTask}
              selectedSku={selectedSku}
              onSelectSku={setSelectedSku}
              suppliers={suppliers}
              selectedSupplierId={selectedSupplierId}
              onSelectSupplier={setSelectedSupplierId}
              onBack={() => setDetailTaskId(null)}
              onNegotiate={openNegotiate}
              onRemind={(supplier) => notify(`已提醒${supplier.name}尽快报价`)}
              onProxy={(supplier) => { setSelectedSupplierId(supplier.id); setTargetPrice(""); setProxyDelivery(false); setProxyLandedPrice(""); setModal("proxy"); }}
              onBatchRemind={() => notify("已向2家未报价供应商发送催报提醒")}
              onSync={syncQuotes}
            />
          ) : (
            <QuoteList
              tasks={filteredTasks}
              filters={filters}
              setFilters={setFilters}
              onQuery={() => setAppliedFilters(filters)}
              onReset={() => { const reset = { warehouse: "全部", category: "全部", stage: "全部", keyword: "" }; setFilters(reset); setAppliedFilters(reset); }}
              onOpen={enterTask}
              onRemind={() => notify("已向当前筛选范围内未报价供应商发送提醒")}
              onRefresh={() => notify("报价进度已刷新")}
            />
          )}
        </div>
      </main>

      {modal === "negotiate" && <Modal title="向供应商发起议价" confirmText="发送议价" onClose={() => setModal(null)} onConfirm={submitNegotiation}>
        <div className="supplier-summary"><b>{selectedSupplier.name}</b><span>裸价 ￥{selectedSupplier.barePrice?.toFixed(2) || "—"}/kg{selectedSupplier.delivery ? ` · 到岸价 ￥${selectedSupplier.landedPrice?.toFixed(2)}/kg` : " · 不送仓"}</span></div>
        <label className="form-field">期望裸价（元/kg）<input type="number" step="0.01" value={targetPrice} onChange={(event) => setTargetPrice(event.target.value)} /></label>
        <label className="form-field">议价说明<textarea value={message} onChange={(event) => setMessage(event.target.value)} /></label>
        <p className="form-tip">供应商只会看到议价要求，不会看到其他供应商报价。</p>
      </Modal>}

      {modal === "proxy" && <Modal title="代录线下报价" confirmText="保存报价" onClose={() => setModal(null)} onConfirm={submitProxyQuote}>
        <div className="supplier-summary"><b>{selectedSupplier.name}</b><span>来源将标记为“买手代录”</span></div>
        <label className="form-field">裸价（元/kg）<input type="number" step="0.01" value={targetPrice} onChange={(event) => setTargetPrice(event.target.value)} /></label>
        <label className="delivery-checkbox"><input type="checkbox" checked={proxyDelivery} onChange={(event) => setProxyDelivery(event.target.checked)} /><span>送货到仓</span></label>
        {proxyDelivery && <label className="form-field">到岸价（元/kg）<input type="number" step="0.01" value={proxyLandedPrice} onChange={(event) => setProxyLandedPrice(event.target.value)} /></label>}
        <div className="two-fields"><label className="form-field">可供量（kg）<input defaultValue="320" /></label><label className="form-field">预计到货<input type="datetime-local" defaultValue="2026-07-11T10:00" /></label></div>
      </Modal>}

      {supplierPreview && <SupplierPreview
        screen={supplierScreen}
        setScreen={setSupplierScreen}
        loggedIn={supplierLoggedIn}
        onLogin={loginSupplier}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        rememberPassword={rememberPassword}
        setRememberPassword={setRememberPassword}
        activeTab={supplierTab}
        setActiveTab={setSupplierTab}
        quotedRecords={quotedRecords}
        endedRecords={endedRecords}
        endedRange={endedRange}
        setEndedRange={setEndedRange}
        demoPlan={demoPlan}
        demoTask={demoTask}
        quote={mobileQuote}
        setQuote={setMobileQuote}
        onSubmit={submitMobileQuote}
        onClose={() => setSupplierPreview(false)}
      />}

      {toast && <div className="toast"><CheckCircleOutlined />{toast}</div>}
    </div>
  );
}

function QuoteList({ tasks, filters, setFilters, onQuery, onReset, onOpen, onRemind, onRefresh }) {
  const totals = tasks.reduce((result, task) => ({ sku: result.sku + task.skuCount, validSku: result.validSku + task.validSku }), { sku: 0, validSku: 0 });
  return <>
    <section className="metric-strip compact-metrics">
      <Metric label="报价中任务" value={tasks.filter((task) => task.stage === "报价中").length} />
      <Metric label="待同步最终报价" value={tasks.filter((task) => task.stage === "待同步最终报价").length} tone="warning" />
      <Metric label="已同步最终报价" value={tasks.filter((task) => task.stage === "已同步最终报价").length} tone="success" />
      <Metric label="有效报价 SKU / 总 SKU" value={`${totals.validSku}/${totals.sku}`} />
    </section>
    <section className="filter-panel quote-filters">
      <label>RDC<select value={filters.warehouse} onChange={(event) => setFilters({ ...filters, warehouse: event.target.value })}><option>全部</option><option>天津RDC</option><option>北京RDC</option><option>石家庄RDC</option><option>济南RDC</option><option>郑州RDC</option></select></label>
      <label>品类<select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option>全部</option><option>冻鸡</option><option>冻猪</option><option>冻鸭</option><option>冻牛羊</option></select></label>
      <label>报价阶段<select value={filters.stage} onChange={(event) => setFilters({ ...filters, stage: event.target.value })}><option>全部</option><option>报价中</option><option>待同步最终报价</option><option>已同步最终报价</option></select></label>
      <label className="keyword-filter">任务号 / 计划单号<input placeholder="请输入编号" value={filters.keyword} onChange={(event) => setFilters({ ...filters, keyword: event.target.value })} /></label>
      <div className="filter-actions"><button className="button primary" onClick={onQuery}><SearchOutlined />查询</button><button className="button secondary" onClick={onReset}>重置</button></div>
    </section>
    <section className="table-panel">
      <div className="table-toolbar"><span>共 {tasks.length} 个报价任务</span><div><button className="text-button" onClick={onRemind}><BellOutlined />批量催报</button><button className="text-button" onClick={onRefresh}><ReloadOutlined />刷新</button><button className="text-button"><ExportOutlined />导出</button></div></div>
      <div className="table-scroll"><table className="quote-task-table"><thead><tr><th>报价截止</th><th>竞标任务号</th><th>RDC</th><th>品类</th><th>总 SKU</th><th>有效报价 SKU</th><th>报价覆盖率</th><th>报价阶段</th><th>买手</th><th>操作</th></tr></thead><tbody>{tasks.map((task) => <tr key={task.id} onDoubleClick={() => onOpen(task)}><td><div className="deadline-cell"><ClockCircleOutlined />{task.deadline}</div></td><td><button className="link-button" onClick={() => onOpen(task)}>{task.id}</button><small>{task.planId}</small></td><td>{task.warehouse}</td><td>{task.category}</td><td>{task.skuCount}</td><td><b>{task.validSku} / {task.skuCount}</b></td><td><Progress value={task.validSku} total={task.skuCount} /></td><td><Tag tone={stageTone[task.stage]}>{task.stage}</Tag></td><td>{task.buyer}</td><td><button className="row-primary" onClick={() => onOpen(task)}>查看报价</button></td></tr>)}</tbody></table>{tasks.length === 0 && <div className="empty-state"><InboxOutlined /><span>没有符合条件的报价任务</span></div>}</div>
      <div className="pagination"><span>共 {tasks.length} 条</span><IconButton title="上一页"><LeftOutlined /></IconButton><button className="page-current">1</button><IconButton title="下一页"><RightOutlined /></IconButton><select><option>20 条/页</option></select></div>
    </section>
  </>;
}

function QuoteDetail({ task, selectedSku, onSelectSku, suppliers, selectedSupplierId, onSelectSupplier, onBack, onNegotiate, onRemind, onProxy, onBatchRemind, onSync }) {
  const displaySkuRows = task.demo ? [{ ...skuRows[0], demand: 500, quoteCount: task.validSku, supply: task.validSku ? 500 : 0, lowestBare: task.validSku ? 12.60 : null, lowestLanded: task.validSku ? 12.95 : null, risks: task.validSku ? ["价格偏高"] : ["无人报价"] }] : skuRows;
  const displaySuppliers = task.demo ? suppliers.map((supplier) => supplier.id === "SUP001" && task.validSku ? supplier : { ...supplier, barePrice: null, landedPrice: null, qty: null, status: "未报价", source: "—", time: "—" }) : suppliers;
  return <div className="detail-page">
    <div className="detail-heading"><div><button className="back-button" onClick={onBack}><ArrowLeftOutlined />返回报价任务</button><h2>{task.id} <Tag tone={stageTone[task.stage]}>{task.stage}</Tag></h2><p>{task.warehouse} · {task.category} · 报价截止 {task.deadline} · 关联计划 {task.planId}</p></div><div className="heading-actions"><button className="button secondary" onClick={onBatchRemind}><BellOutlined />批量催报</button><button className="button primary" onClick={onSync}><SendOutlined />同步最终报价</button></div></div>
    <section className="metric-strip detail-metrics compact-metrics"><Metric label="总 SKU" value={task.skuCount} /><Metric label="有效报价 SKU / 总 SKU" value={`${task.validSku}/${task.skuCount}`} /><Metric label="报价覆盖率" value={`${Math.round((task.validSku / task.skuCount) * 100)}%`} /><Metric label="报价截止" value={task.deadline} /></section>
    <div className="detail-layout">
      <section className="table-panel detail-table-panel"><div className="table-toolbar"><span>SKU 报价明细</span><div><button className="text-button"><SearchOutlined />筛选商品</button><button className="text-button"><ReloadOutlined />刷新</button></div></div><div className="table-scroll"><table className="sku-table"><thead><tr><th>商品</th><th>需求量</th><th>供应商报价数</th><th>最低裸价</th><th>最低到岸价</th><th>总可供量</th><th>SKU 风险</th><th>操作</th></tr></thead><tbody>{displaySkuRows.map((sku) => <tr key={sku.id} className={selectedSku.id === sku.id ? "selected" : ""} onClick={() => onSelectSku(sku)}><td><b>{sku.name}</b><small>{sku.id} · {sku.brand}</small></td><td>{sku.demand.toLocaleString()} kg</td><td>{sku.quoteCount}</td><td>{sku.lowestBare ? `￥${sku.lowestBare.toFixed(2)}` : "—"}</td><td>{sku.lowestLanded ? `￥${sku.lowestLanded.toFixed(2)}` : "—"}</td><td>{sku.supply.toLocaleString()} kg</td><td><RiskTags risks={sku.risks} /></td><td><button className="row-primary" onClick={() => onSelectSku(sku)}>查看报价</button></td></tr>)}</tbody></table></div></section>
      <aside className="quote-side-panel"><header><div><span>供应商报价</span><h3>{selectedSku.name}</h3><p>历史裸价 ￥{selectedSku.historyBare.toFixed(2)} · 历史到岸价 ￥{selectedSku.historyLanded.toFixed(2)}</p></div><RiskTags risks={displaySkuRows[0].risks} /></header><div className="supplier-list">{displaySuppliers.map((supplier) => <article key={supplier.id} className={`supplier-row ${selectedSupplierId === supplier.id ? "selected" : ""}`} onClick={() => onSelectSupplier(supplier.id)}><div className="supplier-row-head"><b>{supplier.name}</b><Tag tone={supplier.status === "未报价" ? "muted" : supplier.status.includes("待") ? "warning" : "success"}>{supplier.status}</Tag></div>{supplier.barePrice ? <><div className="quote-price"><strong>裸价 ￥{supplier.barePrice.toFixed(2)}</strong><span>/kg</span>{supplier.initialBarePrice > supplier.barePrice && <small>初始 ￥{supplier.initialBarePrice.toFixed(2)}</small>}</div><div className="delivery-price"><Tag tone={supplier.delivery ? "processing" : "muted"}>{supplier.delivery ? "送货到仓" : "不送仓"}</Tag>{supplier.delivery && <b>到岸价 ￥{supplier.landedPrice.toFixed(2)}/kg</b>}</div><div className="quote-meta"><span>可供 {supplier.qty} kg</span><span>到货 {supplier.arrival}</span><span>{supplier.source} · {supplier.time}</span></div><div className="supplier-actions"><button onClick={(event) => { event.stopPropagation(); onNegotiate(supplier); }}><MessageOutlined />议价</button><button onClick={(event) => { event.stopPropagation(); onProxy(supplier); }}><EditOutlined />代录</button></div></> : <><p className="no-quote">尚未提交报价</p><div className="supplier-actions"><button onClick={(event) => { event.stopPropagation(); onRemind(supplier); }}><BellOutlined />催报</button><button onClick={(event) => { event.stopPropagation(); onProxy(supplier); }}><EditOutlined />代录</button></div></>}</article>)}</div></aside>
    </div>
  </div>;
}

function PlanPage({ plans, onOpenTask, onStartBid, onFetchWinner, onConfirmOrder }) {
  function action(plan) {
    if (plan.status === "待发起竞标") return <button className="row-primary" onClick={() => onStartBid(plan)}><SendOutlined />发起竞标</button>;
    if (plan.status === "待返回中标结果") return <button className="row-primary" onClick={() => onFetchWinner(plan)}><ReloadOutlined />获取中标结果</button>;
    if (plan.status === "已返回中标") return <button className="row-primary" onClick={() => onConfirmOrder(plan)}><ShoppingCartOutlined />确认下单</button>;
    if (plan.status === "已建单") return <button className="row-primary"><ShoppingCartOutlined />查看订单</button>;
    return <button className="row-primary" onClick={() => onOpenTask(plan.task)}>查看报价</button>;
  }

  return <>
    <section className="filter-panel plan-filters"><label>计划日期<input type="date" defaultValue="2026-07-10" /></label><label>仓库<select><option>全部</option><option>天津RDC</option><option>北京RDC</option></select></label><label>采购品类<select><option>全部</option><option>冻鸡</option><option>冻猪</option></select></label><label>采购方式<select><option>全部</option><option>区采</option><option>厂家直采</option></select></label><label>计划状态<select><option>全部</option><option>待发起竞标</option><option>报价中</option><option>待同步最终报价</option><option>待返回中标结果</option><option>已返回中标</option><option>已建单</option></select></label><div className="filter-actions"><button className="button primary"><SearchOutlined />查询</button><button className="button secondary">重置</button></div></section>
    <section className="table-panel"><div className="table-toolbar"><span>共 {plans.length} 条计划</span><div><button className="text-button"><ReloadOutlined />刷新</button><button className="text-button"><ExportOutlined />导出</button></div></div><div className="table-scroll"><table className="plan-table"><thead><tr><th>计划日期</th><th>计划单号</th><th>仓库</th><th>品类</th><th>采购方式</th><th>总 SKU</th><th>当前状态</th><th>有效报价 SKU</th><th>竞标任务</th><th>中标结果</th><th>操作</th></tr></thead><tbody>{plans.map((plan) => <tr key={plan.id} className={plan.demo ? "demo-row" : ""}><td>2026-07-10</td><td>{plan.id}{plan.demo && <small>端到端演示</small>}</td><td>{plan.warehouse}</td><td>{plan.category}</td><td>{plan.method}</td><td>{plan.sku}</td><td><Tag tone={plan.status === "已建单" || plan.status === "已返回中标" ? "success" : plan.status === "待发起竞标" || plan.status === "待同步最终报价" || plan.status === "待返回中标结果" ? "warning" : "processing"}>{plan.status}</Tag></td><td>{plan.progress}</td><td>{plan.task}</td><td>{plan.result}</td><td>{action(plan)}</td></tr>)}</tbody></table></div></section>
  </>;
}

function SupplierPreview({ screen, setScreen, onLogin, loginForm, setLoginForm, rememberPassword, setRememberPassword, activeTab, setActiveTab, quotedRecords, endedRecords, endedRange, setEndedRange, demoPlan, demoTask, quote, setQuote, onSubmit, onClose }) {
  const visibleEnded = endedRange === "近7天" ? endedRecords.slice(0, 2) : endedRange === "近30天" ? endedRecords.slice(0, 3) : endedRecords;
  const demoPending = demoTask && demoTask.validSku === 0;
  const pageTitle = screen === "login" ? "供应商登录" : screen === "form" ? "提交报价" : screen === "success" ? "报价成功" : "采购报价";

  return <div className="supplier-preview-backdrop">
    <div className="preview-toolbar"><div><MobileOutlined /><span>供应商小程序预览</span></div><IconButton title="关闭预览" onClick={onClose}><CloseOutlined /></IconButton></div>
    <div className="mobile-prototype">
      <div className="mobile-status"><span>9:41</span><span>5G&nbsp;&nbsp;100%</span></div>
      <header className="mobile-header">{!["login", "list"].includes(screen) ? <button aria-label="返回" onClick={() => setScreen("list")}><LeftOutlined /></button> : <span></span>}<b>{pageTitle}</b><span></span></header>

      {screen === "login" && <div className="mobile-auth">
        <div className="auth-brand"><InboxOutlined /><h2>供应商采购报价</h2><p>使用公司供应商管理系统账号登录</p></div>
        <label className="auth-field">账号<input value={loginForm.account} onChange={(event) => setLoginForm({ ...loginForm, account: event.target.value })} placeholder="请输入供应商账号" /></label>
        <label className="auth-field">密码<input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} placeholder="请输入密码" /></label>
        <label className="remember-row"><input type="checkbox" checked={rememberPassword} onChange={(event) => setRememberPassword(event.target.checked)} /><span>记住账号和密码</span></label>
        <button className="mobile-primary auth-submit" onClick={onLogin}>登录并获取报价任务</button>
        <p className="auth-note">账号鉴权和供应商主体信息来自公司供应商管理系统</p>
      </div>}

      {screen === "list" && <div className="mobile-content">
        <div className="supplier-company"><span>当前企业</span><b>华北鲜冻供应链</b></div>
        <div className="mobile-tabs"><button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>待处理 {demoPending ? 2 : 1}</button><button className={activeTab === "quoted" ? "active" : ""} onClick={() => setActiveTab("quoted")}>已报价</button><button className={activeTab === "ended" ? "active" : ""} onClick={() => setActiveTab("ended")}>已结束</button></div>

        {activeTab === "pending" && <>
          {demoPending && <button className="mobile-task demo-task" onClick={() => setScreen("form")}><div className="mobile-task-head"><Tag tone="processing">新报价任务</Tag><span>今天 18:30 截止</span></div><h3>六和鸡大胸 10kg</h3><p>{demoPlan?.warehouse} · 需求 500 kg · 关联 {demoTask.id}</p><div className="last-quote"><span>尚未报价</span><RightOutlined /></div></button>}
          <button className="mobile-task urgent" onClick={() => setScreen("form")}><div className="mobile-task-head"><Tag tone="warning">请重新报价</Tag><span>今天 17:30 截止</span></div><h3>华都琵琶腿 10kg</h3><p>北京RDC · 需求 900 kg · 07-11 到货</p><div className="last-quote">当前裸价 <b>￥11.85/kg</b><RightOutlined /></div></button>
        </>}

        {activeTab === "quoted" && <div className="mobile-record-list">{quotedRecords.map((record) => <QuoteRecord key={record.id} record={record} />)}</div>}

        {activeTab === "ended" && <><div className="ended-filter"><span>报价记录</span><select value={endedRange} onChange={(event) => setEndedRange(event.target.value)}><option>近7天</option><option>近30天</option><option>近90天</option></select></div><div className="mobile-record-list">{visibleEnded.map((record) => <EndedRecord key={record.id} record={record} />)}</div></>}
      </div>}

      {screen === "form" && <div className="mobile-content mobile-form">
        <section className="mobile-goods"><div><Tag tone={demoPending ? "processing" : "warning"}>{demoPending ? "新报价任务" : "买手议价"}</Tag><span>今天 {demoPending ? "18:30" : "17:30"} 截止</span></div><h3>六和鸡大胸 10kg</h3><p>天津RDC · 需求 {demoPending ? "500" : "1,200"} kg</p><p>到货要求：2026-07-11 12:00 前送达</p></section>
        {!demoPending && <div className="negotiation-note"><MessageOutlined /><div><b>请重新报价</b><p>请结合当前行情和本次采购量重新报价</p></div></div>}
        <label className="mobile-field">裸价（元/kg）<div><span>￥</span><input inputMode="decimal" value={quote.barePrice} onChange={(event) => setQuote({ ...quote, barePrice: event.target.value })} /></div></label>
        <label className="mobile-delivery-toggle"><input type="checkbox" checked={quote.delivery} onChange={(event) => setQuote({ ...quote, delivery: event.target.checked, landedPrice: event.target.checked ? quote.landedPrice : "" })} /><span><b>送货到天津RDC</b><small>勾选后需填写到岸价</small></span></label>
        {quote.delivery && <label className="mobile-field">到岸价（元/kg）<div><span>￥</span><input inputMode="decimal" value={quote.landedPrice} onChange={(event) => setQuote({ ...quote, landedPrice: event.target.value })} /></div></label>}
        <label className="mobile-field">可供量（kg）<input inputMode="numeric" value={quote.qty} onChange={(event) => setQuote({ ...quote, qty: event.target.value })} /></label>
        <label className="mobile-field">预计到货时间<input type="datetime-local" value={quote.arrival} onChange={(event) => setQuote({ ...quote, arrival: event.target.value })} /></label>
        <label className="mobile-field">供货说明<textarea value={quote.note} onChange={(event) => setQuote({ ...quote, note: event.target.value })} /></label>
        <p className="privacy-note">您的报价仅采购买手可见，不展示其他供应商报价。</p>
        <div className="mobile-footer"><button className="mobile-secondary">暂不报价</button><button className="mobile-primary" onClick={onSubmit}>提交报价</button></div>
      </div>}

      {screen === "success" && <div className="mobile-success"><CheckCircleOutlined /><h2>报价已提交</h2><p>采购买手已收到您的最新报价</p><div className="success-summary"><span>商品</span><b>六和鸡大胸 10kg</b><span>报价来源</span><b>供应商自报</b><span>裸价</span><b>￥{Number(quote.barePrice).toFixed(2)}/kg</b><span>送货方式</span><b>{quote.delivery ? "送货到仓" : "不送仓"}</b>{quote.delivery && <><span>到岸价</span><b>￥{Number(quote.landedPrice).toFixed(2)}/kg</b></>}<span>可供量</span><b>{Number(quote.qty).toLocaleString()} kg</b></div><button className="mobile-primary full" onClick={() => setScreen("form")}><EditOutlined />修改报价</button><button className="mobile-link" onClick={() => { setScreen("list"); setActiveTab("quoted"); }}>查看已报价记录</button></div>}
    </div>
  </div>;
}

function QuoteRecord({ record }) {
  return <article className="mobile-record"><div className="record-head"><b>{record.name}</b><Tag tone={record.source === "供应商自报" ? "processing" : "warning"}>{record.source}</Tag></div><p>{record.warehouse} · 裸价 ￥{record.barePrice.toFixed(2)}/kg</p><div className="record-meta"><span>{record.delivery ? `送仓 · 到岸价 ￥${record.landedPrice.toFixed(2)}` : "不送仓"}</span><span>{record.submittedAt}</span></div></article>;
}

function EndedRecord({ record }) {
  return <article className="mobile-record"><div className="record-head"><b>{record.name}</b><Tag tone={record.result === "已中标" ? "success" : record.result === "流标" ? "danger" : "muted"}>{record.result}</Tag></div><p>{record.warehouse} · 裸价 ￥{record.barePrice.toFixed(2)}/kg</p><div className="record-meta"><span>{record.source}</span><span>{record.date}</span></div></article>;
}

function Metric({ label, value, tone = "" }) { return <div className={`metric ${tone}`}><span>{label}</span><b>{value}</b></div>; }
function Progress({ value, total }) { const percent = total ? Math.round((value / total) * 100) : 0; return <div className="progress-cell"><div><span style={{ width: `${percent}%` }} /></div><b>{value}/{total}</b></div>; }
