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
  PartitionOutlined,
  EditOutlined
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
  PartitionOutlined,
  EditOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //


let ids = localStorage.getItem('id');

if(ids === null){
  ids = ' '
}

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
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        {
          id: 'allMail',
          title: <FormattedMessage id="전체 메일함" />,
          type: 'item',
          url: '/apps/mail',
        },
        {
          id: 'requesteMail',
          title: <FormattedMessage id="보낸 메일함" />,
          type: 'item',
          url: '/apps/ReqMail'
        },
        {
          id: 'responseMail',
          title: <FormattedMessage id="받는 메일함" />,
          type: 'item',
          url: '/apps/ResMail'
        }
      ]
    },
    {
      id: 'board',
      title: <FormattedMessage id="사내게시판" />,
      type: 'collapse',
      icon: icons.BoardOutlined,
      children: [
        {
          id: 'boardList',
          title: <FormattedMessage id="사내공지" />,
          type: 'item',
          url: '/apps/board'
        },
      ]
    },
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: 'http://192.168.0.28:5000/',
      icon: icons.MessageOutlined,
      breadcrumbs: false,
      external: true,
      target: true
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
      title: <FormattedMessage id="전자결재" />,
      type: 'collapse',
      icon: icons.EditOutlined,
      children: [
        {
          id: 'document-write',
          title: <FormattedMessage id="작성" />,
          type: 'item',
          url: '/apps/document/documentWrite'
        },
        {
          id: 'document-list',
          title: <FormattedMessage id="목록" />,
          type: 'item',
          url: '/apps/document/documentList'
        }
      ]
    },
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'item',
      url: '/apps/customer/customer-list',
      icon: icons.PartitionOutlined
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

        },
      ]
    }, 

   // 재인님
   ids.match('inV') ?
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

        // {
        //   id: 'edit',
        //   title: <FormattedMessage id="급여수정" />,
        //   type: 'item',
        //   url: '/apps/invoice/edit/1'
        // },
        {
          id: 'BaseSalaryList',
          title: <FormattedMessage id="기본급" />,
          type: 'item',
          url: '/apps/invoice/BaseSalaryList'
        },
        // {
        //   id: 'SalaryChart',
        //   title: <FormattedMessage id="급여 차트" />,
        //   type: 'item',
        //   url: '/apps/invoice/SalaryChart'
        // }
      ]
    } : 
    {        
    }
,
    ids.match('perC') ?

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
          // 부서관리 추가(2023-05-03 김희수)
          id: 'departloaletext',
          title: <FormattedMessage id="부서관리" />,
          type: 'item',
          url: '/apps/adminperson-customer/departloaletext'
        },
        {
          id: 'departdepartments',
          title: <FormattedMessage id="부서배치" />,
          type: 'item',
          url: '/apps/adminperson-customer/departdepartments'
        },
        {
          // 직급관리 추가(2023-05-03 김희수)
          id: 'hierarchylocaletext',
          title: <FormattedMessage id="직급관리" />,
          type: 'item',
          url: '/apps/adminperson-customer/hierarchylocaletext'
        },
        {
          // 인사평가 추가(2023-05-04 김희수)
          id: 'Personnelevaluation',
          title: <FormattedMessage id="인사평가" />,
          type: 'item',
          // url: '/apps/adminperson-customer/PerCustomlocaletext'
          // // url: '/widget/chart',
          // type: 'item',
          url: '/apps/adminperson-customer/Personnelevaluation'
      },

      ]
    }
    : 
    {
    }


  ]
};

export default applications;
