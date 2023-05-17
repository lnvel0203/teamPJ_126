import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
//import AuthGuard from 'utils/route-guard/AuthGuard';

// render - dashboard
//const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
//const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));

// render - widget
const WidgetStatistics = Loadable(lazy(() => import('pages/widget/statistics')));
const WidgetData = Loadable(lazy(() => import('pages/widget/data')));
const WidgetChart = Loadable(lazy(() => import('pages/widget/chart')));

// render - applications
// const AppChat = Loadable(lazy(() => import('pages/apps/chat')));

// 캘린더 변경
const AppCalendar = Loadable(lazy(() => import('pages/calendar/Calender1')));
const AppCustomerList = Loadable(lazy(() => import('pages/addressBook/list')));
const AppCustomerCard = Loadable(lazy(() => import('pages/apps/customer/card')));

// 인사관리 
const CustomLocaleText = Loadable(lazy(() => import('pages/apps/adminperson-customer/customlocaletext')));
const Departloaletext = Loadable(lazy(() => import('pages/apps/adminperson-customer/Departloaletext')));
const HierarchyLocaleText = Loadable(lazy(() => import('pages/apps/adminperson-customer/hierarchylocaletext')));
const Personnelevaluation = Loadable(lazy(() => import('pages/apps/adminperson-customer/Personnelevaluation')));
const DepartDepartments = Loadable(lazy(() => import('pages/apps/adminperson-customer/departdepartments')));

// const AppKanban = Loadable(lazy(() => import('pages/apps/kanban')));
// const AppKanbanBacklogs = Loadable(lazy(() => import('sections/apps/kanban/Backlogs')));
// const AppKanbanBoard = Loadable(lazy(() => import('sections/apps/kanban/Board')));

const AppInvoiceCreate = Loadable(lazy(() => import('pages/apps/invoice/create')));
const AppInvoiceDashboard = Loadable(lazy(() => import('pages/apps/invoice/dashboard')));
const AppInvoiceList = Loadable(lazy(() => import('pages/apps/invoice/list')));
const AppInvoiceDetails = Loadable(lazy(() => import('pages/apps/invoice/details')));
const AppInvoiceEdit = Loadable(lazy(() => import('pages/apps/invoice/edit')));

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));

const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

// render - forms & tables
// const FormsValidation = Loadable(lazy(() => import('pages/forms/validation')));
// const FormsWizard = Loadable(lazy(() => import('pages/forms/wizard')));

// const FormsLayoutBasic = Loadable(lazy(() => import('pages/forms/layouts/basic')));
// const FormsLayoutMultiColumn = Loadable(lazy(() => import('pages/forms/layouts/multi-column')));
// const FormsLayoutActionBar = Loadable(lazy(() => import('pages/forms/layouts/action-bar')));
// const FormsLayoutStickyBar = Loadable(lazy(() => import('pages/forms/layouts/sticky-bar')));

// const FormsPluginsMask = Loadable(lazy(() => import('pages/forms/plugins/mask')));
// const FormsPluginsClipboard = Loadable(lazy(() => import('pages/forms/plugins/clipboard')));
// const FormsPluginsRecaptcha = Loadable(lazy(() => import('pages/forms/plugins/re-captcha')));
// const FormsPluginsEditor = Loadable(lazy(() => import('pages/forms/plugins/editor')));
// const FormsPluginsDropzone = Loadable(lazy(() => import('pages/forms/plugins/dropzone')));

