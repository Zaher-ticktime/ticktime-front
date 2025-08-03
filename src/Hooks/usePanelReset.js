
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook برای بستن خودکار پنل‌ها هنگام تغییر مسیر
 * @param {function} closeSidebar - تابع برای بستن سایدبار
 * @param {function} closeRightPanel - تابع برای بستن پنل سمت راست
 * @param {function} clearPanel - تابع برای پاک کردن activePanel یا موارد مشابه
 */
export default function usePanelReset(closeSidebar, closeRightPanel, clearPanel) {
  const location = useLocation();

  useEffect(() => {
    closeSidebar && closeSidebar(false);
    closeRightPanel && closeRightPanel(false);
    clearPanel && clearPanel(null);
  }, [location.pathname]);
}