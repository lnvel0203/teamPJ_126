// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  HomeOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  RobotOutlined,
  PartitionOutlined
} from '@ant-design/icons';

// icons
const icons = {
  BuildOutlined,
  HomeOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  RobotOutlined,
  FileTextOutlined,
  PartitionOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'main',
      title: <FormattedMessage id="home" />,
      type: 'item',
      url: '/apps/main-page',
      icon: icons.HomeOutlined
      // breadcrumbs: false
    },
    {
      id: 'mail',
      title: <FormattedMessage id="mail" />,
      type: 'item',
      url: '/mail',
      icon: icons.MailOutlined
    },
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: '/apps/chat',
      icon: icons.MessageOutlined,
      breadcrumbs: false
      // external: true,
      // target: true
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="calendar" />,
      type: 'item',
      url: '/apps/calendar',
      icon: icons.CalendarOutlined
    },
    //전자결재
    {
      id: 'approval',
      title: <FormattedMessage id="approval" />,
      type: 'collapse',
      icon: icons.EditOutlined,
      children: [
        {
          id: 'document-write',
          title: <FormattedMessage id="document-write" />,
          type: 'item',
          url: '/apps/document/documentWrite'
        },
        {
          id: 'document-list',
          title: <FormattedMessage id="document-list" />,
          type: 'item',
          url: '/apps/document/documentList'
        }
      ]
    },
    // {
    //   id: 'kanban',
    //   title: <FormattedMessage id="kanban" />,
    //   type: 'item',
    //   icon: BuildOutlined,
    //   url: '/apps/kanban/board'
    // },

    // 전승연(수정 - 230428)
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'item',
      url: '/apps/customer/customer-list',
      icon: icons.PartitionOutlined
    },

    // 재인님
    {
      id: 'invoice',
      title: <FormattedMessage id="급여관리" />,
      url: '/apps/invoice/list',
      type: 'collapse',
      icon: icons.FileTextOutlined,
      breadcrumbs: true,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="급여지급" />,
          type: 'item',
          url: '/apps/invoice/create'
        },

        {
          id: 'edit',
          title: <FormattedMessage id="급여수정" />,
          type: 'item',
          url: '/apps/invoice/edit/1'
        }
      ]
    },

    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'user-profile',
          title: <FormattedMessage id="내정보 수정" />,
          type: 'item',
          url: '/apps/profiles/user/personal',
          breadcrumbs: false
        }
      ]
    }, // 여기까지 변겅

    {
      //인사-사원관리 추가 (2023-04-27 김희수)
      id: 'adminperson-customer',
      title: <FormattedMessage id="인사관리" />,
      type: 'collapse',
      icon: icons.RobotOutlined,
      children: [
        {
          id: 'customlocaletext',
          title: <FormattedMessage id="사원정보관리" />,
          type: 'item',
          url: '/apps/adminperson-customer/customlocaletext'
        },
        {
          id: 'departloaletext',
          title: <FormattedMessage id="부서관리" />,
          type: 'item',
          url: '/apps/adminperson-customer/departloaletext'
        },
        {
          // 직급관리 추가(2023-05-03 김희수)
          id: 'hierarchylocaletext',
          title: <FormattedMessage id="직급관리" />,
          type: 'item',
          url: '/apps/adminperson-customer/hierarchylocaletext'
        }
      ]
    }
  ]
};

export default applications;
