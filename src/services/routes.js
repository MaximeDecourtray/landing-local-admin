const BASE_URL_LANDING_LOCAL = 'https://lmfr-seo-landing-local-api-744whj-dev.apps.op.acp.adeo.com/'
const ROUTES = Object.freeze({
  THEMES: {
    EDIT: BASE_URL_LANDING_LOCAL + 'landing/local/admin/theme/',
    READ: BASE_URL_LANDING_LOCAL + 'landing/local/admin/theme/',
    READONE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/theme/' + id,
    DELETE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/theme/' + id
  },
  HEAD: {
    EDIT: BASE_URL_LANDING_LOCAL + 'landing/local/admin/head/',
    READ: BASE_URL_LANDING_LOCAL + 'landing/local/admin/head/',
    READONE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/head/' + id,
    DELETE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/head/' + id
  },
  STORES: {
    EDIT: BASE_URL_LANDING_LOCAL + 'landing/local/admin/store/',
    READ: BASE_URL_LANDING_LOCAL + 'landing/local/admin/store/',
    READONE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/store/' + id,
    DELETE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/store/' + id
  },
  CITIES: {
    EDIT: BASE_URL_LANDING_LOCAL + 'landing/local/admin/city/',
    READ: BASE_URL_LANDING_LOCAL + 'landing/local/admin/city/',
    READONE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/city/' + id,
    DELETE: id => BASE_URL_LANDING_LOCAL + 'landing/local/admin/city/' + id
  }
})

export default ROUTES
