const VENTAS_API_BASE = import.meta.env.VITE_VENTAS_API_URL || "/api/v1/ventas";
const DESPACHOS_API_BASE =
  import.meta.env.VITE_DESPACHOS_API_URL || "/api/v1/despachos";

const joinUrl = (base, path = "") => {
  if (!path) return base;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

export const apiEndpoints = {
  ventas: {
    list: () => VENTAS_API_BASE,
    byId: (id) => joinUrl(VENTAS_API_BASE, id),
  },
  despachos: {
    list: () => DESPACHOS_API_BASE,
    byId: (id) => joinUrl(DESPACHOS_API_BASE, id),
  },
};