export interface UrlParamsContextType {
  getParams: () => Record<string, string>;
  setParams: (newParams: Record<string, string | undefined | null>) => void;
  addUrlParam: (key: string, value: string) => void;
  deleteUrlParam: (key: string) => void;
  clearUrlParams: () => void;
  getParamValue: (key: string) => string | null;
  hasParam: (key: string) => boolean;
}
