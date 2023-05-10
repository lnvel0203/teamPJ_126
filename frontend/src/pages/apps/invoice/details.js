import React, { useCallback } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
// import { Box, Grid, IconButton, Chip, FormControl, Button, Stack, Typography, Divider } from '@mui/material';
import { Box, Grid, IconButton, FormControl, Button, Stack, Typography, Divider } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
// 로고
// import LogoSection from 'components/logo';
import ExportPDFView from 'sections/apps/invoice/export-pdf';

import { dispatch, useSelector } from 'store';
import { getInvoiceSingleList } from 'store/reducers/invoice';

// assets
import { DownloadOutlined, EditOutlined, PrinterFilled } from '@ant-design/icons';

import CreateDetail from './CreateDetail';

// 돈 포맷
const formatter = new Intl.NumberFormat('ko-KR');

// ==============================|| INVOICE - DETAILS ||============================== //

const Details = () => {
  // const [addId, setAddId] = useState(0);

  const [totalAdditionalPay, setTotalAdditionalPay] = useState(0);
  const [totalInsurancePay, setTotalInsurancePay] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  // -------------------------------------------------------------
  const [overtimePay, setOvertimePay] = useState(0);
  const [weekendWorkPay, setWeekendWorkPay] = useState(0);
  const [calculateRestDayPay, setCalculateRestDayPay] = useState(0);
  const [bonusForm, setBonusForm] = useState(0);
  const [pensionInsurance, setPensionInsurance] = useState(0);
  const [employeeInsurance, setEmployeeInsurance] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [compensationInsurance, setCompensationInsurance] = useState(0);

  // CreateDetail에서 totalAdditionalPay, totalInsurancePay, incomeTax 받아옴
  const handleValuesChanged = useCallback((values) => {
    const {
      overtimePay,
      weekendWorkPay,
      calculateRestDayPay,
      bonusForm,
      totalAdditionalPay,
      pensionInsurance,
      employeeInsurance,
      healthInsurance,
      compensationInsurance,
      totalInsurancePay,
      incomeTax,
      netSalary
    } = values;

    setTotalAdditionalPay(totalAdditionalPay);
    setTotalInsurancePay(totalInsurancePay);
    setIncomeTax(incomeTax);
    setNetSalary(netSalary);
    setOvertimePay(overtimePay);
    setWeekendWorkPay(weekendWorkPay);
    setCalculateRestDayPay(calculateRestDayPay);
    setBonusForm(bonusForm);
    setPensionInsurance(pensionInsurance);
    setEmployeeInsurance(employeeInsurance);
    setHealthInsurance(healthInsurance);
    setCompensationInsurance(compensationInsurance);
  }, []);

  // ===============================================

  const theme = useTheme();
  const { id } = useParams();
  const navigation = useNavigate();

  const { list } = useSelector((state) => state.invoice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getInvoiceSingleList(Number(id))).then(() => setLoading(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const due_dates = new Date(`${list?.due_date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const componentRef = useRef(null);

  if (!loading) return <Loader />;

  return (
    <MainCard content={false}>
      {
        // #TODO - 삭제
        console.log(
          '연장 근로 수당: ' +
            overtimePay +
            '주말 근로 수당, : ' +
            weekendWorkPay +
            ', 주휴 수당: ' +
            calculateRestDayPay +
            ', 상여급: ' +
            bonusForm +
            ', 연금 보험료: ' +
            pensionInsurance +
            ', 고용 보험료: ' +
            employeeInsurance +
            ', 건강 보험료: ' +
            healthInsurance +
            ', 산재 보험료: ' +
            compensationInsurance
        )
      }
      <Stack spacing={2.5}>
        {/* # 1 ======================================= */}
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <IconButton onClick={() => navigation(`/apps/invoice/edit/${id}`)}>
                <EditOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
              {/* PDF */}
              <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
                <IconButton>
                  <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </PDFDownloadLink>

              {/* 프린트 */}
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
            </Stack>
          </MainCard>
        </Box>

        {/* # 2 ======================================= */}
        <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Stack direction="row" spacing={2}>
                    {/* <LogoSection /> */}
                    {/* <Chip label="Paid" variant="light" color="success" size="small" /> */}
                  </Stack>
                  <Typography color="secondary">{list?.invoice_id}</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography variant="subtitle1">Date</Typography>
                    <Typography color="secondary">{today}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                      Due Date
                    </Typography>
                    <Typography color="secondary">{due_dates}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            {/* # 3 ======================================= */}
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">From:</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{list?.cashierInfo.name}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.address}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.phone}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.email}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">To:</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{list?.customerInfo.name}</Typography>
                    <Typography color="secondary">{list?.customerInfo.address}</Typography>
                    <Typography color="secondary">{list?.customerInfo.phone}</Typography>
                    <Typography color="secondary">{list?.customerInfo.email}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>

            {/* # 4 ======================================= */}
            {/** 새 컴포넌트 */}
            {/* Form Layout 시작 */}
            <Grid item xs={12}>
              <CreateDetail onValuesChanged={handleValuesChanged} />
            </Grid>

            {/* Form Layout 시작 끝 */}

            {/* # 5 ======================================= */}
            <Divider />

            <Grid item xs={12}>
              <Divider sx={{ borderWidth: 1 }} />
            </Grid>

            <Grid container justifyContent="right">
              <Grid item xs={12} md={4} mt={2}>
                <Stack spacing={2}>
                  {/* Sub Total 시작 */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>추가 급여 :</Typography>
                    <Typography>{formatter.format(totalAdditionalPay)}원</Typography>
                  </Stack>
                  {/* Sub Total 끝 */}

                  {/* Discount 시작 */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>보험료 :</Typography>
                    <Typography variant="h6">{formatter.format(Math.round(totalInsurancePay))}원</Typography>
                  </Stack>
                  {/* Discount 끝 */}

                  {/* Tax 시작 */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>소득세 :</Typography>
                    <Typography>{formatter.format(Math.round(incomeTax))}원</Typography>
                  </Stack>
                  {/* Tax 끝 */}

                  {/* Grand Total 시작 */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">실 수령액 :</Typography>
                    <Typography variant="subtitle1" color={theme.palette.success.main}>
                      {' '}
                      {formatter.format(Math.round(netSalary))}원
                    </Typography>
                  </Stack>
                  {/* Grand Total 끝 */}
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Typography color="secondary">Notes: </Typography>
                <Typography>
                  It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank
                  You!
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
          <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
            <Button variant="contained" color="primary">
              Download
            </Button>
          </PDFDownloadLink>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default Details;