const ReactTableBasic = Loadable(lazy(() => import('pages/tables/react-table/basic')));
const ReactTableSorting = Loadable(lazy(() => import('pages/tables/react-table/sorting')));
const ReactTableFiltering = Loadable(lazy(() => import('pages/tables/react-table/filtering')));
const ReactTableGrouping = Loadable(lazy(() => import('pages/tables/react-table/grouping')));
const ReactTablePagination = Loadable(lazy(() => import('pages/tables/react-table/pagination')));
const ReactTableRowSelection = Loadable(lazy(() => import('pages/tables/react-table/row-selection')));
const ReactTableExpanding = Loadable(lazy(() => import('pages/tables/react-table/expanding')));
const ReactTableEditable = Loadable(lazy(() => import('pages/tables/react-table/editable')));
const ReactTableDragDrop = Loadable(lazy(() => import('pages/tables/react-table/drag-drop')));
const ReactTableColumnHiding = Loadable(lazy(() => import('pages/tables/react-table/column-hiding')));
const ReactTableColumnResizing = Loadable(lazy(() => import('pages/tables/react-table/column-resizing')));
const ReactTableStickyTable = Loadable(lazy(() => import('pages/tables/react-table/sticky')));
const ReactTableUmbrella = Loadable(lazy(() => import('pages/tables/react-table/umbrella')));
const ReactTableEmpty = Loadable(lazy(() => import('pages/tables/react-table/empty')));

// render - charts & map
//const ChartApexchart = Loadable(lazy(() => import('pages/charts/apexchart')));
//const ChartOrganization = Loadable(lazy(() => import('pages/charts/org-chart')));

// table routing
const MuiTableBasic = Loadable(lazy(() => import('pages/tables/mui-table/basic')));
const MuiTableDense = Loadable(lazy(() => import('pages/tables/mui-table/dense')));
const MuiTableEnhanced = Loadable(lazy(() => import('pages/tables/mui-table/enhanced')));
const MuiTableDatatable = Loadable(lazy(() => import('pages/tables/mui-table/datatable')));
const MuiTableCustom = Loadable(lazy(() => import('pages/tables/mui-table/custom')));
const MuiTableFixedHeader = Loadable(lazy(() => import('pages/tables/mui-table/fixed-header')));
const MuiTableCollapse = Loadable(lazy(() => import('pages/tables/mui-table/collapse')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

// const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
// const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
// const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
// const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));

// render - sample page
//const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
//const PricingPage = Loadable(lazy(() => import('pages/extra-pages/pricing')));

// render - main page
const MainPage = Loadable(lazy(() => import('pages/main-page/Main')));

// 추가
const AddApprover = Loadable(lazy(() => import('pages/document/AddApprover')));
const DocumentList = Loadable(lazy(() => import('pages/document/list')));
const DocumentDetail = Loadable(lazy(() => import('pages/document/DocumentDetail')));
const VacationDocumentDetail = Loadable(lazy(() => import('pages/document/VacationDocumentDetail')));
const DraftDocumentList = Loadable(lazy(() => import('pages/document/List/DraftDocumentList')));

const Documentwrite = Loadable(lazy(() => import('pages/document/Write')));
//const AttendanceList = Loadable(lazy(() => import('pages/attendance/AttendanceList')));
const Mail = Loadable(lazy(() => import('pages/apps/mail/Mail')));
const ReqMail = Loadable(lazy(() => import('pages/apps/mail/ReqMail')));
const ResMail = Loadable(lazy(() => import('pages/apps/mail/ResMail')));
const MailDetail = Loadable(lazy(() => import('pages/apps/mail/MailDetail')));
const BaseSalaryList = Loadable(lazy(() => import('pages/apps/invoice/BaseSalaryList')));
const SalaryChart = Loadable(lazy(() => import('pages/apps/invoice/SalaryChart')));
//const Chatbot1 = Loadable(lazy(() => import('sections/charts/madechat/Chatbot1')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        //  <AuthGuard>
        <MainLayout />
        // </AuthGuard>
      ),
      children: [
        // {
        //   path: 'dashboard',
        //   children: [
        //     {
        //       path: 'default',
        //       element: <DashboardDefault />
        //     },
        //     {
        //       path: 'analytics',
        //       element: <DashboardAnalytics />
        //     }
        //   ]
        // },
        {
          path: 'widget',
          children: [
            {
              path: 'statistics',
              element: <WidgetStatistics />
            },
            {
              path: 'data',
              element: <WidgetData />
            },
            {
              path: 'chart',
              element: <WidgetChart />
            }
          ]
        },
        {
          path: 'apps',
          children: [
            {
              path: 'main-page',
              element: <MainPage />
            },
            // {
            //   path: 'chatbot',
            //   element: <Chatbot1 />,
            // },

            {
              path: 'mail',
              element: <Mail />,
            },
            {
              path: 'reqMail',
              element: <ReqMail />,
            },
            {
              path: 'resMail',
              element: <ResMail />,
            },
            {
              path: 'mailDetail',
              element: <MailDetail />,
            },

            
            // {
            //   path: 'chat',
            //   element: <AppChat />
            // },
            {
              path: 'calendar',
              element: <AppCalendar />
            },
            // {
            //   path: 'kanban',
            //   element: <AppKanban />,
            //   children: [
            //     {
            //       path: 'backlogs',
            //       element: <AppKanbanBacklogs />
            //     },
            //     {
            //       path: 'board',
            //       element: <AppKanbanBoard />
            //     }
            //   ]
            // },
            // 추가
            {
              path: 'document',
              children: [
                {
                  path: 'AddApprover',
                  element: <AddApprover />
                },
                  {
                  path: 'VacationDocumentDetail',
                  element: <VacationDocumentDetail
                  />
                  },
                {
                  path: 'DocumentList',
                  element: <DocumentList />
                },
                {
                  path: 'DocumentDetail',
                  element: <DocumentDetail />
                },
                {
                  path: 'DraftDocumentList',
                  element: <DraftDocumentList />
                },
                {
                  path: 'Documentwrite',
                  element: <Documentwrite />
                }
              ]
            },
            {
              path: 'customer',
              children: [
                {
                  path: 'customer-list',
                  element: <AppCustomerList />
                },
                {
                  path: 'customer-card',
                  element: <AppCustomerCard />
                }
              ]
            },
            {
              path: 'invoice',
              children: [
                {
                  path: 'dashboard',
                  element: <AppInvoiceDashboard />
                },
                {
                  path: 'create',
                  element: <AppInvoiceCreate />
                },
                {
                  path: 'details/:id',
                  element: <AppInvoiceDetails />
                },
                {
                  path: 'edit/:id',
                  element: <AppInvoiceEdit />
                },
                {
                  path: 'list',
                  element: <AppInvoiceList />
                },
                {
                  path: 'BaseSalaryList',
                  element: <BaseSalaryList />
                },
                {
                  path: 'SalaryChart',
                  element: <SalaryChart />
                }
              ]
            },
            {
              path: 'profiles',
              children: [
                {
                  path: 'user',
                  element: <UserProfile />,
                  children: [
                    {
                      path: 'personal',
                      element: <UserTabPersonal />
                    },
                    {
                      path: 'payment',
                      element: <UserTabPayment />
                    },
                    {
                      path: 'password',
                      element: <UserTabPassword />
                    },
                    {
                      path: 'settings',
                      element: <UserTabSettings />
                    }
                  ]
                }
              ]
            },
            {
              //인사-관리 이동경로 추가 (2023-04-27)
              path: 'adminperson-customer',
              children: [
                {
                  path: 'customlocaletext',
                  element: <CustomLocaleText />
                },
                {
                  path: 'Departloaletext',
                  element: <Departloaletext />
                },
                {
                  path: 'hierarchylocaletext',
                  element: <HierarchyLocaleText />
                },
                {
                  //2023-05-04 추가
                  path: 'Personnelevaluation',
                  element: <Personnelevaluation />
                },
                {
                  //2023-05-08 추가
                  path: 'DepartDepartments',
                  element: <DepartDepartments />
                },
                // {
                //   //2023-05-04 추가
                //   path: 'AttendanceList',
                //   element: <AttendanceList />
                // }
              ]
            }
          ]
        },
        // {
        //   path: 'forms',
        //   children: [
        //     {
        //       path: 'validation',
        //       element: <FormsValidation />
        //     },
        //     {
        //       path: 'wizard',
        //       element: <FormsWizard />
        //     },
        //     {
        //       path: 'layout',
        //       children: [
        //         {
        //           path: 'basic',
        //           element: <FormsLayoutBasic />
        //         },
        //         {
        //           path: 'multi-column',
        //           element: <FormsLayoutMultiColumn />
        //         },
        //         {
        //           path: 'action-bar',
        //           element: <FormsLayoutActionBar />
        //         },
        //         {
        //           path: 'sticky-bar',
        //           element: <FormsLayoutStickyBar />
        //         }
        //       ]
        //     },
        //     {
        //       path: 'plugins',
        //       children: [
        //         {
        //           path: 'mask',
        //           element: <FormsPluginsMask />
        //         },
        //         {
        //           path: 'clipboard',
        //           element: <FormsPluginsClipboard />
        //         },
        //         {
        //           path: 're-captcha',
        //           element: <FormsPluginsRecaptcha />
        //         },
        //         {
        //           path: 'editor',
        //           element: <FormsPluginsEditor />
        //         },
        //         {
        //           path: 'dropzone',
        //           element: <FormsPluginsDropzone />
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          path: 'tables',
          children: [
            {
              path: 'react-table',
              children: [
                {
                  path: 'basic',
                  element: <ReactTableBasic />
                },
                {
                  path: 'sorting',
                  element: <ReactTableSorting />
                },
                {
                  path: 'filtering',
                  element: <ReactTableFiltering />
                },
                {
                  path: 'grouping',
                  element: <ReactTableGrouping />
                },
                {
                  path: 'pagination',
                  element: <ReactTablePagination />
                },
                {
                  path: 'row-selection',
                  element: <ReactTableRowSelection />
                },
                {
                  path: 'expanding',
                  element: <ReactTableExpanding />
                },
                {
                  path: 'editable',
                  element: <ReactTableEditable />
                },
                {
                  path: 'drag-drop',
                  element: <ReactTableDragDrop />
                },
                {
                  path: 'column-hiding',
                  element: <ReactTableColumnHiding />
                },
                {
                  path: 'column-resizing',
                  element: <ReactTableColumnResizing />
                },
                {
                  path: 'sticky-table',
                  element: <ReactTableStickyTable />
                },
                {
                  path: 'umbrella',
                  element: <ReactTableUmbrella />
                },
                {
                  path: 'empty',
                  element: <ReactTableEmpty />
                }
              ]
            },
            {
              path: 'mui-table',
              children: [
                {
                  path: 'basic',
                  element: <MuiTableBasic />
                },
                {
                  path: 'dense',
                  element: <MuiTableDense />
                },
                {
                  path: 'enhanced',
                  element: <MuiTableEnhanced />
                },
                {
                  path: 'datatable',
                  element: <MuiTableDatatable />
                },
                {
                  path: 'custom',
                  element: <MuiTableCustom />
                },
                {
                  path: 'fixed-header',
                  element: <MuiTableFixedHeader />
                },
                {
                  path: 'collapse',
                  element: <MuiTableCollapse />
                }
              ]
            }
          ]
        },
        // {
        //   path: 'charts',
        //   children: [
        //     {
        //       path: 'apexchart',
        //       element: <ChartApexchart />
        //     },
        //     {
        //       path: 'org-chart',
        //       element: <ChartOrganization />
        //     }
        //   ]
        // },
        // {
        //   path: 'sample-page',
        //   element: <SamplePage />
        // },
        // {
        //   path: 'pricing',
        //   element: <PricingPage />
        // }
      ]
    },
    // {
    //   path: '/maintenance',
    //   element: <CommonLayout />,
    //   children: [
    //     {
    //       path: '404',
    //       element: <MaintenanceError />
    //     },
    //     {
    //       path: '500',
    //       element: <MaintenanceError500 />
    //     },
    //     {
    //       path: 'under-construction',
    //       element: <MaintenanceUnderConstruction />
    //     },
    //     {
    //       path: 'coming-soon',
    //       element: <MaintenanceComingSoon />
    //     }
    //   ]
    // },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    },
    {
      path: '/',
      element: <CommonLayout layout="simple" />,
      children: [
        {
          path: 'contact-us',
          element: <AppContactUS />
        }
      ]
    }
  ]
};

export default MainRoutes;
